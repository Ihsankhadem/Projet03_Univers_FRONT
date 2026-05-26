import DashboardFormField from "../DashboardFormField";

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
}: Props) {
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    // ton upload preset cloudinary
    formData.append("upload_preset", "univers");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqm1kobls/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      console.log(data);
      setImage(data.secure_url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {/* IMAGE */}
      <div>
        <label className="text-sm font-medium">Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            uploadImage(file);
          }}
        />

        {image && (
          <img
            src={image}
            className="mt-2 h-32 w-full object-cover rounded-lg"
          />
        )}
      </div>

      <DashboardFormField label="Nom" value={title} onChange={setTitle} />

      <DashboardFormField
        label="Date"
        type="date"
        value={date}
        onChange={setDate}
      />

      <div className="grid grid-cols-2 gap-3">
        <DashboardFormField
          label="Début"
          type="time"
          value={startTime}
          onChange={setStartTime}
        />

        <DashboardFormField
          label="Fin"
          type="time"
          value={endTime}
          onChange={setEndTime}
        />
      </div>

      <DashboardFormField
        label="Lieu"
        value={location}
        onChange={setLocation}
      />

      <DashboardFormField
        label="Lien externe"
        value={externalUrl}
        onChange={setExternalUrl}
        placeholder="https://..."
      />
    </div>
  );
}
