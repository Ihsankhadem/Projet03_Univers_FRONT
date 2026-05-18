type Props = {
  image: string;
};

export default function UpdateArticleImage({ image }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Image actuelle</h3>

      <img
        src={`/uploads/${image}`}
        className="w-full rounded-2xl object-cover"
      />
    </div>
  );
}
