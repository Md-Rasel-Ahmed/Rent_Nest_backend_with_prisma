import { prisma } from "../../lib/prisma"

const createCategoryIntoDb=async(payload:{name:string})=>{
    const{name}=payload
  const category=await prisma.categories.create({
    data:{
     name
    }
  })
  return category
}
const getCategoryIntoDb=async()=>{
 const categories=await prisma.categories.findMany()
 return categories
}
export const cetagoryService={
    createCategoryIntoDb,
getCategoryIntoDb
}