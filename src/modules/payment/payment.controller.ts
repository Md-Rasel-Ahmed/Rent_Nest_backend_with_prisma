import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";

const initiatePayment:RequestHandler=catchAsync(async(req,res)=>{
    const userId=req.user?.id as string
    const paymentUrl = await paymentService.createCheckoutSession(req.body,userId);
     sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Payment url Create successfullyt",
        data:{
            paymentUrl
        }
    })

})
const confirmPayment:RequestHandler=catchAsync(async(req,res)=>{
   const sig = req.headers['stripe-signature'] as string
   const event=req.body
   await paymentService.handleConfrim(sig,event)
   
})
const getUserPaymentHistory:RequestHandler=catchAsync(async(req,res)=>{
    const userId=req.user?.id
    console.log(userId);
    const result=await paymentService.getUserPaymentHistoryIntoDb(userId)
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"All payment history retrived successfull",
        data:result
    })
})
const getPaymentDetails:RequestHandler=catchAsync(async(req,res)=>{
    const id=req.params?.id as string
    const result=await paymentService.getPaymentDetailsIntoDb(id)
    sendResponse(res,{
        success:true,
        statusCode:200,
        data:result,
        message:"Payment retrived successfull"
    })
})
// const initiatePayment:RequestHandler = async (req: Request, res: Response) => {
//   try {
//     const { productId, price } = req.body;

//     const paymentUrl = await PaymentService.createCheckoutSession(productId, price);

//     if (paymentUrl) {
//       // ব্যাকএন্ড থেকেই ইউজারকে স্ট্রাইপ পেজে রিডাইরেক্ট করা হলো
//       return res.redirect(303, paymentUrl);
//     }
    
//     return res.status(400).json({ message: "Payment URL generation failed" });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };
export const paymentController={
    initiatePayment,
    getPaymentDetails,
    confirmPayment,
    getUserPaymentHistory
}