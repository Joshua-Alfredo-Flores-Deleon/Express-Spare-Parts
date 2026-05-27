import { Link } from 'react-router-dom'
import logo from '../assets/golo-removebg-preview 5.png' // ← pon tu logo aquí

function Navbar() {
  return (
    <>
      {/* Barra superior azul */}
      <div style={{
        backgroundColor: '#0d2340',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo y slogan */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={logo} alt="Logo" style={{ width: '120px' }} />
          <span style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}>
            La fuerza detrás de tu <br></br>
            motor
          </span>
        </div>

        <input
          type="text"
          placeholder="Buscar tu producto por nombre"
          style={{
            width: '400px',
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '14px'
          }}
        />

        <Link to="/carrito" style={{ color: 'white', fontSize: '28px', textDecoration: 'none' }}>
          🛒
        </Link>
      </div>

      {/* Menú de navegación */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        borderBottom: '1px solid #ddd'
      }}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/productos" style={linkStyle}>Productos</Link>
        <Link to="/sobre-nosotros" style={linkStyle}>Sobre Nosotros</Link>
        <Link to="/contactos" style={linkStyle}>Contactos</Link>
        <Link to="/resenas" style={linkStyle}>Reseñas</Link>
        <Link to="/novedades" style={linkStyle}>Novedades</Link>
        <Link to="/registrarse" style={linkStyle}>Registrarse</Link>
      </div>
    </>
  )
}

const linkStyle = {
  textDecoration: 'none',
  color: '#000',
  fontWeight: '500',
  fontSize: '15px'
}

export default Navbar