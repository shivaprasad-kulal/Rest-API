const express=require("express")
const Router=express.Router();
Router.get("/",(req,resp)=>{
    resp.send("get request from api1")
})
module.exports=Router