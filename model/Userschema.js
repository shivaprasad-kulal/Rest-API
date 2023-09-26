
const mongoose=require("mongoose")
const Userschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
       email:
       {
        type:String,
        required:true,
        unique:[true, "email already exists in DB!"]
       },
       password:{
        type:String,
        required:true
       }
    }
)
module.exports=mongoose.model("Users",Userschema);
