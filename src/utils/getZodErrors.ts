// src/utils/getZodErrors.ts
export const getZodErrors = (errors: Record<string, string[] | undefined>) => {
  return Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value?.[0] || ""]),
  );
};
