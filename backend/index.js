import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURI } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// const uri =
//   "mongodb+srv://sathish:TasB2riuwlSLM3Kk@book-app.m2xg0.mongodb.net/mydatabase?retryWrites=true&w=majority";
app.use(express.json());
//CORS Polocy

app.use(cors());

app.get("/", (req, res) => {
  console.log(req.method);
  res.status(200).send("<h1>Book World</h1>");
});

app.use("/books", bookRoutes);

//console.log("mongourl: ", process.env.mongoURI);
//console.log("port: ", process.env.PORT);
if (!process.env.PORT || !process.env.mongoURI) {
  console.log("Missing env variables");
}

mongoose
  .connect(process.env.mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on :", process.env.PORT);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
