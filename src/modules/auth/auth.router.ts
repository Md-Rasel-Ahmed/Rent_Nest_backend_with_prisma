import { Router } from "express";
import { authController } from "./auth.controller";
import { verifyToken } from './../../middlewares/verifyToken';

const route=Router()

route.post('/register',authController.registerUser)
route.post('/login',authController.loginUser)
route.get('/me',verifyToken,authController.getProfile)

export const authRoute=route