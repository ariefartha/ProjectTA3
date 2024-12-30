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

// Daftar origin yang diizinkan
const allowedOrigins = ['https://sukaprivatemengemudi.vercel.app'];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    // Izinkan permintaan dari origin yang diizinkan
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Izinkan pengiriman kredensial (cookie)
}));

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json({ limit: "50mb" })); // Untuk mem-parsing data JSON di req.body
app.use(express.urlencoded({ extended: true })); // Untuk mem-parsing data form di req.body
app.use(cookieParser()); // Untuk mendapatkan cookie dari permintaan dan mengatur cookie di respons

// Menangani permintaan preflight (OPTIONS)
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.send("my server is running");
});
app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/payment", paymentRoutes);

// Menjalankan server
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));