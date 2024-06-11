import { Router } from "express";
import Company from "../models/companyauth.js";
import bcrypt from "bcrypt";

const router = Router();

//COMPANY SIGN UP
router.post("/signup", async (req, res) => {
  const { companyName, companyEmail, companyPassword, companyWebsite } =
    req.body;
  try {
    const companyNames = await Company.findOne({ companyEmail });
    console.log(companyNames)
    if (companyNames) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(companyPassword, 10);
    const newCompany = new Company({
      companyName,
      companyEmail,
      companyPassword: hashedPassword,
      companyWebsite,
    });
    const savedCompany= await newCompany.save();
    return res.status(201).json(savedCompany);
  } catch (error) {
    return res.status(401).json({message:error});
  }
});

export {router}
