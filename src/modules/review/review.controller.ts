import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { createReviewIntoDb } from "./rivew.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

export const createReview:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
    const userId=req.user?.id
    const result=await createReviewIntoDb(payload,userId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        data:result,
        message:"Review create successfull"
    })
})