import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import prisma from "../config/db"
import generateToken from "../utils/generate-token"
import { hashPassword, matchPassword } from "../utils/helper-functions"

// TODO: add more refined validation to RegisterBody
const RegisterBody = z.object({
  email: z.string().email(),
  name: z.string().trim(),
  password: z.string().min(6),
})

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = RegisterBody.parse(req.body)

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      res.status(401)
      throw new Error("User already exists")
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    generateToken(res, user.id)

    res.status(201).json({
      message: "success",
      data: { user },
    })
  }
)

// TODO: add more refined validation to LoginBody
const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = LoginBody.parse(req.body)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user && (await matchPassword(password, user.password))) {
    generateToken(res, user.id)

    const responseUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    res.status(201).json({
      message: "success",
      data: { user: responseUser },
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
  res.status(200).json({ message: "success" })
})

export const checkUserSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      res.status(200)
      throw new Error("Invalid User Details")
    }

    generateToken(res, userId)
    res.status(200).json({ message: "verified", data: { user } })
  }
)
