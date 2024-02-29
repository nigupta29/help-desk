import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import path from "path"
import { errorHandler, notFound } from "./middlewares/error-middlewares"
import indexRoutes from "./routes/index.routes"
import { getEnvValue } from "./utils/helper-functions"
// Configuration
config()
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
if (getEnvValue("NODE_ENV") === "development") {
  app.use(morgan("dev"))
}

// Routes
app.use("/api/v1", indexRoutes)

if (process.env.NODE_ENV === "live") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, "client", "dist")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
}

// Global Error Handlers
app.use(notFound)
app.use(errorHandler)

// Server Start Point
const port = getEnvValue("PORT")
app.listen(port, () => console.log(`Server Started at port : ${port}`))
