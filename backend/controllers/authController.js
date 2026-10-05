import User from '../models/User.js'
import UserPreference from '../models/UserPreference.js'
import jwt from 'jsonwebtoken'



//function that generate jwt token
const generateToken=(user)=>{
    return jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'10h'}
    );
};  


//register new user
export const register=async(req,res,next)=>{
    try {
        const {email,password,name}=req.body;

        //required all details
        if(!email||!password||!name){
            return res.status(400).json({
                success:false,
                message:'Please fill the details'
            });
        }

        //check if user exist or not
        const existingUser=await User.findByEmail(email);
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user already exist'
            });
        }

        //create user
        const user=await User.create({email,password,name});
        
        //create default preference
        await UserPreference.upsert(user.id,{
            dietary_restrcition:[],
            allergies:[],
            preferred_cuisines:[],
            default_servings:4,
            measurement_unit:'metric'
        });

        const token=generateToken(user);

        res.status(201).json({
            success:true,
            message:'user registered successfully',
            data:{
                user:{
                    id:user.id,
                    email:user.email,
                    name:user.name
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

//login user function
export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        //validate
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:'please fill all details'
            })
        }

        const user=await User.findByEmail(email);
        if(!user){
            return res.status(400).json({
                success:false,
                message:'Invalid details'
            });
        }

        //verify password
        const isPasswordValid=await User.verifyPassword(password,user.password_hash);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:'invalid password'
            });
        }
        const token=generateToken(user);
        res.json({
            success:true,
            message:'login successfully',
            data:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                },
                token
            }
        });

    } catch (error) {
        next(error);
    }
}

//get current user
export const getCurrentUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found'
            })
        }

        res.json({
            success:true,
            message:'welcome',
            data:{user}
        })
    } catch (error) {
        next(error);
    }
}

//request password reset (placeholder-would send email in production)
export const requestPasswordReset=async(req,res,next)=>{
    try {
        const {email}=res.body

        if(!email){
            return res.status(400).json({
                success:false,
                message:'please provide email'
            });
        }
        const user=await User.findByEmail(email);

        //don't reveal if the user exist or not because of security
        res.json({
            success:true,
            message:"password reset email has been sent!"
        })
    } catch (error) {
        next(error);
    }
}