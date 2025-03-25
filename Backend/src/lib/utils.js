import jwt from "jsonwebtoken";


export const generateTokens = (userId , res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*100,
        httpOnly:true,//xxs attack
        sameSite:"strict",//cross site script attack
        secure:process.env.NODE_ENV !== "development"
    });
    return token;
}
