import axios from "axios"
export default {
    create: async (data) => {
        console.log(await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user`, data));
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user`, data)
    },
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/user`)
    },
    update: async (id, data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/user/${id}`, data)
    },
    delete: async (id) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/user/${id}`)
    },
    login: async function (newdata) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/user/login`, newdata);
    },
}