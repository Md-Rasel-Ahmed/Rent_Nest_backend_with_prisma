import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import type { role } from "../../../prisma/generated/prisma/enums"
import { jwtUtils } from "../../utils/createToken"

interface IauthUser{
    email:string,
    password:string,
    role?:role
    
}
const registerUserIntoDb=async(payload:IauthUser)=>{
   const {email,password,role}=payload
//    role valided from client side to selected role 
   if(role==="ADMIN"){
   throw new Error("You are not authorized to register as an admin!")
   }
 const hashPassword=await bcrypt.hash(password,10)
 const userData: any = {
        email,
        password: hashPassword,
    };

    if (role) {
        userData.role = role;
    }
  const user = await prisma.users.create({
        data: userData,
        omit:{
            password:true
        }
    });

    return user;
  
}

const loginUserIntoDb=async(payload:IauthUser)=>{
    const {password,email}=payload
 const user=await prisma.users.findUniqueOrThrow({
    where:{
        email:email
    },
 })
 const matchPassword=await bcrypt.compare(password,user.password)
 if(!matchPassword){
    throw new Error("Password did not match")
 }
 const jwtPayload={
    email:user.email,
    password:user.password,
    role:user.role
 }
 const token=jwtUtils.createToken(jwtPayload)
 return token
}
export const authService={
    registerUserIntoDb,
    loginUserIntoDb
}