import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import config from "../config";
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { id: string; role: string,status:string }; 
    }
  }
}
export const verifyToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 const token=req.cookies?.accessToken
 if(!token){
    throw new Error("You are not logged in! Please login to get access")
 }
 const decodedToken=jwt.verify(token,config.jwt_access_secret as string)as JwtPayload
 if(!decodedToken.email){
    throw new Error("Invalid token!")
 }
 req.user=decodedToken
 next()
})