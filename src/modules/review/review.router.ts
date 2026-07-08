import { Router } from "express";
import { createReview } from "./review.controller";
import { verifyToken } from './../../middlewares/verifyToken';
import { auth } from './../../middlewares/auth';
import { role } from "../../../prisma/generated/prisma/enums";

export const reviewRouter=Router()
reviewRouter.post("/",verifyToken,auth(role.TENANT),createReview)
