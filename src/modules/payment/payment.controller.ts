import type { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";

const initiatePayment:RequestHandler=catchAsync(async(req,res)=>{
    const paymentUrl = await paymentService.createCheckoutSession(req.body);
    console.log(paymentUrl);

})
const confirmPayment:RequestHandler=catchAsync(async(req,res)=>{
   const sig = req.headers['stripe-signature'] as string
   const event=req.body
   await paymentService.handleConfrim(sig,event)
   console.log(sig,"from contoller");
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
    confirmPayment
}