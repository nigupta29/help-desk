import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { getEnvValue } from "../utils/helper-functions"

type TDecodedObject = jwt.JwtPayload & {
  userId: string
}

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.jwt

    if (token) {
      try {
        const { userId } = jwt.verify(
          token,
          getEnvValue("JWT_SECRET_KEY")
        ) as TDecodedObject
        // TODO: userID validation from the db in the optimized way
        req.userId = userId
        next()
      } catch (error) {
        res.status(401)
        throw new Error("Not authorized, invalid token")
      }
    } else {
      res.status(401)
      throw new Error("Not authorized, no token")
    }
  }
)
