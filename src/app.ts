import express, { type Application, type Request, type Response } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import config from "./config"
import { authRoute } from "./modules/auth/auth.router"
import { propertiRouter } from "./modules/properties/property.router"
import { catergoriRouter } from "./modules/category/category.router"
import { rentalRouter } from "./modules/rental/rental.router"
import { reviewRouter } from "./modules/review/review.router"
import { adminRouter } from "./modules/admin/admin.router"
import { paymentRouter } from "./modules/payment/payment.router"
const app:Application=express()

app.use(express.json())
app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.use(cookieParser())  
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRoute)
app.use("/api/admin",adminRouter)
app.use("/api/landlord",propertiRouter)
app.use("/api/categories",catergoriRouter)
app.use("/api/rentals",rentalRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/payments",paymentRouter)
app.get('/',(req:Request,res:Response)=>{
    res.send("Server is connected!")
})


export default app

