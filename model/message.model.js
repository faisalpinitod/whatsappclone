const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    recepeintId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    text:String,
    time:Date
},{
    versionKey:false
})

const MessageModel = mongoose.model('message',messageSchema)

module.exports={
    MessageModel
}