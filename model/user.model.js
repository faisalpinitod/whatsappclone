const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profile_pic:String,
    contact_list:[{contactName:String,contactNumber:String}]
},{
    versionKey:false
})

const UserModel = mongoose.model('user',userSchema)

module.exports={
    UserModel
}