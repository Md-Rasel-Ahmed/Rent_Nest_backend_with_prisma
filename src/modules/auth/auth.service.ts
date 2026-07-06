import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import type { role } from "../../../prisma/generated/prisma/enums"

interface IregisterUser{
    email:string,
    password:string,
    role?:role
    
}
const registerUserIntoDb=async(payload:IregisterUser)=>{
   const {email,password,role}=payload
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
    });

    return user;
  
}

export const authService={
    registerUserIntoDb
}