import { ZodSchema } from "zod";

export function validateZod<T>(
  schema: ZodSchema<T>,
  data: unknown,
  setErrors: (errors: Record<string, string>) => void,
): boolean {
  const result = schema.safeParse(data);

  if (!result.success) {
    const flat = result.error.flatten();

    const errors: Record<string, string> = {};

    for (const key in flat.fieldErrors) {
      errors[key] = flat.fieldErrors[key]?.[0] ?? "";
    }

    setErrors(errors);
    return false;
  }

  setErrors({});
  return true;
}
