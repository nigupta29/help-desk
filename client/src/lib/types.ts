import { z } from "zod"
import {
  CONFIRM_PASSWORD,
  DATE,
  DESCRIPTION,
  EMAIL,
  ID,
  NAME,
  PASSWORD,
  TICKET_PRIORITY,
  TICKET_STATUS,
  TITLE,
  USER_ROLE
} from "./constant"

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
export const usersSchema = z.array(userSchema)

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
  priority: TICKET_PRIORITY.optional(),
  description: DESCRIPTION.optional(),
  product: productSchema,
  createdAt: DATE("Ticket Created At").optional(),
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

/* UPDATE SCHEMA */
export const updateTicketSchema = z.object({
  title: TITLE("Ticket").optional(),
  description: DESCRIPTION.optional(),
  productId: ID("Product").optional(),
  status: TICKET_STATUS.optional(),
  priority: TICKET_PRIORITY.optional(),
  assignedUserId: ID("Support ID").optional()
})
export type UpdateTicketSchemaType = z.infer<typeof updateTicketSchema>

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
