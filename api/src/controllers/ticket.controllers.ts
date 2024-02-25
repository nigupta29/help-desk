import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { userSelector } from "../config/constants"
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

export const getTickets = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req
  const tickets = await prisma.ticket.findMany({
    where: user.role === "USER" ? { authorUserId: user.id } : {},
  })

  res.status(201).json({
    message: "success",
    data: {
      total: tickets.length,
      tickets,
    },
  })
})

export const getTicketById = asyncHandler(
  async (req: Request, res: Response) => {
    const { ticketId } = req.params
    const { user } = req

    let whereClause: { id: string; authorUserId?: string }

    if (user.role === "USER") {
      whereClause = { id: ticketId, authorUserId: user.id }
    } else {
      whereClause = { id: ticketId }
    }

    const ticket = await prisma.ticket.findUniqueOrThrow({
      where: whereClause,
      include: {
        product: true,
        supportUser: {
          select: userSelector,
        },
        ticketAuthor: {
          select: userSelector,
        },
      },
    })

    res.status(200).json({
      message: "success",
      data: {
        ticket,
      },
    })
  }
)
