import Stripe from 'stripe'
import { prisma } from '../../lib/prisma';
import config from '../../config';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2026-06-24.dahlia',
});

const createCheckoutSession = async (payload:any,userId:string)=> {
    const {rentalRequestId,amount,}=payload
    console.log(userId,rentalRequestId);
    // jodi rental request approved kore tahole payment korte parbe 
     const getRental=await prisma.rentalRequests.findFirst({
        where:{
            tenantId:userId,
            id:rentalRequestId,  
        }
      })
      if(!getRental){
        throw new Error("Sorry not founded rental")
      }
      if(getRental?.status!=="APPROVED"){
        throw new Error("Your can not create payment because rental status is not approved")
      }
  const order = await prisma.payments.create({
   data: {
      rentalRequestId,
      userId,
      amount,
      provider: 'STRIPE',
      transactionId: 'TEMP_ID',
      status: 'PENDING',
    },
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'bdt',
          product_data: {
          name: `Rental Payment (Request ID: ${rentalRequestId})`,          },
          unit_amount: amount * 100, 
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
   metadata: {
      orderId: order.id,
      userId: userId,
      rentalRequestId: rentalRequestId
    },
    success_url: `http://localhost:5000/api/payments/success?orderId=${order.id}`,
    cancel_url: `http://localhost:5000/api/payments/cancel?orderId=${order.id}`,
  });

  return session.url;
};




const handleConfrim=async(sig:string,payload:Buffer)=>{
  const endpointSecret=config.stripe_webhook_secret as string
   const  event = stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
      switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      console.log(session);
      const orderId = session.metadata?.orderId as string;
      const userId = session.metadata?.userId; 
      const stripeTransactionId = session.payment_intent as string
      await prisma.payments.update({
        where:{
          id:orderId
        },
        data:{
          status:'SUCCESS',
          transactionId: stripeTransactionId,
           paidAt: new Date()
        }
      })
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
}

const getUserPaymentHistoryIntoDb=async(userId:string)=>{
  console.log(userId);
const paymentHistories=await prisma.payments.findMany({
  where:{
    userId:userId

  }
})
return paymentHistories
}

const getPaymentDetailsIntoDb=async(id:string)=>{
  const getSinglePayment=await prisma.payments.findUniqueOrThrow({
    where:{
      id
    }
  })
  return getSinglePayment
}
export const paymentService = {
  createCheckoutSession,
  handleConfrim,
  getPaymentDetailsIntoDb,
  getUserPaymentHistoryIntoDb
};