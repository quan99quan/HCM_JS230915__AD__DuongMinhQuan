import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function (username, password) {
        try {
            let user = await prisma.user.create({
                data: {
                    username: username,
                    password: password

                },
            });
            return {
                status: true,
                message: "Thành công",
                data: user
            }
        } catch (err) {
            console.log('err', err)
            return {
                status: false,
                message: "lay that bai",
                data: null
            }
        }
    },
    getAllUser: async function () {
        try {
            let user = await prisma.user.findMany();
            return {
                status: true,
                data: user
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
    getUserById: async function (id) {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                }

            });
            return {
                status: true,
                message: "ok",
                data: user
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

    deleteUserById: async function (id) {
        try {
            let user = await prisma.user.delete({
                where: {
                    id: id
                }

            });
            return {
                status: true,
                message: "ok",
                data: user
            };


        } catch (err) {
            console.log(err);
        }

    },
    updateUserById: async function (id, username, password) {
        try {
            let user = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    username: username,
                    password: password


                },
            })
            return {
                result: true,
                message: "ok",
                data: user
            }

        } catch (err) {
            console.log(err);
        }

    },
    findUser: async function (username) {
        try {
            let user = await prisma.user.findFirst({
                where: {
                    username: username
                },

            })
            return {
                status: true,
                data: user
            }
        } catch (err) {
            console.log(err);
            return {

                status: false,
                message: "loi server",
                data: null
            }


        }

    }
}



