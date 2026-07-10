import express,{ Router } from "express";
import { paymentController } from "./payment.controller";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from './../../middlewares/verifyToken';

const route=Router()
// route.post("/create",paymentController.createPayment)

route.post('/confirm', paymentController.confirmPayment);
route.post("/checkout",verifyToken,paymentController.initiatePayment)
route.get("/success",(req,res)=>{
  sendResponse(res,{
    success:true,
    statusCode:200,
    message:"Your payment has been succeed!"
  })
})
route.get("/cancel",(req,res)=>{
  sendResponse(res,{
    success:false,
    statusCode:404,
    message:"Your payment has been canceled!"
  })
})
route.get("/",verifyToken,paymentController.getUserPaymentHistory)
route.get("/:id",verifyToken,paymentController.getPaymentDetails)
export const paymentRouter=route