import { Router } from "express"
import { rentalController } from "./rental.controller"
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from "../../middlewares/auth";
import { role } from "../../../prisma/generated/prisma/enums";

const route=Router()
route.post("/",verifyToken,auth(role.TENANT),rentalController.createRental)
route.get("/",verifyToken,auth(role.TENANT),rentalController.getRental)
export const rentalRouter=route