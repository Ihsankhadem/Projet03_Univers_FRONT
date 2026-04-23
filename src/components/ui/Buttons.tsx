import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "auth";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  to, href, onClick,
  variant = "primary",
  children, className = "",
  disabled, isLoading, loadingText,
}: Props) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all text-sm";

  const styles = {
    primary: "px-8 py-3 rounded-full border border-violet-300 text-violet-200 hover:bg-violet-700 hover:text-white hover:border-violet-700",
    outline: "px-8 py-3 rounded-full border border-slate-700 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800",
    auth:    "w-full py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] hover:-translate-y-px text-white shadow-[0_4px_20px_rgba(109,40,217,0.35)] disabled:opacity-70 disabled:cursor-not-allowed",
  };

  const cls = `${base} ${styles[variant]} ${className}`;
  const content = isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />{loadingText ?? "Chargement…"}</> : children;

  if (to)   return <Link to={to} className={cls}>{content}</Link>;
  if (href) return <a href={href} className={cls}>{content}</a>;
  return <button onClick={onClick} disabled={disabled || isLoading} className={cls}>{content}</button>;
}