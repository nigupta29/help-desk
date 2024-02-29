import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import prisma from "../config/db"
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

        const user = await prisma.user.findUnique({ where: { id: userId } })

        // TODO: Refactor this part and come with less expensive method
        if (!user) {
          res.status(401)
          throw new Error("Not authorized, invalid token")
        }

        req.user = { id: user.id, role: user.role }
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
