const express=require("express")
const Router=express.Router();
const Users=require("../model/Userschema");
Router.get("/users",async (req,resp)=>{
    try{
    const userlist=await Users.find();
    resp.json(userlist);

    }
     catch(err) {
		resp.status(404)
		resp.send({ error: "No data exist!"})
	}


})
Router.get("/users/:id", async (req,resp)=>{
    try{
        const user=await Users.find({email:req.params.id});
        resp.json(user);
    }
    catch(err) {
		resp.status(404)
		resp.send({ error: "No data exist!"})
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
     catch(err) {
		resp.status(404)
		resp.send({ error: "No data exist!"})
	}

}
)

Router.patch("/users/:id", async (req,resp)=>{
     try{
        const user=await Users.findById(req.params.id);
        user.name=req.body.name
        const updateduser=await user.save()
        resp.send(updateduser)
    }
    catch(err) {
		resp.status(404)
		resp.send({ error: "No data exist!"})
	}

})
Router.delete("/users/:id", async (req,resp)=>{
     try{
        await Users.deleteOne({_id:req.params.id});
        
        resp.status(204).send("successfully deleted")
        
    }
    catch(err) {
		resp.status(404)
		resp.send({ error: "There is no data" +err})
	}

})
module.exports=Router