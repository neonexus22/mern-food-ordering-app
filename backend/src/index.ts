import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to the database");
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Health OK!");
});

app.use("/api/my/user", myUserRoute);

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
