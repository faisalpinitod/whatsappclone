const express = require("express")
const { UserModel } = require("../model/user.model")
const { login,messageSend } = require("../utils/controller")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,profile_pic,contact_list} = req.body
    try{
        const person = await UserModel.findOne({email})
        if(person){
            return res.send("User already exist")
        }
        const user = new UserModel({name,email,password,profile_pic,contact_list})
        await user.save()
        res.send("User registered Successful")
        console.log(user)
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})




userRouter.post("/login",login)
userRouter.post("/message",messageSend)



 module.exports = {
    userRouter
 }