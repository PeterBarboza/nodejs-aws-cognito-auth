import { Request, Response, NextFunction } from "express"

import { CognitoJwtVerifier } from "aws-jwt-verify"
import { CONFIG } from "../config"

type descriptorArgs = [
  req: Request,
  res: Response,
  next: NextFunction
]

export function VerifyAuth(groupAccessLevelRequired?: string | string[]) {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: CONFIG.aws.cognito.userPoolId,
    clientId: CONFIG.aws.cognito.clientId,
    groups: groupAccessLevelRequired,
  })

  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: Function = descriptor.value

    descriptor.value = async function (...[req, res, next]: descriptorArgs) {
      const authHeader = req.headers.authorization

      if (!authHeader) return res.status(401).json({ message: "No token provided" })

      const parts = authHeader.split(" ")

      if (parts.length !== 2) {
        return res.status(401).json({ data: { message: "Token malformatted" } })
      }

      const [scheme, token] = parts

      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ data: { message: "Token malformatted" } })
      }

      try {
        await verifier.verify(token, { tokenUse: "access", })

        return await originalMethod.apply(this, [req, res, next])
      } catch (error) {
        console.error(error)
        return res.status(401).json({ message: "Authentication failed" })
      }
    }

    return descriptor
  }
}