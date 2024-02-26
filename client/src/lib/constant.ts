import { z } from "zod"

export const ID = (label: string) =>
  z
    .string({
      required_error: `ID for ${label} is required`,
      invalid_type_error: `ID for ${label} must be a string`
    })
    .uuid({ message: `Invalid ${label} ID` })

export const NAME = (label: string) =>
  z
    .string({
      required_error: `${label} Name is required`,
      invalid_type_error: `${label} Name must be a string`
    })
    .min(2, { message: `Must be 2 or more characters long` })
    .trim()

export const EMAIL = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  })
  .email({ message: "Provide a valid email address." })

export const PASSWORD = z
  .string()
  .min(6, { message: "Must be 6 or more characters long" })

export const CONFIRM_PASSWORD = z
  .string()
  .min(6, { message: "Must be 6 or more characters long" })

const ROLE = ["USER", "SUPPORT", "ADMIN"] as const
export const USER_ROLE = z.enum(ROLE, {
  required_error: "User Role is required",
  invalid_type_error: `User Role can only be ${ROLE.toString()}`
})

export const TITLE = (label: string) =>
  z
    .string({
      required_error: `${label} Title is required`,
      invalid_type_error: `${label} Title must be a string`
    })
    .min(5, { message: `${label} Title must be 5 or more characters` })

export const DESCRIPTION = z
  .string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  })
  .min(5, { message: "Description must be 100 or more characters" })

const STATUS = ["OPEN", "REVIEW", "RESOLVED", "REJECTED"] as const
export const TICKET_STATUS = z.enum(STATUS, {
  required_error: "Ticket Status is required",
  invalid_type_error: `Ticket Status can only be ${STATUS.toString()}`
})

const PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const
export const TICKET_PRIORITY = z.enum(PRIORITY, {
  required_error: "Ticket Priority is required",
  invalid_type_error: `Ticket Priority can only be ${PRIORITY.toString()}`
})

export const DATE = (label: string) =>
  z
    .string({
      required_error: `${label} is required`,
      invalid_type_error: `${label} should be a Date type`
    })
    .datetime({ message: `${label} should be a DATE type` })
