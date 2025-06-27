# URL Shortener Microservice

This is my submission for the campus hiring evaluation.  
It includes a complete URL shortener system with logging integration, a backend API, and a frontend React app.

---

## Project Structure

22131010868/                # Repository named as my roll number  
├── LoggingMiddleware/       # Handles and stores logs from backend and frontend  
├── BackendTestSubmission/   # Express backend for API + redirection + stats  
├── FrontendTestSubmission/  # React app at localhost:3000 to use the service  

---

## How to run the project

### 1️⃣ Start LoggingMiddleware  
Receives logs from backend and frontend and writes them to logs.json  
Runs on http://localhost:4000

---

### 2️⃣ Start Backend  
Provides API for creating short URLs, redirection, and stats.  
Runs on http://localhost:5000

---

### 3️⃣ Start Frontend  
React app to interact with the service  
Runs on http://localhost:3000

---

## Features

✅ Shorten long URLs (with optional validity + shortcode)  
✅ Redirect using shortcode  
✅ View URL statistics and click data  
✅ Logging integration with separate LoggingMiddleware (no console.log used)

---

## Notes

- Please ensure all three services are running at the same time.  
- The app uses file storage (no external database).  
