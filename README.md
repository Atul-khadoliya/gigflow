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
 MongoDB connection string
```bash
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
