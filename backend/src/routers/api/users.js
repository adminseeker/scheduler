const express = require("express");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const User = require("../../models/User");
const Task = require("../../models/Task");

const router = express.Router();



/* 
    route : "/api/users",
    desc : "Register",
    method: "POST"
*/

router.post("/",async (req,res)=>{
    try {
        
        let check = await User.find({email:req.body.email});
        if(check.length!==0){
            return res.json({"msg":"Email already registered!"})
        }
        check = await User.find({phone:req.body.phone});
        if(check.length!==0){
            return res.json({"msg":"Phone already registered!"})
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        
        const user = new User(req.body);
        generateAuthToken(user.id,(token)=>{
            user.tokens =user.tokens.concat({token})
        });
        await user.save();
        res.json(user.tokens[user.tokens.length-1]);        
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users",
    desc : "Update profile",
    method: "PATCH"
*/

router.patch("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.json({"msg":"User Not Found!"})
        }
    const updates = req.body;
    delete updates.token;
    delete updates._id;
    delete updates.id;
    if(updates.email){
        return res.json({"msg":"This field cannot be Updated!"})
    }
    if(updates.password){
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password,salt)
    }
    const editUser = await User.findOneAndUpdate({_id:user.id},updates,{new:true}).select("-password")    
    res.json(editUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/users/password",
    desc : "Update password",
    method: "PATCH"
*/

router.patch("/password",auth,async (req,res)=>{
    try {
    let newPassword = req.body.newPassword;
    const password = req.body.password;
    if(newPassword && password){
        const user = await User.findOne({_id:req.user.id});
        if(!user){
            return res.status(400).json({errors:[{msg:"invalid user!"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({code:"0",msg:"incorrect current password!"});
        }
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword,salt);
        user.password = newPassword;
        await user.save();
        return res.json({code:"1","msg":"Password Changed Successfully!"});
    }
        return res.json({code:"2","msg":"Error in changing password!"});

    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/users",
    desc : "Delete User Account",
    method: "DELETE"
*/

router.delete("/",auth,async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
           return res.json({"msg":"User Not Found!"})
        }
        await Task.deleteMany({user:req.user.id})
        await user.remove();
        return res.json({"msg":"User removed Successfully!"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});




module.exports = router;

