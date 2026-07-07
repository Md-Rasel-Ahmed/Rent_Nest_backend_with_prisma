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

export const propertiController={
    createProperty,
    updateProperty,
    getProperties
}