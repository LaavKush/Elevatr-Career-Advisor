export function Button({ children, onClick, className = "", variant = "default" }) {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#61A5C2]/50";

  const variants = {
    default: "bg-[#01497C] hover:bg-[#014F86] text-white",
    active: "bg-[#61A5C2] text-black hover:bg-[#468FAF]",
    outline:
      "bg-transparent border border-[#61A5C2] text-[#61A5C2] hover:bg-[#61A5C2] hover:text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
