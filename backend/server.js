// import cors from "cors"
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/connectDB.js";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import testimoniRoutes from "./routes/testimoniRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import { v2 as cloudinary } from "cloudinary";
// import scheduleRoutes from "./routes/scheduleRoutes.js";

// dotenv.config();
// connectDB();
// const app = express();

// const PORT = process.env.PORT || 5000;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// //cors
// app.use(
//   cors({
//     origin: "https://sukaprivatemengemudi.vercel.app", // Domain front-end
//     credentials: true, // Izinkan pengiriman cookie
//     methods: ["GET", "POST", "PUT", "DELETE"], // Batasi metode yang diperbolehkan
//     allowedHeaders: ["Content-Type", "Authorization"], // Header yang diperbolehkan
//   })
// );

// // Middleware untuk menangani preflight requests
// app.options("*", cors());

// //midleware
// app.use(express.json({ limit: "50mb" })); //to parse JSON data in the req.body
// app.use(express.urlencoded({ extended: true })); //to parse form data in the req.body
// app.use(cookieParser()); //allow get the cookie from request and set the cookie inside response

// //routes
// app.get("/", (req, res) => {
//   res.send("my server is running");
// });
// app.use("/api/users", userRoutes);
// app.use("/api/booking", bookingRoutes);
// app.use("/api/testimoni", testimoniRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/payment", paymentRoutes);

// app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import testimoniRoutes from "./routes/testimoniRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware CORS
app.use(
  cors({
    origin: "https://sukaprivatemengemudi.vercel.app", // Domain front-end
    credentials: true, // Izinkan pengiriman cookie
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Metode yang diperbolehkan
    allowedHeaders: ["Content-Type", "Authorization"], // Header yang diperbolehkan
  })
);

// Middleware untuk menangani preflight requests secara eksplisit
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sukaprivatemengemudi.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200); // Berikan respons sukses untuk preflight request
});

// Middleware lainnya
app.use(express.json({ limit: "50mb" })); // Parsing JSON data
app.use(express.urlencoded({ extended: true })); // Parsing form data
app.use(cookieParser()); // Parsing cookie

// Routes
app.get("/", (req, res) => {
  res.send("my server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/payment", paymentRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
