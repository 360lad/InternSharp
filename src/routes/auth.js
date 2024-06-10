import { Router } from "express";
import User from "../models/auth";
import bcrypt from "bcrypt"


const router=Router();

router.post("/signup",(req,res)=>{
    const {fullname,email,password,resume}=req.body
    try {
        const user=User.findOne({email});
        const hashedPassword= bcrypt.hash(password,10);
        const newUser= new User({
            fullname,
            email,
            password:hashedPassword,
            resume
        })
    } catch (error) {
        
    }
})