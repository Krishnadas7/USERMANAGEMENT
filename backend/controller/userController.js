import asyncHandler from 'express-async-handler'
import User from '../model/userShema.js'
import generateToken from '../utils/generateToken.js'

const authUser =asyncHandler(async (req,res) =>{
 
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPasswords(password))){
        generateToken(res,user._id)
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            profileImg:user.profileImg||""
        })
    }else{
        res.status(401).json({message:'invalid email or password'})
    }

})
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400).json({message:'invalid user data'})
    }


    res.status(200).json({message:'user registerd'})
})
const logoutUser = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'user logged out'})
})

const getUserProfile = asyncHandler(async (req,res)=>{
    const user={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    console.log(req.user);
    res.status(200).json(user)
})
const updateUserProfile = asyncHandler(async (req,res)=>{
  const user = await User.findById(req.user._id)

  if(user){
   user.name =req.body.name|| user.name
   user.email = req.body.email || user.email

   if(req.body.password){
    user.password=req.body.password
   }
   const updatedUser =  await user.save()
   res.status(200).json({_id:updatedUser._id,
   name:updatedUser.name,
   email:updatedUser.email
  })
  }else{
    res.status(404)
    throw new Error('user not found')
  }

    res.status(200).json({message:'update profile'})
})
const setUserProfile = asyncHandler(async (req, res) => {
    console.log('admincontrollerimage');
    try {
        const { userId } = req.body; 
        console.log('userId:', userId);
        
        // Ensure userId is properly extracted from the formData
        const user = await User.findById(userId);
        console.log('userdetailforiamge:', user);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        if (req.file) { 
            user.profileImg = req.file.filename; 
        }
        
        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,  
            profileImg: user.profileImg
        });
    } catch (error) {
        console.error('Error setting profile image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    setUserProfile
}