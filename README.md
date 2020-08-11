# github-issue-tools

A web app to quickly pull down GitHub Issues as a CSV.

## Local Installation

### Frontend

1. `yarn install`
1. `yarn start`

### Backend Auth Server

1. `cd auth`
1. `go mod download`
1. `go run main.go`

## Deploy to App Engine

(assuming you have project setup and `gcloud` installed with it pointing to project)

1. `cd auth`
1. `gcloud app deploy app.yaml`
