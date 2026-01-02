export default function Badge({ children, tone = "neutral" }) {
  const base =
    "inline-flex items-center px-2.5 py-1 rounded-full text-xs border";
  const tones = {
    neutral: "bg-white/5 border-white/10 text-white/70",
    solid: "bg-white text-zinc-950 border-white",
    good: "bg-emerald-400/15 border-emerald-400/30 text-emerald-200",
    warn: "bg-amber-400/15 border-amber-400/30 text-amber-200",
  };

  return (
    <span className={`${base} ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}
