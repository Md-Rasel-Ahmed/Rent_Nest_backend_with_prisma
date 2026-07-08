import { prisma } from "../../lib/prisma";

export const createReviewIntoDb=async(payload:any,userId:string)=>{
    // console.log(payload,userId);
    const{comment,rating}=payload
     const isAlreadyRequested=await prisma.rentalRequests.findFirst({
    where:{
        tenantId:userId,
        propertyId:payload.propertyId,  
    }
  })
  if(!isAlreadyRequested){
    throw new Error("Your can not create review on this rental property!")
  }
  if(isAlreadyRequested.status!=="COMPLETED"){
    throw new Error("Your can not create review because your status is not completed!")
  }
  const review=await prisma.reviews.create({
    data:{
        tenantId:userId,
        propertyId:payload.propertyId,
        comment,
        rating
    }
  })
return review
}
