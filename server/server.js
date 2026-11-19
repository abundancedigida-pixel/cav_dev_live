
// import dotenv from "dotenv";

// // --------------------------------------------------
// // LOAD ENVIRONMENT VARIABLES
// // --------------------------------------------------
// dotenv.config();

import "dotenv/config";


// --------------------------------------------------
// IMPORT APPLICATION, DATABASE AND ROUTES
// --------------------------------------------------
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import routes from "./routes.js";
import { initSocket } from "./config/socket.js";

// --------------------------------------------------
// SERVER CONFIGURATION
// --------------------------------------------------

const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// REGISTER MAIN API ROUTE
// --------------------------------------------------

app.use("/api/cav", routes);


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: "File is too large. Maximum allowed size is 5MB.",
      LIMIT_FILE_COUNT: "Too many files uploaded.",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
    };
    return res.status(400).json({
      success: false,
      message: messages[err.code] || err.message,
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

const startServer = async () => {
  try {
    // Connect MongoDB first
    await connectDB();

     const httpServer = http.createServer(app);
    initSocket(httpServer);

    // Start Express server after successful DB connection
    httpServer.listen(PORT, () => {
      console.log("--------------------------------------");
      console.log("CANNON AVENUE BACKEND STARTED");
      console.log("--------------------------------------");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`API: http://localhost:${PORT}/api/cav`);
      console.log("--------------------------------------");
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

// --------------------------------------------------
// EXECUTE SERVER
// --------------------------------------------------

startServer();
