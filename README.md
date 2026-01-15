## Project Overview

GigFlow is a full-stack freelance marketplace application where clients can post gigs and freelancers can place bids on them. The gig owner can review all received bids and hire exactly one freelancer for a gig. Once a freelancer is hired, all other bids are automatically rejected to maintain consistency.

## Live Links

Frontend (Live Application):  
https://gigflow-ebon.vercel.app/

Backend (API Server):  
https://gigflow-backend-0ric.onrender.com
## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Socket.io

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render

## Local Setup

Follow the steps below to run the project locally.

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

---

### Backend Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <REPOSITORY_URL>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file using the provided example:
   ```bash
   cp .env.example .env
  
  ```
4. Update the environment variables in the .env file:

```bash
 MongoDB connection string

JWT secret

Client URL
```
5. Start the backend server:
```bash
npm run dev
```

The backend server will start on the configured port (default: 5000)


### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file for the frontend:
```bash
cp .env.example .env
```
4. Set the API base URL in the frontend .env file to point to the backend:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```
5. Start the frontend development server:
```bash
npm run dev
```

The frontend application will be available at:
```bash
http://localhost:5173
```
## System Architecture

GigFlow follows a client–server architecture with a clear separation between the frontend, backend, and database layers.

The frontend is a single-page application built with React. It handles user interactions, UI state, and communicates with the backend through REST APIs and WebSocket connections.

The backend is built using Node.js and Express. It exposes RESTful APIs for authentication, gig management, and bidding workflows. JWT-based authentication is used to protect sensitive routes and ensure that only authorized users can perform restricted actions.

MongoDB is used as the primary database to store users, gigs, and bids. Mongoose is used for schema definition and database interactions.

Real-time communication is handled using Socket.io. When a freelancer is hired, the backend emits a real-time event to the corresponding user, allowing instant notification without requiring a page refresh.

## API Overview

The backend exposes a set of RESTful APIs organized around authentication, gigs, and bids. All protected routes require a valid JWT.

### Authentication Routes
- POST `/api/auth/register` – Register a new user
- POST `/api/auth/login` – Authenticate an existing user
- GET `/api/auth/me` – Get the currently authenticated user
- POST `/api/auth/logout` – Logout the current user

### Gig Routes
- POST `/api/gigs` – Create a new gig
- GET `/api/gigs` – Get all open gigs
- GET `/api/gigs/me` – Get gigs created by the logged-in user
- GET `/api/gigs/:id` – Get details of a specific gig

### Bid Routes
- POST `/api/bids` – Place a bid on a gig
- GET `/api/bids/me` – Get bids placed by the logged-in user
- GET `/api/bids/:gigId` – Get all bids for a specific gig (gig owner only)
- POST `/api/bids/:bidId/hire` – Hire a freelancer for a gig

## Authentication & Authorization

GigFlow uses JSON Web Tokens (JWT) for authentication and securing protected routes.

When a user registers or logs in, the backend generates a signed JWT containing the user’s identifier. This token is sent to the client and included in the `Authorization` header as a Bearer token for all subsequent API requests.

The backend verifies the JWT on each protected request using an  authentication middleware. If the token is missing, invalid, or expired, the request is rejected with an unauthorized response.

## Core Features

### Gig Management
Users can create gigs by providing a title, description, and budget. All open gigs are visible to freelancers, and users can also view the gigs they have personally created.

### Bidding System
Freelancers can place bids on gigs they do not own. Each bid includes a proposal message and a price. Duplicate bids on the same gig by the same freelancer are prevented.

### Hiring Workflow
Gig owners can review all bids submitted for their gig and hire exactly one freelancer. The hiring operation is atomic:
- The selected bid is marked as hired
- All other bids for the gig are automatically rejected
- The gig status is updated to assigned

This ensures data consistency and prevents multiple hires for the same gig.

### Search Functionality
Users can search for gigs by title to quickly find relevant opportunities.


## Real-Time Notifications

GigFlow uses Socket.io to provide real-time notifications to users.

When a gig owner hires a freelancer, the backend emits a real-time event to the hired freelancer’s active socket connection. The frontend listens for this event and immediately notifies the user without requiring a page refresh.

This real-time communication ensures that important updates, such as being hired for a gig, are delivered instantly and improves the overall user experience.

## Demo

A Loom video is provided to demonstrate the complete application flow.

The demo covers:
- User registration and login
- Gig creation by a client
- Multiple freelancers placing bids
- Hiring one freelancer for a gig
- Automatic rejection of other bids
- Real-time notification sent to the hired freelancer

Loom Demo Video:  
https://www.loom.com/share/127a1d7cce9a40adbb7a191ec42172d2
