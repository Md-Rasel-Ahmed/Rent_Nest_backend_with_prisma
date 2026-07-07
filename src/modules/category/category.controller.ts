import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { cetagoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

const getCategories:RequestHandler=catchAsync(async(req,res)=>{
   const result=await cetagoryService.getCategoryIntoDb()
   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    data:result,
    message:"Categories retrived successfull"
   })
})
const createCategories:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
 const result=await cetagoryService.createCategoryIntoDb(payload)
   sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    data:result,
    message:"Categories create successfull"
   })
})
export const ctegoryController={
    getCategories,
    createCategories
}