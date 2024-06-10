import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`"The server is running on port ${PORT}"`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

