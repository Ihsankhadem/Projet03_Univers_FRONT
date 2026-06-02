// src/schemas/user.schema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  role: z.enum(["rédacteur", "administrateur"]),
});
