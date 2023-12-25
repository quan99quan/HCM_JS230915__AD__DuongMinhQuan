import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import userList from './user'
(async () => {
    try {
        await prisma.user.createMany({
            data: [
                ...userList
            ]
        })
    } catch (err) {
        console.log("da vao err", err)
    }
})()

