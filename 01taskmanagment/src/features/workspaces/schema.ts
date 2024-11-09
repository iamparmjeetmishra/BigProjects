import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required")
})

export type CreateWorkspaceFormInferSchema = z.infer<typeof createWorkspaceSchema>;