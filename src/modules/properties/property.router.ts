import { Router } from "express";
import { propertiController } from "./property.controller";
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from './../../middlewares/auth';
import { role } from "../../../prisma/generated/prisma/enums";

const route=Router()
route.post("/properties",verifyToken,auth(role.LANDLORD),propertiController.createProperty)
route.get("/properties",propertiController.getProperties)

route.get("/properties/requests",verifyToken,auth(role.LANDLORD),propertiController.getRentalRequests)
route.get("/properties/:id",propertiController.getSingleProperty)


route.patch("/properties/requests/:id",verifyToken,auth(role.LANDLORD),propertiController.updateRentalStatus)
route.put("/properties/:id",verifyToken,auth(role.LANDLORD),propertiController.updateProperty)
route.delete("/properties/:id",verifyToken,auth(role.LANDLORD),propertiController.deleteProperty)

export const propertiRouter=route