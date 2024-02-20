import { Router } from "express"
import { createTicket } from "../controllers/ticket.controllers"
const router = Router()

router.route("/").post(createTicket)

export default router
