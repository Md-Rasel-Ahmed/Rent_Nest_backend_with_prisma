import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

const getAllUser:RequestHandler=catchAsync(async(req,res)=>{
    const result=await adminService.getAllUserIntoDb()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"All users retrived successfull"

    })
})

export const adminController={
    getAllUser
}