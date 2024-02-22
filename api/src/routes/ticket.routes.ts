import { Router } from "express"
import { createTicket, getTickets } from "../controllers/ticket.controllers"
const router = Router()

router.route("/").get(getTickets).post(createTicket)

export default router
