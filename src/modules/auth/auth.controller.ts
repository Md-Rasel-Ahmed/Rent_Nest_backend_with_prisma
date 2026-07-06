import type { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import { authService } from "./auth.service"


const registerUser:RequestHandler=catchAsync(async(req,res)=>{
    const payload=req.body
  const result=await authService.registerUserIntoDb(payload)
  res.send({
    success:true,
    data:result
  })
})
export const authController={
 registerUser
}