export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 ${className}`}
      {...props}
    />
  );
}
