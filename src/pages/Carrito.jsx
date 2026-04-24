import { useState } from 'react'
import baleros from '../assets/baleros.png'
import motor from '../assets/Motor.png'
import sistemadefrenos from '../assets/sistema-de-frenos 8.png'

function Carrito() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Baleros de rueda de alto rendimiento', precio: 67, imagen: baleros },
    { id: 2, nombre: 'Motor de arranque remanufacturado', precio: 67, imagen: motor },
    { id: 3, nombre: 'Sistema de frenos de alto rendimiento con disco perforado y pinza deportiva.', precio: 67, imagen: sistemadefrenos },
  ])

  const [cantidades, setCantidades] = useState({ 1: 1, 2: 1, 3: 1 })

  const cambiarCantidad = (id, valor) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, prev[id] + valor)
    }))
  }

  const total = productos.reduce((acc, p) => acc + p.precio * cantidades[p.id], 0)
  const descuento = 0.04
  const subtotal = total - total * descuento

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Carrito</h1>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>

        <table style={{ flex: 1, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Producto</th>
              <th style={thStyle}>Cantidad</th>
              <th style={thStyle}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                  <span style={{ fontSize: '14px' }}>{p.nombre}</span>
                </td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={() => cambiarCantidad(p.id, -1)} style={btnStyle}>-</button>
                    <span>{cantidades[p.id]}</span>
                    <button onClick={() => cambiarCantidad(p.id, 1)} style={btnStyle}>+</button>
                  </div>
                </td>
                <td style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                  ${(p.precio * cantidades[p.id]).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{
          width: '250px', backgroundColor: '#1a3a5c', color: 'white',
          borderRadius: '8px', padding: '20px', textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', color: 'white' }}>Resumen</h2>
          <p style={{ marginBottom: '10px' }}>Total de Compra: ${total.toFixed(2)}</p>
          <p style={{ color: '#ff4444', marginBottom: '10px' }}>Descuento: %{(descuento * 100).toFixed(0)}.00</p>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Subtotal: ${subtotal.toFixed(2)}</p>
          <button style={{
            backgroundColor: '#4a90d9', color: 'white', border: 'none',
            padding: '12px 30px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', width: '100%'
          }}>
            Realizar Orden
          </button>
        </div>

      </div>
    </div>
  )
}

const thStyle = {
  padding: '15px',
  borderBottom: '2px solid #ddd',
  fontWeight: 'bold',
  fontSize: '16px'
}

const btnStyle = {
  width: '30px', height: '30px', border: '1px solid #ccc',
  backgroundColor: 'white', cursor: 'pointer', fontSize: '16px',
  borderRadius: '4px'
}

export default Carrito