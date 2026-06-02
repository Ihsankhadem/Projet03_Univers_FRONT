// src/schemas/category.schema.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Nom trop court").max(80, "Nom trop long"),

  description: z.string().max(255, "Description trop longue").optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
