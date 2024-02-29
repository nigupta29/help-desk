import { NextFunction, Request, Response } from "express"

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// TODO: better error handling with related error status code
// 1. handling ZodError
// 1. handling PrismaError
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode
  let message: string = err.message

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "live" ? null : err.stack,
  })
}
