const express = require("express")
const http = require("http")
const { connection } = require("./config/db")
const socketio = require("socket.io")
const { userRouter } = require("./routes/user.router")
const { login,messageSend } = require("./utils/controller")

const cors = require("cors")



const app=express()




const httpServer=http.createServer(app)
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)

const io=socketio(httpServer)




io.on("connection",(socket)=>{
    console.log("Client connected")

    socket.on("login",(payload)=>{
        login(socket,payload)
        // console.log(payload)
    })
    socket.on("message",(payload)=>{
        messageSend(socket,payload)
        console.log(payload)
    })

    socket.on("disconnect",()=>{
        console.log("Client Disconnected")
    })

})

httpServer.listen(8080,async()=>{
    try{
        await connection
        console.log("Server is connected to DB")
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
    console.log("The server is running at 8080")
})


