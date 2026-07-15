import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img 
          src="/logo.png" 
          alt="Express Spare Parts" 
          className="navbar-logo"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <span className="navbar-title">La fuerza detrás de tu motor</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Inicio
        </NavLink>
        <NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}>
          Productos
        </NavLink>
        <NavLink to="/historial" className={({ isActive }) => isActive ? 'active' : ''}>
          Historial
        </NavLink>
        <NavLink to="/proveedores" className={({ isActive }) => isActive ? 'active' : ''}>
          Proveedores
        </NavLink>
        <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>
          Pedidos
        </NavLink>
        <NavLink to="/promociones" className={({ isActive }) => isActive ? 'active' : ''}>
          Promociones
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
