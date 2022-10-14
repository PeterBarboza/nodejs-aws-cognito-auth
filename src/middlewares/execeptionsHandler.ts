import { Request, Response, NextFunction } from "express"

type descriptorArgs = [
  req: Request,
  res: Response,
  next: NextFunction
]

export function ExceptionsHandler() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: Function = descriptor.value

    descriptor.value = async function (...[req, res, next]: descriptorArgs) {
      try {
        return await originalMethod.apply(this, [req, res, next])
      } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Error on execution" })
      }
    }

    return descriptor
  }
}