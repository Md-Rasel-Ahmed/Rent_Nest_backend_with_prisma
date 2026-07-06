import express, { type Application, type Request, type Response } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import config from "./config"
import { authRoute } from "./modules/auth/auth.router"
const app:Application=express()

app.use(express.json())
app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.use(cookieParser())  
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRoute)

app.get('/',(req:Request,res:Response)=>{
    res.send("Server is connected!")
})


export default app

