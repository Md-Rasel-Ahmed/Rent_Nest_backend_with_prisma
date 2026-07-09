import type { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import  httpStatus  from 'http-status';


const registerUser:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
    
  const result=await authService.registerUserIntoDb(payload)
  res.send({
    success:true,
    data:result
  })
})
const loginUser:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
    const result=await authService.loginUserIntoDb(payload)
  res.cookie('accessToken', result.accessToken,{
      httpOnly: true,
    secure:false,  //process.env.NODE_ENV === 'production', 
    sameSite: true, 
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  res.cookie('refreshToken', result.refreshToken,{
      httpOnly: true,
    secure:false,  //process.env.NODE_ENV === 'production', 
    sameSite: true, 
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User login successfull",
    data:result
   })
})
const getProfile:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.user?.id
    
    const result=await authService.getProfileIntoDb(id)
     sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User retrived successfull",
    data:result
   })
})
export const authController={
 registerUser,
 loginUser,
 getProfile
}