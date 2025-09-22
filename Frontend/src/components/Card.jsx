export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-md border border-[#01497C]/40 bg-[#013A63] hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
