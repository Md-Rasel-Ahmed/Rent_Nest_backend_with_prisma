import { Router } from "express";
import { adminController } from "./admin.controller";
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from './../../middlewares/auth';
import { role } from "../../../prisma/generated/prisma/enums";

const route=Router()
route.get("/users",verifyToken,auth(role.ADMIN),adminController.getAllUser)
export const adminRouter=route