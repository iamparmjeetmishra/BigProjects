import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().min(3, { message: "Email is incorrect" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// z infer schema

export type SignInInferSchema = z.infer<typeof SignInSchema>