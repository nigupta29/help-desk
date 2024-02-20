import { Router } from "express"
import { protectRoute } from "../middlewares/auth-middlewares"

import authRoutes from "./auth.routes"
import productRoutes from "./product.routes"
import ticketRoutes from "./ticket.routes"
import userRoutes from "./user.routes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/products", productRoutes)

router.use("/user", protectRoute, userRoutes)
router.use("/tickets", protectRoute, ticketRoutes)

export default router
