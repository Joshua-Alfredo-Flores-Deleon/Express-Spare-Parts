const VARIANTS = {
  primary: "bg-[#0b1f4d] text-white hover:bg-[#0f2a66] disabled:bg-[#8a93ad]",
  secondary: "bg-[#c9cddb] text-[#0b1f4d] hover:bg-[#b7bcd0] disabled:opacity-60",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60",
};

export default function Boton({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2 rounded-md text-sm font-semibold transition-colors
        ${fullWidth ? "w-full" : ""}
        ${VARIANTS[variant]}
      `}
    >
      {children}
    </button>
  );
}
