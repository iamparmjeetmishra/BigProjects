import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email().min(3, { message: "Email is incorrect" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})


export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be atleast 2 characters" }),
  email: z.string().min(3, { message: "Email is incorrect" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})


export type SignInInferSchema = z.infer<typeof SignInSchema>
export type SignUpInferSchema = z.infer<typeof SignUpSchema>