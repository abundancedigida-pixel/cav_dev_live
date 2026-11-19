import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io = null;

export const initSocket = (httpServer) => {
  const origins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  io = new Server(httpServer, {
    cors: { origin: origins, credentials: true },
  });

  // JWT verify: owner mattum connect aaga mudiyum
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "owner") return next(new Error("Forbidden"));

      socket.user = { id: decoded.id, role: decoded.role };
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.join("admins");
  });

  return io;
};

export const emitToAdmins = (event, payload) => {
  if (io) io.to("admins").emit(event, payload);
};