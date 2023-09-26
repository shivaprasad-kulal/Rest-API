const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const Router=express.Router();
const Users=require("../model/Userschema");






                                 /* get method by ID */


Router.get("/users/:id", async (req,resp)=>{
    try{
        const user=await Users.findOne({email:req.params.id});
        const passwordIsvalid=bcrypt.compareSync(req.body.password,user.password);

          if (!passwordIsvalid) {
                return resp.status(401)
                      .send({
                 accessToken: null,
                 message: "Invalid Password!"
              });
             }
     
             const token=jwt.sign({id:user.id,name:user.name},process.env.API_SECRET,{
                expiresIn:86400
             });
             resp.status(200).send({
                username:user.name,
                accessToken:token,
                message:"Login successfully.....!"
            
             })

    }
    catch(err) {
		resp.status(404)
		resp.send({ error: "No data exist......!"+err})
	}

})

                                  /*post method */

Router.post("/users",async (req,resp)=>{
    const user= new Users({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    })
    try{
    const newuser=await user.save();
    resp.status(200).send({message: "User Registered successfully"})

    }
     catch(err) {
		resp.status(500)
		resp.send({ error: "server error-"+err})
	}

}
)
                       /*===============verify tokens ==================== */
  const checkToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                  return res.status(403).send({ message: 'No token provided' });
                       }
                       req.token=token;
                       next()
}

 Router.get('/user', checkToken, (req, res) => {
                 jwt.verify(req.token, process.env.API_SECRET, (err, authorizedData) => {
            if(err){
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
            }
        })
    })



   

//=================================================


function verifyToken(req, res, next) {
           const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                  return res.status(403).send({ message: 'No token provided' });
                       }
                jwt.verify(token, process.env.API_SECRET, (err) => {

                  if (err) {
                        return res.status(500).send({ message: 'Failed to authenticate token' });
                         }
                    next();
                  });
                }

Router.get('/allusers', verifyToken, async (req, res) => {
        try {
           const otherUsers = await Users.find({},'-_id name email');
          res.json(otherUsers);
            } 
        catch(error){
              res.status(500).send({ message: 'Server error' });
              }
});
//======================================================================

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