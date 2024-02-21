import { z } from "zod"

// TODO: add more validation

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

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
      })
      .min(2, { message: "Must be 2 or more characters long" })
      .trim(),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
      })
      .email({ message: "Provide a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

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