import { Router } from "express";
import { adminController } from "./admin.controller";
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from './../../middlewares/auth';
import { role } from "../../../prisma/generated/prisma/enums";

const route=Router()
route.get("/users",verifyToken,auth(role.ADMIN),adminController.getAllUser)
route.get("/properties",verifyToken,auth(role.ADMIN),adminController.getAllProperty)
route.get("/rentals",verifyToken,auth(role.ADMIN),adminController.getAllRental)
route.patch("/users/:id",verifyToken,auth(role.ADMIN),adminController.updateUserStatus)
route.delete("/users/:id",verifyToken,auth(role.ADMIN),adminController.deleteUser)
route.patch("/category/:id",verifyToken,auth(role.ADMIN),adminController.updateCategory)
export const adminRouter=route