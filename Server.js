const express=require("express")
const mongoose=require("mongoose");

const Server=express();
const PORT=process.env.PORT || 3000;
const Router=require('./Routers/UserRouter')

Server.use('/api',Router)


Server.listen(PORT,()=>{
    console.log(`server strated on port ${PORT}`)
    
})