import { Router } from "express"

import { UsersController } from "../controllers/UsersController"

export const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post("/", usersController.createUser)
usersRouter.post("/get-by-group/:group", usersController.getManyByGroup)
usersRouter.post("/sign-in", usersController.signInUser)
usersRouter.patch("/change-password", usersController.changePassword)
usersRouter.post("/auth-challenge/new-password", usersController.respondToNewPasswordRequiredChalenge)