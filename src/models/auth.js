import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullname:{type:String ,required:true, unique:true},
    email:{type:String , required:true, unique:true},
    password:{type:String, required:true, unique:true},
    resume:{type:String ,required:true ,unique:true}
})

export default mongoose.model("User",userSchema)