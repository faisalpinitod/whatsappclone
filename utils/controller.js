const { UserModel } = require("../model/user.model")
const { MessageModel } = require("../model/message.model")

async function login(socket,payload){
    
    try{
        const {email,password} = payload
        console.log(payload.email)
        const user=await UserModel.findOne({email});
        console.log(user)
        if(!user || user.password!==password){
            socket.emit("login_failed","Invalid email or password");
            return
        }
        socket.emit("Login_Successful",{userId:user._id})
        socket.data.userId=user._id
        console.log("login successfull")
    }catch(err){
        console.log(err)
        socket.emit("login_failed","Something went wrong")
    }
}


async function messageSend(socket,payload){
    const {senderId,recepientId,text}=payload
    try{
       const new_message=new MessageModel({senderId,recepientId,text,time:new Date()})
        await new_message.save()
        socket.emit('msg',new_message)
        socket.to(recepientId).emit("msg",new_message)
        console.log("Message Successfully Send")
    }catch(err){
        console.log(err)
        socket.emit("message_failed","Something went wrong")
    }
}


module.exports={
    login,
    messageSend
}

