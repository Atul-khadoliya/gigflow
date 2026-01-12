import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import GigFeed from "./pages/GigFeed";
import CreateGig from "./pages/CreateGig";
import GigDetail from "./pages/GigDetail";

function Home() {
  return <GigFeed />;
}


export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
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


      </Routes>
    </BrowserRouter>
  );
}
