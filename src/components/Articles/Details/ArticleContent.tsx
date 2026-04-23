
interface Props {
  title: string;
  content?: string;
}

export default function ArticleContent({ title, content }: Props) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-black text-slate-100 leading-tight mb-6">
        {title}
      </h1>
      <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line space-y-4">
        {content}
      </div>
    </>
  );
}