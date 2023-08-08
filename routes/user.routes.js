const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const {User}=require("../models/index")

require("dotenv").config()

const userRoute=express.Router()

userRoute.post("/register", async (req,res)=>{
    const {name, email, password}=req.body
    try {
        const userExist=await User.findOne({where:{email}})

        if(userExist){
            return res.status(401).json({msg:"User already exist"})
        }else if(!name || !email || !password){
            return res.status(401).json({msg:"All details are mandatory"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPass,
        }, {
            validate: true // Enable validation on the create method
        });

        return res.status(201).json({msg:"User registered sucessfully", user})
    } catch (err) {
        return res.status(500).json({ msg: 'Something went wrong in registering user', error: err.message });
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      // Compare provided password with hashed password stored in db
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user.id, username:user.name, userEmail:user.email }, process.env.JWT_CODE, {
        expiresIn: "1h",
      });
  
      // Set the token as HttpOnly cookie
      res.cookie('token', token, {
        expires:new Date(Date.now()+ 2589200000),
        httpOnly: true
      });
      
      return res.status(201).json({msg:"Logged in sucesfully", Token:token, user:user})
      
    } catch (err) {
      return res.status(500).json({ msg: 'Server error', err: err.message });
    }
  });
  

userRoute.post('/logout', async (req,res)=>{
    //clear the token 
    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
})

module.exports={userRoute}