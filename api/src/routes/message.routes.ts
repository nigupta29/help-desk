import { Router } from "express"
import { addMessageToTicket } from "../controllers/message.controllers"
const router = Router()

router.post("/:ticketId", addMessageToTicket)

export default router
