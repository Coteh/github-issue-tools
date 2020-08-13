# github-issue-tools

A web app to quickly pull down GitHub Issues as a CSV.

## Installation

### Environment Variables

#### Frontend

Create `.env.local` file in project root:

```
REACT_APP_GITHUB_CLIENT_ID=<client id from GitHub>
REACT_APP_REDIRECT_URI=<URI to redirect users back to after granting access>
REACT_APP_AUTH_SERVER_URL=<url to auth server>
```

#### Backend Auth

Create `.env` file in `auth` subdirectory:

```
GITHUB_CLIENT_ID=<client id from GitHub>
GITHUB_CLIENT_SECRET=<client secret from GitHub>
REDIRECT_URI=<URI to redirect users back to after granting access>
PORT=<port to run server on, 8080 if deploying to App Engine>
```

## Local Installation

### Frontend

1. `yarn install`
1. `yarn start`

### Backend Auth Server

1. `cd auth`
1. `go mod download`
1. `go run main.go`

## Deploy

### Frontend Deployment

1. `yarn build`
1. Host server or host on JAMstack deployment service such as Netlify
   - ensure that `REACT_APP_REDIRECT_URI` is set to the URL of the deployed site

### Auth Server to App Engine

(assuming you have project setup and `gcloud` installed with it pointing to project)

1. `cd auth`
1. `gcloud app deploy app.yaml`
