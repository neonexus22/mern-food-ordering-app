import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to the database");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Health OK!");
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
