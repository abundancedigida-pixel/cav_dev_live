
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// --------------------------------------------------
// INITIALIZE EXPRESS APPLICATION
// --------------------------------------------------

const app = express();

// --------------------------------------------------
// SECURITY MIDDLEWARE
// --------------------------------------------------

app.use(helmet());

// --------------------------------------------------
// CORS CONFIGURATION
// --------------------------------------------------

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const allowedOrigins = [
 "https://www.cavabundancegroups.com",
"https://admin.cavabundancegroups.com",
"https://cav-client.vercel.app",
"https://cav-dev-live.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --------------------------------------------------
// REQUEST LOGGING
// --------------------------------------------------

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --------------------------------------------------
// BODY PARSING MIDDLEWARE
// --------------------------------------------------

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// --------------------------------------------------
// COOKIE PARSER
// --------------------------------------------------

app.use(cookieParser(process.env.COOKIE_SECRET));



// --------------------------------------------------
// DEFAULT ROUTE
// --------------------------------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to cannon avenue API",
  });
});



export default app;
