import { prisma } from "../../lib/prisma"

const getAllUserIntoDb=async()=>{
    const users=prisma.users.findMany()
    return users
}

export const adminService={
    getAllUserIntoDb
}