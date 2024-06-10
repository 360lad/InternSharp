import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const router = Router();

//SIGNUP

router.post("/signup", async (req, res) => {
  const { fullname, email, password, resume } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      resume,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({ message: error});
  }
});


//SIGN IN
router.post("/signin",async(req,res)=>{
  try {
    const {email,password}=req.body
    const userLogin=await findOne({email});
    if(!userLogin){
      return res.status(500).json({message:"User not found"})

    }
    const passwordLogin= await bcrypt.compare(password,userLogin.password)
    if(!passwordLogin){
      res.status(500).json({message:"Wrong credentials"})
    };

    const {password:userPassword,...otherinfo}=userLogin._doc;
    const token=await jwt.sign(otherinfo,process.env.JWT_SECRET);

    res.status(200).json({...otherinfo,accesToken:token})

    
  } catch (error) {
    return res.status(500).json({message:error})
    
  }

})

export {router}
