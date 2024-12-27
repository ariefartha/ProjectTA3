import cors from "cors"
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

//cors
app.use(
  cors({
    origin: "https://sukaprivatemengemudi.vercel.app/", 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sukaprivatemengemudi.vercel.app/'); // Ganti dengan domain frontend
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


//midleware
app.use(express.json({ limit: "50mb" })); //to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //to parse form data in the req.body
app.use(cookieParser()); //allow get the cookie from request and set the cookie inside response

//routes
app.get("/", (req, res) => {
  res.send("my server is running");
});
app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
