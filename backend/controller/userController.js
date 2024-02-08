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
            email:user.email
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
    res.status(200).json({message:'user logout'})
})
const getUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message:'user profile'})
})
const updateUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message:'update profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}