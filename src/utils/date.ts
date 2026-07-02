// src/utils/date.ts

export const toDateInput = (value?: string | null) => {
  if (!value) return "";

  // CAS SQL classique : 2026-05-10
  if (value.includes("-") && value.length <= 10) {
    return value;
  }

  // CAS ISO : 2026-05-10T00:00:00.000Z
  return new Date(value).toISOString().split("T")[0];
};
