import userController from "../../../controller/user.controller";
import express from "express";
const Router = express.Router();
Router.post("/", userController.create)
Router.get("", userController.getAllUser)
Router.get("/:id", userController.getUserById)
Router.patch("/:id", userController.updateUserById)
Router.delete("/:id", userController.deleteUserById)
Router.post("/login", userController.login)
export default Router