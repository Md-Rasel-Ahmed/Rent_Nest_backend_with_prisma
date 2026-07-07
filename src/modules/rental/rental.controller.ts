import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { rentalService } from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from 'http-status';

const createRental:RequestHandler=catchAsync(async(req,res)=>{
  const userId=req.user?.id
  const payload=req.body
  
  const result=await rentalService.createRentalIntoDb(payload,userId)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    data:result,
    message:"Rental Create successfull"
  })
})
const getRental:RequestHandler=catchAsync(async(req,res)=>{

  const result=await rentalService.getRentalIntoDb()
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    data:result,
    message:"Rentals retrived successfull"
  })
})
export const rentalController={
    createRental,
    getRental
}