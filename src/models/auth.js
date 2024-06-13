import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  userType:{type:String,required:false,unique:false},
  profile: {
    bio: { type: String, required: false, unique: false },
    linkedinprofile: { type: String, required: false, unique: false },
    coverletter: { type: String, required: false, unique: false },
    othertestimonials: { type: Array, required: false, unique: false },
    address:{type:String, required:false,unique:false},
    github:{type:String,required:false,unique:false},
    projects:{type:Array,required:false,unique:false},
    skills:{type:Array,required:false,unique:false},
    phone:{type:String,required:false,unique:false},
    university:{type:String,required:false,unique:false},
    graduationyear:{type:String,required:false,unique:false},
    experience:{type:Object,required:false,unique:false}

  },
});
export default mongoose.model("User", userSchema);
