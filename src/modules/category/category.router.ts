import { Router } from "express";
import { ctegoryController } from "./category.controller";

const route=Router()

route.post("/",ctegoryController.createCategories)
route.get("/",ctegoryController.getCategories)

export const catergoriRouter=route