import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


 export const signup=async(req, res)=>{
    try{ const {name, email, password}=req.body;
    const user=await User.findOne({email});
    if(user){
        res.status(403).json({msg:"User already present", success:false})
    }
    const userModel=new User({name, email, password});
    userModel.password=await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(200).json({msg:'data is save' ,success:true});
} catch(err){
    res.status(500).json({msg:"internal server eroor", err});
}
    
}

export const login=async(req, res)=>{
    try{ const { email, password}=req.body;
    const user= await User.findOne({email});
    if(!user){
       return res.status(403).json({msg:"User doesnot exit", success:false})
    }

const isPass= await bcrypt.compare(password, user.password);
 console.log(user.password);
if(!isPass){
  return  res.status(404).json({msg:"this is incorrect password",success:false})
}
    const jwtToken=jwt.sign(
     {email:user.email, _id:user._id},
       process.env.JWT_KEY_TOKEN,
       {expiresIn:"24h"}
    )
    console.log(jwtToken);
    res.status(200).json({msg:'you login successfully' ,email, jwtToken, name:user.name, success:true});
} catch (err) {
  console.error("🔥 AUTH ERROR:", err);   // ⭐ VERY IMPORTANT
  res.status(500).json({
    msg: "internal server error",
    error: err.message
  });
}
    
}

// controllers/authController.js
// export const logoutUser = (req, res) => {
//   console.log("✅ Logout API called");

//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   res.status(200).json({ success: true });
// };

export const logoutUser = (req, res) => {
  console.log("✅ Logout API called");

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ success: true });
};



