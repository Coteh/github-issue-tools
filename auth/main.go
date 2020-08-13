package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/throttled/throttled/v2"
	"github.com/throttled/throttled/v2/store/memstore"
)

var sessionStore *sessions.CookieStore

// AuthTokenRequest is the request to GitHub API access_token endpoint
type AuthTokenRequest struct {
	Code string 	`json:"code"`
	State string	`json:"state"`
	ClientID string	`json:"client_id"`
	ClientSecret string `json:"client_secret"`
	RedirectURI string `json:"redirect_uri"`
}

// AuthTokenResponse is the response from GitHub API access_token endpoint
type AuthTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType string `json:"token_type"`
	Scope string `json:"scope"`
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// https://stackoverflow.com/a/31832326/9292680
func GenRandomString(length int) string {
	b := make([]rune, length)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func CompareState(r *http.Request, clientState string) bool {
	session, _ := sessionStore.Get(r, "session")
	fmt.Println("vs: ", session.Values["state"])
	return session.Values["state"] == clientState
}

func GenerateAuthSession(w http.ResponseWriter, r *http.Request) {
	session, _ := sessionStore.Get(r, "session")
	session.Values["state"] = GenRandomString(32);
	err := session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "{\"state\": \"%s\"}\n", session.Values["state"])
}

// AuthTokenHandler handles the second step of the GitHub OAuth API web flow by sending OAuth code to access_token endpoint
func AuthTokenHandler(w http.ResponseWriter, r *http.Request) {
	var auth AuthTokenRequest
	// Decode parameters into AuthTokenRequest fields
	err := json.NewDecoder(r.Body).Decode(&auth)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Check state to ensure it's from user
	fmt.Println(auth.State)
	if !CompareState(r, auth.State) {
		http.Error(w, "state invalid", http.StatusBadRequest)
		return
	}
	// Insert client id & secret + redirect URI into AuthTokenRequest struct
	auth.ClientID = os.Getenv("GITHUB_CLIENT_ID")
	auth.ClientSecret = os.Getenv("GITHUB_CLIENT_SECRET")
	auth.RedirectURI = os.Getenv("REDIRECT_URI")
	fmt.Println(auth)
	// Stringify the AuthTokenRequest struct and send it along to access_token endpoint on Authorization server
	b, err := json.Marshal(auth)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", bytes.NewBuffer(b))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	// Send request and get response
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer resp.Body.Close()

	// If it's not 200, the request failed
	if resp.StatusCode != 200 {
		http.Error(w, "Auth token request failed", http.StatusBadRequest)
		return
	}

	var authResp AuthTokenResponse
	
	// Pass the response, which contains access token, along to client
	err = json.NewDecoder(resp.Body).Decode(&authResp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(&authResp);
}

func main() {
	// Load env vars from .env file if there is one
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	rand.Seed(time.Now().UnixNano())

	// Setup session store
	sessionStore = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

	// Setup rate limiting memory store
	store, err := memstore.New(65536)
	if err != nil {
		log.Fatal(err)
	}

	// Setup rate limiting quota
	quota := throttled.RateQuota{
		MaxRate: throttled.PerMin(20),
		MaxBurst: 5,
	}

	// Setup rate limiter
	rateLimiter, err := throttled.NewGCRARateLimiter(store, quota)
	if err != nil {
		log.Fatal(err)
	}

	httpRateLimiter := throttled.HTTPRateLimiter{
		RateLimiter: rateLimiter,
		VaryBy: &throttled.VaryBy{Path: true},
	}

	// Setup gorilla multiplexer
	r := mux.NewRouter()
	r.HandleFunc("/auth_token", AuthTokenHandler).Methods("POST")
	r.HandleFunc("/gen_state", GenerateAuthSession).Methods("POST")
	port := os.Getenv("PORT")
	fmt.Println("Listening on port: ", port)

	// Serve requests
	http.ListenAndServe(fmt.Sprintf(":%s", port), httpRateLimiter.RateLimit(handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST"}), handlers.AllowedOrigins([]string{os.Getenv("REDIRECT_URI")}), handlers.AllowCredentials())(r)))
}
