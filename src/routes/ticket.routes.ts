import { Router } from "express"
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controllers"
const router = Router()

router.route("/").get(getTickets).post(createTicket)
router.route("/:ticketId").get(getTicketById).patch(updateTicket)

export default router
