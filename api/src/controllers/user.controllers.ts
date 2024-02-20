import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import prisma from "../config/db"

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.userId,
      },
    })

    const { password, ...responseUser } = user

    res.status(200).json({
      message: "success",
      data: { user: responseUser },
    })
  }
)
