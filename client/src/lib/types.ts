import { z } from "zod"
import {
  CONFIRM_PASSWORD,
  DATE,
  DESCRIPTION,
  EMAIL,
  ID,
  NAME,
  PASSWORD,
  TICKET_STATUS,
  TITLE,
  USER_ROLE
} from "./constant"

export const STATUS = ["OPEN", "REVIEW", "RESOLVED", "REJECTED"] as const
export const PRIORITY = ["LOW", "MEDIUM", "HIGH"] as const

/* CUSTOM ERROR to Explicitly handle AxiosError */
export type CustomError = Error & {
  response?: {
    data?: { message?: string }
  }
}

/* LOGIN SCHEMA */
export const loginSchema = z.object({
  email: EMAIL,
  password: PASSWORD
})
export type LoginSchemaType = z.infer<typeof loginSchema>

/* REGISTER SCHEMA */
export const registerSchema = loginSchema
  .extend({
    name: NAME("User"),
    confirmPassword: CONFIRM_PASSWORD
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

/* USER SCHEMA */
export const userSchema = z.object({
  id: ID("User"),
  email: EMAIL,
  name: NAME("User"),
  role: USER_ROLE
})
export type UserSchemaType = z.infer<typeof userSchema>

/* PRODUCT SCHEMA */
const productSchema = z.object({
  id: ID("Product"),
  name: NAME("Prodcut")
})
export const productsSchema = z.array(productSchema)

/* TICKET SCHEMA */
export const ticketSchema = z.object({
  id: ID("Ticket"),
  title: TITLE("Ticket"),
  status: TICKET_STATUS,
  product: productSchema,
  updatedAt: DATE("Ticket Updated At"),
  ticketAuthor: userSchema,
  supportUser: userSchema.nullable()
})

export type TicketSchemaType = z.infer<typeof ticketSchema>
export const ticketsSchema = z.array(ticketSchema)

/* NEW TICKET SCHEMA */
export const newTicketSchema = z.object({
  title: TITLE("Ticket"),
  description: DESCRIPTION,
  authorUserId: ID("Author User"),
  productId: ID("Product")
})
export type NewTicketSchemaType = z.infer<typeof newTicketSchema>


/* MESSAGE SCHEMA */
export const messageSchema = z.object({
  id: ID("Ticket message"),
  title: TITLE("Ticket message"),
  createdAt: DATE("Message Created at"),
  user: userSchema
})

export const messagesSchema = z.array(messageSchema)
export type MessageSchemaType = z.infer<typeof messageSchema>

/* NEW MESSAGE SCHEMA */
export const newMessageSchema = z.object({
  title: TITLE("Ticket message")
})
export type NewMessageSchemaType = z.infer<typeof newMessageSchema>
