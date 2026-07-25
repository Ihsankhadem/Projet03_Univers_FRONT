// src/utils/date.ts

export const toDateInput = (value?: string | null) => {
  if (!value) return "";

  // Déjà au bon format SQL : 2026-05-18
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // Format Date JS incomplet : "Fri May 18"
  const match = value.match(/^[A-Za-z]{3} [A-Za-z]{3} (\d{1,2})$/);

  if (match) {
    const day = match[1];

    // on garde l'année actuelle
    const year = new Date().getFullYear();

    const monthNames: Record<string, string> = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const month = monthNames[value.split(" ")[1]];

    return `${year}-${month}-${day.padStart(2, "0")}`;
  }

  return new Date(value).toLocaleDateString("sv-SE");
};
