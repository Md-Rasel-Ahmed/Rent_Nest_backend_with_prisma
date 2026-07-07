import { prisma } from "../../lib/prisma"

const createPropertyIntoDb=async(payload:any,id:string)=>{
    const {title,description,address,city,rent,bedrooms,bathrooms,area,isAvailable}=payload
  const property=await prisma.properties.create({
    data:{
   title,
   description,
   address,
   city,
   rent,
   bedrooms,
   area,
   bathrooms,
   isAvailable,
   landlordId:id,
   categoryId:"530e4b71-f7c9-4294-8012-985f0e337f27"
    }
  })
  return property
}
interface Iupdate{
    title?:string
   description?:string
   address?:string
   city?:string
   rent?:number
   bedrooms?:number
   area?:string
   bathrooms?:number
   isAvailable?:boolean
}
const udpatePropertyIntoDb=async(payload:Iupdate,id:string)=>{
 const isPropertyExist = await prisma.properties.findUnique({
    where: { id:id }
  });

  if (!isPropertyExist) {
    throw new Error("Property not found!");
  }
  const updatedProperty = await prisma.properties.update({
    where: { id: id },
    data: payload, 
  });

  return updatedProperty;
}
const getPropertiesIntoDb=async()=>{
    const properties=await prisma.properties.findMany()
    return properties
}
export const propertiService={
    createPropertyIntoDb,
    udpatePropertyIntoDb,
    getPropertiesIntoDb
}