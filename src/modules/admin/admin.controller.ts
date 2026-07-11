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
const getAllProperty:RequestHandler=catchAsync(async(req,res)=>{
    const result=await adminService.getAllPropertyIntoDb()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"All Properties retrived successfull"

    })
})
const getAllRental:RequestHandler=catchAsync(async(req,res)=>{
    const result=await adminService.getAllRentalIntoDb()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"All rental retrived successfull"

    })
})
const updateUserStatus:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id
    const payload=req.body.status
    const result=await adminService.updateUserStatusIntoDb(payload,id as string)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"User status updated successfull"

    })
})
const updateCategory:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id
    const payload=req.body.name
    const result=await adminService.updateCategoryIntoDb(payload,id as string)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"Category updated successfull"

    })
})
const deleteUser:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id
    const result=await adminService.deleteUserIntoDb(id as string)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        data:result,
        message:"User delete successfull"

    })
})


export const adminController={
    getAllUser,
    updateUserStatus,
    getAllProperty,
    deleteUser,
    getAllRental,
    updateCategory
}