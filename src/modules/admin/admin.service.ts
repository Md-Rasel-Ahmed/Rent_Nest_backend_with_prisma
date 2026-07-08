import type { status } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getAllUserIntoDb=async()=>{
    const users=await prisma.users.findMany()
    return users
}
const getAllPropertyIntoDb=async()=>{
    const users=await prisma.properties.findMany()
    return users
}
const getAllRentalIntoDb=async()=>{
    const users=await prisma.rentalRequests.findMany()
    return users
}
const updateUserStatusIntoDb=async(payload:string,id:string)=>{
    console.log(payload);
   const exitsUser=await prisma.users.findUniqueOrThrow({
    where:{
        id
    },
    omit:{
        password:true
    }
   })
  const update=await prisma.users.update({
    where:{
        id
    },
    data:{
        status:payload as status
    },
    omit:{
        password:true
    }
  })
  return update
}
const updateCategoryIntoDb=async(payload:string,id:string)=>{
  const update=await prisma.categories.update({
    where:{
        id
    },
    data:{
        name:payload
    },
  })
  return update
}
export const adminService={
    getAllUserIntoDb,
    updateCategoryIntoDb,
    getAllPropertyIntoDb,
    getAllRentalIntoDb,
    updateUserStatusIntoDb
}