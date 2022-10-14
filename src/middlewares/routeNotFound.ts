
import { Request, Response, NextFunction } from "express"

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  res.json({
    message: "Route not found",
    requestData: {
      body: req.body,
      headers: req.headers,
      query: req.query,
      path: req.url
    }
  })
}