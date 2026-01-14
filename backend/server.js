import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import {
  initSocket,
  registerUserSocket,
  removeUserSocket,
} from "./src/socket.js";

const PORT = process.env.PORT || 5000;


connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});




initSocket(io);

// Socket logic
io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    registerUserSocket(userId, socket.id);
  });

  socket.on("disconnect", () => {
    removeUserSocket(socket.id);
  });
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
