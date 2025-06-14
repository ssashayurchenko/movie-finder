# Movie Finder

A React application built with Vite, served by Nginx in a Docker container.  
Supports dynamic runtime environment variables injection.

---

## Features

- React + Vite build setup  
- Runtime environment variables injection via `env.js` and Docker entrypoint script  
- Nginx serves static built files  
- Configurable API URL and Access Token via environment variables  

---

## Prerequisites

- Docker installed (https://docs.docker.com/get-docker/)  
- Node.js & npm (for local development and build)  

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ssashayurchenko/movie-finder
cd movie-finder
```

## 2. Build the Docker image
```bash
docker build -t movie-finder-app .
```
This builds the React app and creates the Docker image with Nginx and your app.

### 3. Run the Docker container
Set your runtime environment variables here:

- VITE_API_URL — your backend API URL
- VITE_ACCESS_TOKEN — your access token

```bash
docker run -p 3000:80 \
  -e VITE_API_URL="http://localhost:8000/api/v1" \
  -e VITE_ACCESS_TOKEN="your-access-token" \
  movie-finder-app
```

- Maps port 80 in the container to port 3000 on your machine
- Injects environment variables dynamically into the app

### 4. Open the app in your browser
Visit: http://localhost:3000

Your React app will use the injected environment variables for API requests.

## Development (without Docker)
### 1. Install dependencies
```bash
npm install
```
### 2. Run development server
```bash
npm run dev
```
Visit http://localhost:3000 to see the app running locally.

## How Runtime Env Injection Works

public/env.js contains placeholders for env variables:
```js
window._env_ = {
  VITE_API_URL: "%%VITE_API_URL%%",
  VITE_ACCESS_TOKEN: "%%VITE_ACCESS_TOKEN%%"
};
```
- docker-entrypoint.sh replaces these placeholders with real values on container start.
- React app reads from window._env_ at runtime.


## Troubleshooting
- If you get exec format error, verify docker-entrypoint.sh starts with #!/bin/sh

- Rebuild Docker image after changing docker-entrypoint.sh or env.js

- Ensure ports are not blocked or used by other apps