import todolistController from "../../../controller/todolist.controller";
import express from "express";
const Router = express.Router();
Router.post("", todolistController.create)
Router.get("", todolistController.getAlltodolist)
Router.get("/:id", todolistController.gettodolistById)
Router.patch("/:id", todolistController.updatetodolistById)
Router.delete("/:id", todolistController.deletetodolistById)
export default Router