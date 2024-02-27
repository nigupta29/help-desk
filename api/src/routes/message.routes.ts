import { Router } from "express"
import {
  addMessageToTicket,
  getMessages,
} from "../controllers/message.controllers"
const router = Router()

router.route("/:ticketId").get(getMessages).post(addMessageToTicket)

export default router
