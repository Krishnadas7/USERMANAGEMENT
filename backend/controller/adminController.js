import asyncHandler from "express-async-handler";
import Admin from "../model/adminShema.js";
import generateToken from "../utils/generateToken.js";
import User from "../model/userShema.js";
const authAdmin =asyncHandler(async (req,res) =>{
 
    const {email,password}=req.body
    const admin = await Admin.findOne({email})
  
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
     
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Invalid user data");
    }
  });
  
  const updateUserProfile = asyncHandler(async (req, res) => {
  console.log('edituseradmin controller');
    const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      const response = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      };
      res.status(200).json(response);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
  
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  // const getUserEditData=asyncHandler(async(userId)=>{
  //   console.log('get userdata',userId);
  //     const {id} =req.body
  //     console.log('id',id);
  //     console.log('bodyitems',req.body);
  //     res.status(201).json({
  //       message:'heyyy'
  //     })
  // })
  

export{
    authAdmin,
    logoutAdmin,
    getUsers,
    deleteUser,
    addUser,
    updateUserProfile,
    // getUserEditData
    
}