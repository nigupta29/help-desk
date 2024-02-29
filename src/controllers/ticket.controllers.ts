import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { ticketSelector, userSelector } from "../config/constants"
import prisma from "../config/db"
import { TICKET_PRIORITY, TICKET_STATUS, USER_ROLE } from "../config/enum"

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
      data: { title, description, productId, authorUserId: req.user.id },
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
  const whereClause =
    user.role === USER_ROLE.Values.USER ? { authorUserId: user.id } : {}

  const tickets = await prisma.ticket.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      priority: !(user.role === USER_ROLE.Values.USER),
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
      user.role === USER_ROLE.Values.USER
        ? { id: ticketId, authorUserId: user.id }
        : { id: ticketId }

    const ticket = await prisma.ticket.findUniqueOrThrow({
      where: whereClause,
      select: ticketSelector(user),
    })

    res.status(200).json({
      message: "success",
      data: {
        ticket,
      },
    })
  }
)

const userUpdateTicketSchema = z.object({
  title: z.string().min(2).max(50).optional(),
  description: z.string().min(50).optional(),
})

const supportUpdateTicketSchema = z.object({
  priority: TICKET_PRIORITY.optional(),
  status: TICKET_STATUS.optional(),
  assignedUserId: z.string().uuid().optional(),
})

const adminUpdateTicketSchema = userUpdateTicketSchema
  .merge(supportUpdateTicketSchema)
  .extend({
    productId: z.string().uuid().optional(),
  })

export const updateTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { ticketId } = req.params
    const { id: userId, role: userRole } = req.user

    let updateBodyData

    switch (userRole) {
      case USER_ROLE.Values.USER:
        updateBodyData = userUpdateTicketSchema.parse(req.body)
        break

      case USER_ROLE.Values.SUPPORT:
        updateBodyData = supportUpdateTicketSchema.parse(req.body)
        break

      case USER_ROLE.Values.ADMIN:
        updateBodyData = adminUpdateTicketSchema.parse(req.body)
        break

      default:
        throw new Error("Invalid user role")
    }

    const whereClause =
      userRole === USER_ROLE.Values.USER
        ? { id: ticketId, authorUserId: userId }
        : userRole === USER_ROLE.Values.SUPPORT
        ? {
            id: ticketId,
            OR: [{ assignedUserId: null }, { assignedUserId: userId }],
          }
        : { id: ticketId }

    const updatedTicket = await prisma.ticket.update({
      data: updateBodyData,
      where: whereClause,
    })

    res.status(201).json({
      message: "success",
      data: {
        ticket: updatedTicket,
      },
    })
  }
)
