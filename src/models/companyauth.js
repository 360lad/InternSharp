import mongoose from "mongoose"
const companySchema=mongoose.Schema({
    companyName:{type:String,required:true,unique:false},
    companyEmail:{type:String,required:true,unique:true},
    companyPassword:{type:String,required:true,unique:false},
    companyWebsite:{type:String,required:false,unique:false},
    userType:{type:String,required:false,unique:false}


})
export default mongoose.model("Company",companySchema)