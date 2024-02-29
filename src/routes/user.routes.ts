import { Router } from "express"
import { getAllUsers, getUserDetails } from "../controllers/user.controllers"
const router = Router()

router.get("/details", getUserDetails)
router.get("/", getAllUsers)

export default router
