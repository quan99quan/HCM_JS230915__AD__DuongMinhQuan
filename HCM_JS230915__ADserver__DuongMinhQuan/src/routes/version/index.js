import express from "express";
const Router = express.Router();
import userApi from './apis/user.api'
import todoApi from './apis/todo.api'
Router.use("/todo", todoApi)
Router.use("/user", userApi)
export default Router;