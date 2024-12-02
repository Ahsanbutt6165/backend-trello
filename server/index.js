import express from "express";

import connectToMongo from "./database/db.js";
import userRotues from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://zingy-gingersnap-de1700.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "*", // Allow requests from your frontend
//     methods: ["GET", "POST", "PUT", "DELETE"], // List allowed HTTP methods
//     // credentials: true, // Allow cookies and credentials
//     // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Add necessary headers
//   })
// );

// app.use("*", cors()); // Allow preflight requests for all routes

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Connect to MongoDB
connectToMongo();

// Middleware

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", userRotues);
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/card", cardRoutes);
app.get("/", async (req, res) => {
  res.send("working");
});
// Start the servers
app.listen(PORT, () => {
  console.log(` backend running on http://localhost:${PORT}`);
});
