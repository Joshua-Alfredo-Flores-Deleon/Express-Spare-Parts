import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/historial", label: "Historial" },
  { to: "/proveedores", label: "Proveedores" },
  { to: "/pedidos", label: "Pedidos" },
];

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="bg-black text-white text-xs text-center py-1">
        Desktop
      </div>
      <nav className="bg-[#0b1f4d] text-white flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Reemplaza src por el logo real del proyecto */}
          <img src="/logo.png" alt="Express Spare Parts" className="h-10 w-10 rounded-full bg-white p-1" />
          <span className="text-sm text-gray-200">
            La fuerza detrás de tu motor
          </span>
        </div>
        <ul className="flex gap-8 text-sm font-medium">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors ${
                    isActive
                      ? "border-white"
                      : "border-transparent hover:border-white/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
