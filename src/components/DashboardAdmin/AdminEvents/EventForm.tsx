// src/components/DashboardAdmin/AdminEvents/EventForm.tsx
import DashboardFormField from "../DashboardFormField";
import DateTime from "../../ui/DateTime";
import ModernTime from "../../ui/ModernTime";
import { uploadImage } from "../../../services/upload.service";
import { useAuth } from "../../../Hooks/useAuth";

type Props = {
  title: string;
  setTitle: (v: string) => void;

  date: string;
  setDate: (v: string) => void;

  startTime: string;
  setStartTime: (v: string) => void;

  endTime: string;
  setEndTime: (v: string) => void;

  location: string;
  setLocation: (v: string) => void;

  image: string;
  setImage: (v: string) => void;

  externalUrl: string;
  setExternalUrl: (v: string) => void;

  errors?: {
    title?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    image?: string;
    externalUrl?: string;
  };
};

export default function EventForm({
  title,
  setTitle,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  location,
  setLocation,
  image,
  setImage,
  externalUrl,
  setExternalUrl,
  errors,
}: Props) {
  const { token } = useAuth(); // IMPORTANT: adapte selon ton hook

  const handleUpload = async (file: File) => {
    if (!token) {
      console.error("No token available");
      return;
    }

    try {
      const url = await uploadImage(file, token);
      setImage(url);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
      {/* IMAGE */}
      <div>
        <label className="text-sm font-medium">Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            handleUpload(file);
          }}
        />

        {image && (
          <img
            src={image}
            className="mt-3 h-32 w-full rounded-xl object-cover border"
          />
        )}
      </div>

      {/* TITLE */}
      <DashboardFormField
        label="Nom"
        value={title}
        onChange={setTitle}
        error={errors?.title}
      />

      {/* DATE */}
      <DateTime date={date} setDate={setDate} />

      {/* TIME */}
      <div className="grid grid-cols-2 gap-3">
        <ModernTime label="Début" value={startTime} onChange={setStartTime} />

        <ModernTime label="Fin" value={endTime} onChange={setEndTime} />
      </div>

      {/* LOCATION */}
      <DashboardFormField
        label="Lieu"
        value={location}
        onChange={setLocation}
      />

      {/* URL */}
      <DashboardFormField
        label="Lien externe"
        value={externalUrl}
        onChange={setExternalUrl}
        placeholder="https://..."
      />
    </div>
  );
}
