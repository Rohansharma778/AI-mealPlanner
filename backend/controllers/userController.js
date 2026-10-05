import User from '../models/User.js'
import UserPreference from '../models/UserPreference.js';

//get user profile
export const getProfile=async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        const preference=await UserPreference.findByUserId(req.user.id);
        
        res.json({
            success:true,
            data:{
                user,
                preference
            }
        });
    } catch (error) {
        next(error)
    }
}

//update user profile
export const updateProfile=async(req,res,next)=>{
    try {
        const {name,email}=req.body

        const  user=await User.update(req.user.id,{name,email});

        res.json({
            success:true,
            message:'profile updated succesfully',
            data:{user} 
        })
    } catch (error) {
        next(error);
    }
}

//update preference
export const updatePreference=async(req,res,next)=>{
    try {
        const preferences=await UserPreference.upsert(req.user.id,req.body);
        res.json({
            success:true,
            message:'preference updated successfully',
            data:{
                preferences
            }
        })
    } catch (error) {
        next(error)
    }
}

//change password function 
export const changePassword=async(req,res,next)=>{
    try {
        const {currentPassword,newPassword}=req.body

        if(!currentPassword||!newPassword){
            return res.status(400).json({
                success:false,
                message:'please fill all details'
            })
        }

        //verify password
        const user =await User.findByEmail(req.user.email);
        const isValid=await User.verifyPassword(currentPassword,user.password_hash);

        if(!isValid){
            return res.status(401).json({
                success:false,
                message:'current password is incorrect'
            });   
        }
        
        //updated password
        await User.updatePassword(req.user.id,newPassword);

        res.json({
            success:true,
            message:'password change successfully'
        })
    } catch (error) {
        next(error);
    }
}

//delete account
export const deleteAccount=async(req,res,next)=>{
    try {
        await User.delete_User(req.user.id);
        res.json({
            success:true,
            message:'account deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}