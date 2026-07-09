import express,{ Router } from "express";
import { paymentController } from "./payment.controller";

const route=Router()
// route.post("/create",paymentController.createPayment)

route.post('/confirm', paymentController.confirmPayment);
route.post("/checkout",paymentController.initiatePayment)
export const paymentRouter=route