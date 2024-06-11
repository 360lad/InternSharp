import Internship from "../models/internship.js";
import { Router } from "express";

const router = Router();

router.post("/new",async (req, res) => {
  try {
    const {
      internshipTitle,
      description,
      requirements,
      numberOfApplicants,
      paid,
      companyId,
    } = req.body;
    const newInternship =await new Internship({
      internshipTitle,
      description,
      requirements,
      numberOfApplicants,
      paid,
      companyId,
    });
const savedInternship=await newInternship.save()
return res.status(201).json(savedInternship)

  } catch (error) {
    return res.status(500).json({message:error})
  }
});

//Getting all internships
router.get("/",async(req,res)=>{
    try {
         const allInternships=await Internship.find();
          return res.status(201).json(allInternships)
        
     } catch (error) {
        return res.status(500).json({message:error})
     }
})

export {router}