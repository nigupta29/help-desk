import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { userSelector } from "../config/constants"
import prisma from "../config/db"
import { USER_ROLE } from "../config/enum"

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    const { password, ...responseUser } = user

    res.status(200).json({
      message: "success",
      data: { user: responseUser },
    })
  }
)

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.user

  if (role !== USER_ROLE.Values.ADMIN) {
    res.status(403)
    throw new Error("Invalid Request")
  }

  const users = await prisma.user.findMany({
    where: {
      role: { not: "ADMIN" },
    },
    select: userSelector,
    orderBy: { name: "asc" },
  })

  res.status(200).json({
    message: "success",
    data: { users },
  })
})
