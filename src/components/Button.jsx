export default function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    solid: "bg-white text-zinc-950 hover:opacity-90",
    ghost: "bg-white/10 border border-white/10 hover:bg-white/15 text-white",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
