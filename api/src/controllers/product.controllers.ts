import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import prisma from "../config/db"

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await prisma.product.findMany()

  res.status(200).json({
    message: "success",
    data: { total: products.length, products },
  })
})
