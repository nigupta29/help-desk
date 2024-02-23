import { Router } from "express"
import {
  createTicket,
  getTicketById,
  getTickets,
} from "../controllers/ticket.controllers"
const router = Router()

router.route("/").get(getTickets).post(createTicket)
router.route("/:ticketId").get(getTicketById)

export default router
