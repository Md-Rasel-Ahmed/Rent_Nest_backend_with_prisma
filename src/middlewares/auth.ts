import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";


export const auth=(...role:string[])=>{
  return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 const user=req.user
 console.log(user?.role,role);
 if(!user){
    throw new Error("You are not authorized! Please login first.")
 }
  if(!role.includes(user.role)){
    throw new Error("'Forbidden! You do not have permission to access this resource.")
  }
  next()
})
}