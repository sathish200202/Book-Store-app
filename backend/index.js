import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURI } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

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

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server running on :", PORT);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
