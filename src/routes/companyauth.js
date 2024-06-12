import { Router } from "express";
import Company from "../models/companyauth.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const router = Router();

//COMPANY SIGN UP
router.post("/signup", async (req, res) => {
  const { companyName, companyEmail, companyPassword, companyWebsite,userType } =
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
      userType,
    });
    const savedCompany= await newCompany.save();
    return res.status(201).json(savedCompany);
  } catch (error) {
    return res.status(401).json({message:error});
  }
});

//COMPANY SIGN IN

router.post("/signin",async (req,res)=>{
  const {companyEmail,companyPassword}=req.body

  try {
    const companyLogin= await Company.findOne({companyEmail});
    if(!companyLogin){
      return res.status(501).json({message:"User Not Found"})
    }
    const loginPassword= await bcrypt.compare(companyPassword,companyLogin.companyPassword);
    if(!loginPassword){
      return res.status(500).json({message:"Wrong credentials"});

    }
    const {companyPassword:passwordOfCompany,...otherinfo}=companyLogin._doc;
    const token = jwt.sign(otherinfo,process.env.JWT_SECRET)
    res.status(201).json({...otherinfo,accesToken:token})


    
  } catch (error) {
    return res.status(500).json({message:error})
    
  }
})

export {router}
