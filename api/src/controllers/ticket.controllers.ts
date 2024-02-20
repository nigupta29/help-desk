import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import prisma from "../config/db"

// TODO: add more refined validation to NewTicketBody
const NewTicketBody = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(50),
  productId: z.string(),
})

export const createTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, productId } = NewTicketBody.parse(req.body)

    const ticket = await prisma.ticket.create({
      data: { title, description, productId, authorUserId: req.userId },
    })

    res.status(201).json({
      message: "success",
      data: {
        ticket,
      },
    })
  }
)
