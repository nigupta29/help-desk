import { Router } from "express"
import {
  checkUserSession,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers"
import { protectRoute } from "../middlewares/auth-middlewares"
const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/check", protectRoute, checkUserSession)
router.post("/logout", protectRoute, logoutUser)

export default router
