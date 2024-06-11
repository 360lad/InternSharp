import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.js";
import {router as companyauthRoutes} from "./routes/companyauth.js"
import {router as internshipRoutes} from "./routes/internship.js"


import internship from "./models/internship.js";

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
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use("/api/auth", authRoutes);
  app.use("/api/auth/company",companyauthRoutes)
  app.use("/api/internships",internshipRoutes)

  app.get("/",(req,res)=>{
    res.json({message:"Welcome to Internsharp"});
  })

