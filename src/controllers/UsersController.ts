import { Request, Response } from "express"

import { CONFIG } from "../config"

import { ExceptionsHandler } from "../middlewares/execeptionsHandler"
import { VerifyAuth } from "../middlewares/verifyAuth"

import { CreateUser, createUserParams } from "../services/cognito/createUser"
import { GetManyByGroup } from "../services/cognito/getManyByGroup"
import { SignInUser, signInUserParams } from "../services/cognito/signInUser"
import { ChangePassword, changePasswordParams } from "../services/cognito/changePassword"
import { RespondAuthChallenge, respondToAuthChallengeParams } from "../services/cognito/respondToNewPasswordRequiredChalenge"

export class UsersController {
  @ExceptionsHandler()
  @VerifyAuth(CONFIG.aws.cognito.groups.admin)
  async createUser(req: Request, res: Response) {
    const { email, groups }: createUserParams = req.body

    if (!email) return res.status(400).json({ message: "Email is missing" })
    if (!groups || groups?.length < 1) return res.status(400).json({ message: "Groups are missing" })

    const user = await new CreateUser().execute({ email, groups })

    res.json(user)
  }

  @ExceptionsHandler()
  @VerifyAuth(CONFIG.aws.cognito.groups.admin)
  async getManyByGroup(req: Request, res: Response) {
    const group = req.params.group

    const users = await new GetManyByGroup().execute(group)

    res.json(users)
  }

  @ExceptionsHandler()
  async signInUser(req: Request, res: Response) {
    const { email, password }: signInUserParams = req.body

    const result = await new SignInUser().execute({ email, password })

    res.json(result)
  }

  @ExceptionsHandler()
  @VerifyAuth()
  async changePassword(req: Request, res: Response) {
    const {
      accessToken,
      previousPassword,
      proposedPassword
    }: changePasswordParams = req.body

    const result = await new ChangePassword().execute({
      accessToken,
      previousPassword,
      proposedPassword
    })

    res.json(result)
  }

  @ExceptionsHandler()
  async respondToNewPasswordRequiredChalenge(req: Request, res: Response) {
    const {
      challengeName,
      challengeResponses,
      session
    }: respondToAuthChallengeParams = req.body

    const result = await new RespondAuthChallenge().execute({
      challengeName,
      challengeResponses,
      session
    })

    res.json(result)
  }
}