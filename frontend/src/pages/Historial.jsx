import { useEffect, useState } from 'react'
 
const API_URL = 'http://localhost:4000/api'
 
function Historial() {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await fetch(`${API_URL}/historial`, { credentials: 'include' })
        if (!res.ok) throw new Error('Error al obtener el historial')
        const data = await res.json()
        setHistorial(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHistorial()
  }, [])
 
  const getStatusStyle = (status) => {
    const map = {
      Completado: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
      Pendiente: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' },
      Cancelado: { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' },
    }
    return map[status] || { background: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' }
  }
 
  if (loading) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', color: '#666' }}>
        <div className="spinner" style={spinnerStyle}></div>
        <p style={{ marginTop: '15px', fontSize: '16px' }}>Cargando tu historial de compras...</p>
      </div>
    )
  }
 
  if (error) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', color: '#dc3545' }}>
        <p style={{ fontSize: '18px', fontWeight: '600' }}>¡Ups! Algo salió mal</p>
        <p style={{ fontSize: '14px', color: '#666' }}>{error}</p>
      </div>
    )
  }
 
  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '35px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '10px', color: '#1a3a5c', fontSize: '28px', fontWeight: '700' }}>Historial de Compras</h1>
        <p style={{ color: '#666', fontSize: '15px' }}>Aquí puedes ver el estado y detalle de tus pedidos anteriores.</p>
      </div>
 
      {historial.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: '#f8f9fa', borderRadius: '12px', border: '1px dashed #ccc' }}>
          <p style={{ color: '#888', fontSize: '16px', margin: '0' }}>No tienes registros de compras en tu cuenta todavía.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#1a3a5c', color: 'white' }}>
                  <th style={thStyle}>N° Pedido</th>
                  <th style={thStyle}>ID de Venta</th>
                  <th style={thStyle}>Fecha de Compra</th>
                  <th style={thStyle}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((item, index) => {
                  // Soporte híbrido para campos viejos y nuevos
                  const venta = item.id_venta || item.ventaId;
                  const ventaIdStr = typeof venta === 'object' ? venta?._id : venta;
 
                  return (
                    <tr key={item._id} style={{ backgroundColor: index % 2 === 0 ? '#fcfdfe' : 'white', transition: 'background 0.2s' }}>
                      <td style={{ ...tdStyle, fontWeight: 'bold', color: '#1a3a5c' }}>
                        #{historial.length - index}
                      </td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '13px', color: '#555' }}>
                        {ventaIdStr ? `${String(ventaIdStr).slice(-8).toUpperCase()}` : '—'} 
                        <span style={{ fontSize: '11px', color: '#aaa', marginLeft: '5px' }}>
                          ({ventaIdStr || 'Sin ID'})
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {item.date ? new Date(item.date).toLocaleDateString('es-SV', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        }) : '—'}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '50px',
                          fontWeight: '600',
                          fontSize: '12px',
                          display: 'inline-block',
                          textAlign: 'center',
                          ...getStatusStyle(item.status)
                        }}>
                          {item.status || 'Completado'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
 
const thStyle = {
  padding: '16px 20px',
  fontWeight: '600',
  borderBottom: '2px solid #132b44',
  textTransform: 'uppercase',
  fontSize: '12px',
  letterSpacing: '0.5px'
}
 
const tdStyle = {
  padding: '16px 20px',
  borderBottom: '1px solid #eff2f5',
  verticalAlign: 'middle',
  color: '#333'
}
 
const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #1a3a5c',
  borderRadius: '50%',
  margin: '0 auto',
  animation: 'spin 1s linear infinite'
}
 
export default Historial
 