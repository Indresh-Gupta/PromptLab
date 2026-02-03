import joi from "joi";

export const signupValidation=(req, res, next)=>{
   const schema=joi.object({
    name:joi.string().min(3).max(100).required(),
    email:joi.string().email().required(),
    password:joi.string().min(3).max(100).required()
})
const {error}=schema.validate(req.body);
if(error){
   return res.status(400).json({msg:"need to enter valid data", error})
}
next();
}
export const loginValidation=(req, res, next)=>{
    const schema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(3).max(100).required()
})
console.log("Incoming request:", req.method, req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
const {error}=schema.validate(req.body);

if(error){
   return  res.status(404).json({msg:"need to enter valid data"})
}
next();
}

