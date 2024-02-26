import { z } from "zod"
import { PRIORITY, STATUS } from "./constant"

/* CUSTOM ERROR to Explicitly handle AxiosError */
export type CustomError = Error & {
  response?: {
    data?: { message?: string }
  }
}

// TODO: add more validation/transformation to schema
/* LOGIN SCHEMA */
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .email({ message: "Provide a valid email address." }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" })
})
export type LoginSchemaType = z.infer<typeof loginSchema>

/* REGISTER SCHEMA */
export const registerSchema = loginSchema
  .extend({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
      })
      .min(2, { message: "Must be 2 or more characters long" })
      .trim(),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>

/* USER SCHEMA */
export const userSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string"
    })
    .uuid({ message: "Invalid User Id" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .email({ message: "Provide a valid email address." }),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  role: z.enum(["USER", "ADMIN", "SUPPORT"])
})

export type UserSchemaType = z.infer<typeof userSchema>

/* PRODUCT SCHEMA */
const productSchema = z.object({
  id: z
    .string({
      required_error: "Product id is required",
      invalid_type_error: "Product id must be a string"
    })
    .uuid({ message: "Invalid Product Id" }),
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string"
  })
})
export const productsSchema = z.array(productSchema)
// export type ProductSchemaType = z.infer<typeof ProductSchema>
// export type ProductsSchemaType = z.infer<typeof productsSchema>

/* TICKET SCHEMA */
export const ticketSchema = z.object({
  id: z
    .string({
      required_error: "Ticket id is required",
      invalid_type_error: "Ticket id must be a string"
    })
    .uuid({ message: "Invalid Ticket Id" }),

  title: z.string({
    required_error: "Ticket title is required",
    invalid_type_error: "Ticket title must be a string"
  }),

  status: z.enum(STATUS, {
    required_error: "ticket status is required",
    invalid_type_error: `ticket status can only by ${STATUS.toString()}`
  }),

  priority: z
    .enum(PRIORITY, {
      required_error: "ticket priority is required",
      invalid_type_error: `ticket priority can only by ${PRIORITY.toString()}`
    })
    .optional(),

  product: productSchema,

  updatedAt: z
    .string({
      required_error: "Ticket last updated date that is required",
      invalid_type_error: "Ticket last updated date should be a Date type"
    })
    .datetime(),

  ticketAuthor: userSchema,

  supportUser: userSchema.nullable()
})

export type TicketSchemaType = z.infer<typeof ticketSchema>
export const ticketsSchema = z.array(ticketSchema)

/* NEW TICKET SCHEMA */
export const newTicketSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string"
    })
    .min(5, { message: "Title must be 5 or more characters" })
    .max(50, { message: "Title must be max 50 characters" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .min(5, { message: "Description must be 100 or more characters" }),
  authorUserId: z.string({
    required_error: "authorUserId is required",
    invalid_type_error: "authorUserId must be a string"
  }),
  productId: z.string({
    required_error: "Must select the product",
    invalid_type_error: "productId must be a string"
  })
})
export type NewTicketSchemaType = z.infer<typeof newTicketSchema>
