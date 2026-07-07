import { Router } from "express"
import { rentalController } from "./rental.controller"
import { verifyToken } from './../../middlewares/verifyToken';

const route=Router()
route.post("/",verifyToken,rentalController.createRental)
route.get("/",rentalController.getRental)
export const rentalRouter=route