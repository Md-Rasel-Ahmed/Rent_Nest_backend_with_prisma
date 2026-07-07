import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { propertiService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

const createProperty:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
    const id=req.user?.id
    console.log(payload,id);
 const result=await propertiService.createPropertyIntoDb(payload,id)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    data:result,
    message:"Property create successfull"
  })
})
const updateProperty:RequestHandler=catchAsync(async(req,res)=>{
   const payload=req.body
   const id=req.params?.id
     const result=await propertiService.udpatePropertyIntoDb(payload,id as string)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    data:result,
    message:"Property update successfull"
  })
})
const getProperties:RequestHandler=catchAsync(async(req,res)=>{
     const result=await propertiService.getPropertiesIntoDb()
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    data:result,
    message:"All properties retrived successfull"
  })
})
const deleteProperty:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id
     const result=await propertiService.deletePropertyIntoDb(id as string)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:" Property delete successfull"
  })
})
const updateRentalStatus:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id
    const payload=req.body
     const result=await propertiService.updateRentalStatusIntoDb(id as string,payload)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Rental status updated successfull"
  })
})
const getRentalRequests:RequestHandler=catchAsync(async(req,res)=>{
    const userId=req.user?.id
     const result=await propertiService.getRentalRequestsIntoDb(userId)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:" Rental requested property retrive successfull",
    data:result
  })
})

export const propertiController={
    createProperty,
    deleteProperty,
    updateProperty,
    getProperties,
    getRentalRequests,
    updateRentalStatus
}