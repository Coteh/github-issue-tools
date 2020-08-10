package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

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

// AuthTokenHandler handles the second step of the GitHub OAuth API web flow by sending OAuth code to access_token endpoint
func AuthTokenHandler(w http.ResponseWriter, r *http.Request) {
	var auth AuthTokenRequest
	err := json.NewDecoder(r.Body).Decode(&auth)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	auth.ClientID = os.Getenv("GITHUB_CLIENT_ID")
	auth.ClientSecret = os.Getenv("GITHUB_CLIENT_SECRET")
	auth.RedirectURI = os.Getenv("REDIRECT_URI")
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
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		http.Error(w, "Auth token request failed", http.StatusBadRequest)
		return
	}

	var authResp AuthTokenResponse
	
	err = json.NewDecoder(resp.Body).Decode(&authResp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(&authResp);
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	r := mux.NewRouter()
	r.HandleFunc("/auth_token", AuthTokenHandler).Methods("POST")
	port := os.Getenv("PORT")
	fmt.Println("Listening on port: ", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST"}), handlers.AllowedOrigins([]string{"*"}))(r))
}
