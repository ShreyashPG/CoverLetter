import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateRoute from "./routes/generateRoute.js";

dotenv.config();
const app = express();
app.use(cors( {
  origin: process.env.ORIGIN || "http://localhost:5173" ,
}));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", generateRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
