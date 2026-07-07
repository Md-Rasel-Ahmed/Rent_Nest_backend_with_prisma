import { prisma } from "../../lib/prisma"

const createRentalIntoDb=async(payload:any,userId:string)=>{
console.log(payload,userId);
    const isAlreadyRequested=await prisma.rentalRequests.findFirst({
    where:{
        tenantId:userId,
        propertyId:payload.propertyId,  
    }
  })
  
 if (isAlreadyRequested?.status==="PENDING") {
    throw new Error("You have already submitted a rental request for this property!");
  }
 const rental=await prisma.rentalRequests.create({
    data:{
        moveInDate:payload.moveInDate,
        propertyId:payload.propertyId,
        tenantId:userId,
    }
 })
 return rental
}
const getRentalIntoDb=async()=>{
   const getRentals=await prisma.rentalRequests.findMany()
   return getRentals
}

export const rentalService={
    createRentalIntoDb,
    getRentalIntoDb
}