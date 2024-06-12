import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const router = Router();

//SIGNUP

router.post("/signup", async (req, res) => {
  const { fullname, email, password,userType, profile } = req.body;
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
      userType,
      profile
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({ message: error});
  }
});


//SIGN IN
router.post("/signin",async(req,res)=>{
  const {email,password}=req.body
  try {
    const userLogin=await User.findOne({email});
    console.log(userLogin)
    if(!userLogin){
      return res.status(500).json({message:"User not found"})

    }

    const passwordLogin= await bcrypt.compare(password,userLogin.password)
    if(!passwordLogin){
      return res.status(500).json({message:"Wrong credentials"})
    };
    const {password:userPassword,...otherinfo}=userLogin._doc;
    const token= jwt.sign(otherinfo,process.env.JWT_SECRET);

    res.status(200).json({...otherinfo,accesToken:token})

    
  } catch (error) {
    return res.status(500).json({message:error})
    
  }

})

//UPDATING USER PROFILE

router.patch("/update/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    console.log(req.body)
    const updateProfile=await User.findByIdAndUpdate(id,req.body, {new:true})
    return res.status(201).json(updateProfile)
  } catch (error) {
    return res.status(500).json({message:error})
    
  }
})

export {router}
