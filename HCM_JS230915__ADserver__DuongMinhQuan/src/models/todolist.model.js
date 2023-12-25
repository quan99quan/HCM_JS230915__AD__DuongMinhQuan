import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default {
    create: async function (name) {
        try {
            const task = await prisma.task.create({
                data: {
                    name: name,
                },
            });
            return {
                status: true,
                message: "Thành công",
                data: task
            }
        } catch (err) {
            console.log('err', err)
            let message = err.message || "Model Error";
            return {
                status: false,
                message: message,
                data: null
            }
        }
    },
    getAlltodolist: async function () {
        try {
            let task = await prisma.task.findMany();
            return {
                status: true,
                data: task
            }

        } catch (err) {
            console.log('Error:', err);
            let message = null;
            return {
                status: false,
                message: message ? message : "modelError",
                data: null
            }
        }
    },
    gettodolistById: async function (id) {
        try {
            let task = await prisma.task.findUnique({
                where: {
                    id: Number(id),
                }

            });
            return {
                status: true,
                message: "ok",
                data: task
            };
        } catch (err) {
            console.log('Error model:', err);
            return {
                status: false,
                message: "modelError",
                data: null,
            };
        }
    },

    deletetodolistById: async function (id) {
        try {
            let task = await prisma.task.delete({
                where: {
                    id: id
                }

            });
            return {
                status: true,
                message: "ok",
                data: task
            };


        } catch (err) {
            console.log(err);
        }

    },
    updatetodolistById: async function (id, name) {
        try {
            let task = await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name,


                },
            })
            return {
                status: true,
                message: "ok",
                data: task
            }

        } catch (err) {
            console.log(err);
        }

    },
}



