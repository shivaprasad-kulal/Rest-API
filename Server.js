const express=require("express")
const mongoose=require("mongoose");
const url="mongodb://localhost/Users"
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection;
con.on('open',()=>{
    console.log("MONGODB connected..........")
});


const Server=express();
const PORT=process.env.PORT || 3000;
const Router=require('./Routers/UserRouter')
Server.use(express.json());
Server.use('/api',Router)



Server.listen(PORT,()=>{
    console.log(`server strated on port ${PORT}............`)
    
})