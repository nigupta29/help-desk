import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { userSelector } from "../config/constants"
import prisma from "../config/db"
import { USER_ROLE } from "../config/enum"

const MESSAGE_SELECT = {
  id: true,
  title: true,
  createdAt: true,
  user: { select: userSelector },
}

export const addMessageToTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { ticketId } = req.params

    const ticket = await prisma.ticket.findUniqueOrThrow({
      where: { id: ticketId },
    })

    const { user } = req

    if (
      (user.role === USER_ROLE.Values.USER &&
        ticket.authorUserId === user.id) ||
      (user.role === USER_ROLE.Values.SUPPORT &&
        ticket.assignedUserId === user.id) ||
      user.role === USER_ROLE.Values.ADMIN
    ) {
      const title = z
        .string()
        .min(10, { message: "Message should be of min. 10 characters long." })
        .parse(req.body.title)

      const message = await prisma.message.create({
        data: {
          title,
          ticketId: ticket.id,
          userId: user.id,
        },
        select: MESSAGE_SELECT,
      })

      res.status(201).json({
        message: "success",
        data: {
          message,
        },
      })
    } else {
      res.status(403)
      throw new Error("Invalid request to add message")
    }
  }
)

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { ticketId } = req.params
  const { user } = req

  const whereClause =
    user.role === USER_ROLE.Values.USER
      ? { ticketId, userId: user.id }
      : { ticketId }

  const messages = await prisma.message.findMany({
    where: whereClause,
    select: MESSAGE_SELECT,
  })

  res.status(200).json({
    message: "success",
    data: {
      messages,
    },
  })
})
