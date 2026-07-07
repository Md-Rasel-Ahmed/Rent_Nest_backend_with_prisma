import { Router } from "express";
import { propertiController } from "./property.controller";
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from './../../middlewares/auth';
import { role } from "../../../prisma/generated/prisma/enums";

const route=Router()
route.post("/properties",verifyToken,auth(role.LANDLORD),propertiController.createProperty)
route.get("/properties",propertiController.getProperties)
route.put("/properties/:id",verifyToken,auth(role.LANDLORD),propertiController.updateProperty)

export const propertiRouter=route