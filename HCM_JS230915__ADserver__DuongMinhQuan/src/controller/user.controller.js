import userModel from "../models/user.model";
import axios from 'axios';
export default {
    create: async function (req, res) {
        try {
            const { username, password } = req.body
            let { status, message, data } = await userModel.create(username, password)
            console.log(status);
            if (status) {

                return res.status(200).json({
                    data,
                    message
                });
            }
            else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log(err);
        }


    },
    getAllUser: async function (req, res) {
        try {
            let { status, message, data } = await userModel.getAllUser();
            if (status) {
                return res.status(200).json(data);
            }
            else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log('Error fetching todolists:', err);
        }

    },
    getUserById: async function (req, res) {
        try {
            let { status, message, data } = await userModel.getUserById(parseInt(req.params.id));
            if (status) {
                return res.status(200).json(data);
            } else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log(err);
        }
    },

    deleteUserById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            let { status, message, data } = await userModel.deleteUserById(id)
            if (status) {
                return res.status(200).json(message);
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err)
        }

    },
    updateUserById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            const { username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({ Error: "missing fields" })
            } else {
                let { result, message, data } = await userModel.updateUserById(id, username, password)
                if (result) {
                    return res.status(200).json({
                        data
                    });
                } else {
                    return res.status(500).json(message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    login: async function (req, res) {
        let user = await userModel.findUser(req.body.username);
        if (!user) {
            return res.status(500).json({
                message: "người dùng không tồn tại"
            })
        } else {
            return res.status(200).json({
                message: "Đăng nhập thành công!",
                data: user
            })
        }
    }


}
