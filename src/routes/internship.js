import Internship from "../models/internship.js";
import { Router } from "express";

const router = Router();

router.post("/new", async (req, res) => {
  try {
    const {
      internshipTitle,
      description,
      requirements,
      numberOfApplicants,
      paid,
      companyId,
    } = req.body;
    const newInternship = await new Internship({
      internshipTitle,
      description,
      requirements,
      numberOfApplicants,
      paid,
      companyId,
    });
    const savedInternship = await newInternship.save();
    return res.status(201).json(savedInternship);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//Getting all internships
router.get("/", async (req, res) => {
  try {
    const allInternships = await Internship.find();
    return res.status(201).json(allInternships);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//Getting one Internship

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleInternship = await Internship.findById(id);
    return res.status(200).json(singleInternship);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});


// Updating The Internships
router.patch("/:id", async (res, req) => {
  try {
    const { id } = req.params;
    const updateInternship = await Internship.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json(updateInternship)
  } catch (error) {

    return res.status(500).json({message:error})
  }
});

//Deleting An Internship

router.delete("/:id",async(res,req)=>{
    try {
        const {id}=req.params
        const deleteInternship=await Internship.findByIdAndDelete(id)
        return res.status(200).json(deleteInternship)
        
    } catch (error) {
        return res.status(500).json({message:error})
        
    }
})
export { router }
