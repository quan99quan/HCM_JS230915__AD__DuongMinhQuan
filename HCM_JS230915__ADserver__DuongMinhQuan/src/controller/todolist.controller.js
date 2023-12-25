import taskModel from "../models/todolist.model";
import axios from 'axios';
export default {
    create: async function (req, res) {
        try {
            const { name } = req.body
            let { status, message, data } = await taskModel.create(name)
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
    getAlltodolist: async function (req, res) {
        try {
            let { status, message, data } = await taskModel.getAlltodolist();
            if (status) {
                return res.status(200).json(data);
            }
            else {
                return res.status(500).json({ message });
            }
        } catch (err) {
            console.log('Error fetching todolists:', err);
        }

    },
    gettodolistById: async function (req, res) {
        try {
            let { status, message, data } = await taskModel.gettodolistById(parseInt(req.params.id));
            if (status) {
                return res.status(200).json(data);
            } else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log("err", err);

        }
    },

    deletetodolistById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            let { status, message, data } = await taskModel.deletetodolistById(id)
            if (status) {
                return res.status(200).json(message);
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err);
        }

    },
    updatetodolistById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            const { name } = req.body
            let { status, message, data } = await taskModel.updatetodolistById(id, name)
            if (status) {
                return res.status(200).json({
                    data
                });
            } else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log(err);
        }


    },

}


