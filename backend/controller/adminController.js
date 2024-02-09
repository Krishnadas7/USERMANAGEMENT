import asyncHandler from "express-async-handler";
import Admin from "../model/adminShema.js";
import generateToken from "../utils/generateToken.js";
import User from "../model/userShema.js";
const authAdmin =asyncHandler(async (req,res) =>{
 
    const {email,password}=req.body
    const admin = await Admin.findOne({email})
    console.log('admin',admin);
    if(admin && (await admin.matchPasswords(password))){
        generateToken(res,admin._id)
        res.status(201).json({
            id:admin._id,
            email:admin.email
        })
    }else{
        res.status(401).json({message:'invalid email or password'})
    }

})
const logoutAdmin = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'admin logged out'})
})

const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find({}).select("-password");
    res.json({ user });
  });

  const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.query.id;
    if (!userId) {
      res.status(400);
      throw new Error("Invalid user data");
    }
  
    const deletedUser = await User.findByIdAndDelete(userId); 
    if (deletedUser) {
      console.log('deleted');
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Invalid user data");
    }
  });

export{
    authAdmin,
    logoutAdmin,
    getUsers,
    deleteUser
}