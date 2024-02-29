import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const adminSchema=mongoose.Schema({
   email:{
    type:String,
    // required:true
   },
   password:{
    type:String,
    // required:true
   },
  
})
adminSchema.methods.matchPasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const Admin = mongoose.model('Admin',adminSchema)
export default Admin