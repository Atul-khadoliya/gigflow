let io = null;
const userSocketMap = new Map();

export const initSocket = (ioInstance) => {
  io = ioInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const getUserSocketId = (userId) => {
  return userSocketMap.get(userId);
};

export const registerUserSocket = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

export const removeUserSocket = (socketId) => {
  for (const [userId, sId] of userSocketMap.entries()) {
    if (sId === socketId) {
      userSocketMap.delete(userId);
      break;
    }
  }
};
