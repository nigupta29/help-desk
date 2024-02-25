import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import prisma from "../config/db"

export const addMessageToTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { ticketId } = req.params

    const ticket = await prisma.ticket.findUniqueOrThrow({
      where: { id: ticketId },
    })

    const { user } = req

    if (
      (user.role === "USER" && ticket.authorUserId === user.id) ||
      (user.role === "SUPPORT" && ticket.assignedUserId === user.id) ||
      user.role === "ADMIN"
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
