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
  const whereClause = user.role === "USER" ? { authorUserId: user.id } : {}

  const tickets = await prisma.ticket.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      priority: !(user.role === "USER"),
      status: true,
      product: true,
      updatedAt: true,
      ticketAuthor: { select: userSelector },
      supportUser: { select: userSelector },
    },
  })

  res.status(200).json({
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

    const whereClause =
      user.role === "USER"
        ? { id: ticketId, authorUserId: user.id }
        : { id: ticketId }

    const ticket = await prisma.ticket.findUniqueOrThrow({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        priority: !(user.role === "USER"),
        status: true,
        product: true,
        createdAt: true,
        updatedAt: true,
        supportUser: {
          select: userSelector,
        },
        ticketAuthor: {
          select: userSelector,
        },
        messages: {
          select: {
            id: true,
            title: true,
            user: { select: userSelector },
          },
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
