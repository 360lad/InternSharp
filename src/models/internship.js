import mongoose from "mongoose";

const InternsharpSchema = mongoose.Schema({
  internshipTitle: { type: String, required: true, unique: false },
  description: { type: String, required: false, unique: false },
  requirements: { type: String, required: false, unique: false },
  numberOfApplicants: { type: String, required: false, unique: false },
  paid: { type: String, required: false, unique: false },
  companyId: { type: String, required: false, unique: true },
  applications: { type: Array, required: false, unique: true }
});

export default mongoose.model("Internship", InternsharpSchema);
