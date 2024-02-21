import { z } from "zod"

// TODO: add more validation/transformation to schema
/* LOGIN SCHEMA */
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

/* REGISTER SCHEMA */
export const RegisterSchema = LoginSchema.extend({
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
}).refine((data) => data.confirmPassword === data.password, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

/* USER SCHEMA */
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

/* Product Schema */
const ProductSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string"
  }),
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string"
  }),
})
// export type ProductSchemaType = z.infer<typeof ProductSchema>

export const ProductsSchema = z.array(ProductSchema)
export type ProductsSchemaType = z.infer<typeof ProductsSchema>



/* CUSTOM ERROR to Explicitly handle AxiosError */
export type CustomError = Error & {
  response?: {
    data?: { message?: string }
  }
}
