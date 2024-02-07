const User = require("../models/auth")
const bcrypt = require("bcryptjs")

exports.signup = async(req,res,next) => {
 
    try{
        const email = req.body.email
        //console.log(email)
    
        const userExitsorNot = await User.findOne({email:email})
    
        if(!userExitsorNot){
            const newUser = new User({
                email:req.body.email,
                username:req.body.username,
                password:await bcrypt.hash(req.body.password,12)
               })
            
               await newUser.save()
    
            res.status(201).json({result:true})
        }
        else{
            //console.log('User already exists:', email);
            res.json({result:"Email already exits"})
        }
        
    }
    catch(err){
        console.log(err)
    }
      
    }

    exports.login = async(req,res,next) => {
        const email = req.body.email
        const password = req.body.password
    
      //  console.log(email)
        
        const user = await User.findOne({email:email})
       // console.log(user.password)
    
        if(user){
           const userExits = await bcrypt.compare(password,user.password)
           if(userExits){
            res.status(201).json({result:user,user:true})
           }
        } 
        else{
            res.json({result : "Email doesnt exists please signup"})
        }
    
     }