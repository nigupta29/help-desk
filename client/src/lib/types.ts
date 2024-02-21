import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string"
    })
    .email({ message: "Provide a valid email address." }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" })
})

export type TLogin = z.infer<typeof LoginSchema>
