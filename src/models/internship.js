import mongoose from "mongoose";

const InternsharpSchema=mongoose.Schema({
    internshipTitle:{type:String,required:true,unique:false},
    description:{type:String,required:false,unique:false},
    requirements:{type:String,required:false,unique:false},
    numberofapplicants:{type:String,required:false,unique:false},
    paid:{type:String,required:false,unique:false},
    companyid:{type:String,required:false}


})

export default mongoose.model("Internships",InternsharpSchema)