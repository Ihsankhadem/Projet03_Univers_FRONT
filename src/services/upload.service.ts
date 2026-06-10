export const uploadImage = async (file: File, token?: string | null) => {
  if (!token) throw new Error("Missing token");

  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  console.log(data);
  return data.url as string;
};
