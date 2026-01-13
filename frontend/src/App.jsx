import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import GigFeed from "./pages/GigFeed";
import CreateGig from "./pages/CreateGig";
import GigDetail from "./pages/GigDetail";
import BidList from "./pages/BidList";
import MyBids from "./pages/MyBids";
import MyGigs from "./pages/MyGigs";

function Home() {
  return <GigFeed />;
}

function AppContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user && (
        <div className="p-4 border-b flex justify-end gap-3">
          {/* Open Gigs */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            Open Gigs
          </button>

          {/* My Gigs */}
          <button
            onClick={() => navigate("/my-gigs")}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            My Gigs
          </button>

          {/* My Bids */}
          <button
            onClick={() => navigate("/my-bids")}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            My Bids
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs/:id"
          element={
            <ProtectedRoute>
              <GigDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs/:id/bids"
          element={
            <ProtectedRoute>
              <BidList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bids"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-gigs"
          element={
            <ProtectedRoute>
              <MyGigs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
