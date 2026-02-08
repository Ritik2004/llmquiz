import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/utils.js';
export const login =async (req, res) => {
     const{email,password} = req.body;
    try{
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"User does not exist"});
       }
       const ispwdprotected = await bcrypt.compare(password,user.password);
         if(!ispwdprotected){
            return res.status(400).json({message:"Invalid password"});
         } 
          generateToken(user._id,res);
            res.status(200).json({
              _id:user._id,
              firstname:user.firstname,
              lastname:user.lastname,
              email:user.email
            });
    }
    catch(error){
        console.log("Error in login", error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const signup = async (req,res)=>{
    const{firstname,lastname,email,password} = req.body;
    try{
      if(!firstname || !lastname || !email || !password){
        return res.status(400).json({message:"All fields are required"});
      }
      if(password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
      }
      const user = await User.findOne({email});
       if(user) return res.status(400).json({message:"User already exists"});
      
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       const newUser = new User({
        firstname,
        lastname,
        email,
        password:hashedPassword
       })
         if(newUser){
            console.log("Res",res)
              generateToken(newUser._id,res);
              await newUser.save();
         res.status(201).json({message:"User registered successfully"});
         }
         else{
            res.status(400).json({message:"Invalid user data"});
         }
    }
    catch(error){
      console.log("Error in signup",error.message);
      res.status(500).json({message:"Internal server error"});
    } 

}

export const checkAuth = (req,res)=>{
  try{
     res.status(200).json({message:"User is authenticated",user:req.user});
  }
  catch(error){
    console.log("Error in checkAuth",error.message);
    res.status(500).json({message:"Internal server error"});
}
}

export const logout = (req,res)=>{

}