import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .email({ message: "Provide a valid email address." }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" })
})
export type LoginSchemaType = z.infer<typeof LoginSchema>

export const UserSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string"
  }),
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

export type UserSchemaType = z.infer<typeof UserSchema>

export type CustomError = Error & {
  response?: {
    data?: { message?: string }
  }
}