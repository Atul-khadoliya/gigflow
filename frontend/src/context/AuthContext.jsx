import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import socket from "../socket/socket";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // 🔹 Effect 1: restore auth from cookie
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔹 Effect 2: socket lifecycle (WAIT for auth to finish)
  useEffect(() => {
    if (!loading && user?.id) {
      socket.connect();
      socket.emit("register", user.id);
    }

    if (!loading && !user) {
      socket.disconnect();
    }
  }, [user, loading]);

  // 🔹 Effect 3: listen for real-time hire notification
  useEffect(() => {
    socket.on("hired", (data) => {
      alert(data.message || "You have been hired!");
    });

    return () => {
      socket.off("hired");
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
