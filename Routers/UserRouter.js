const express=require("express")
const Router=express.Router();
const Users=require("../model/Userschema");
Router.get("/users",async (req,resp)=>{
    try{
    const userlist=await Users.find();
    resp.json(userlist);

    }
    catch(err)
    {
        resp.send("ERROR",err);
    }

})

Router.post("/users",async (req,resp)=>{
    const user= new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
    const newuser=await user.save();
    resp.json(newuser);

    }
    catch(err)
    {
        resp.send("ERROR",err);
    }

}
)
module.exports=Router