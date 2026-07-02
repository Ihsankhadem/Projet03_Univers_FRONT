// schemas/article.schema.ts
import { z } from "zod";

export const articleSchema = z.object({
  title: z // z = l'instance de Zod utilisée pour définir les schémas de validation
    .string()
    .trim() // trim() = supprime les espaces au début et à la fin de la chaîne de caractères
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(120, "Le titre est trop long"),

  content: z
    .string()
    .trim()
    .min(20, "Le contenu est trop court")
    .max(5000, "Le contenu est trop long"),
});

export type ArticleInput = z.infer<typeof articleSchema>;
