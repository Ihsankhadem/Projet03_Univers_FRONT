// src/schemas/event.schema.ts
import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const EventSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  location: z.string().min(1, "Le lieu est requis"),
  image: z.string().min(1, "Image requise").url("URL invalide"),
  externalUrl: z.string().url("URL invalide").optional().or(z.literal("")),
});
