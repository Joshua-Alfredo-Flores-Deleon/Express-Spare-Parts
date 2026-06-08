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
      Completado: { background: '#d4edda', color: '#155724' },
      Pendiente: { background: '#fff3cd', color: '#856404' },
      Cancelado: { background: '#f8d7da', color: '#721c24' },
    }
    return map[status] || { background: '#e2e3e5', color: '#383d41' }
  }

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', color: '#555' }}>
        Cargando historial...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', color: 'red' }}>
        {error}
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#1a3a5c' }}>Historial de Compras</h1>

      {historial.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No hay registros en el historial.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a3a5c', color: 'white' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Teléfono</th>
                <th style={thStyle}>ID Venta</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={item._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{item.id_cliente?.full_name || '—'}</td>
                  <td style={tdStyle}>{item.id_cliente?.email || '—'}</td>
                  <td style={tdStyle}>{item.id_cliente?.phone_number || '—'}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>
                    {item.id_venta?._id || item.id_venta || '—'}
                  </td>
                  <td style={tdStyle}>
                    {item.date ? new Date(item.date).toLocaleDateString('es-SV', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : '—'}
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontWeight: '500',
                      fontSize: '12px',
                      ...getStatusStyle(item.status)
                    }}>
                      {item.status || 'Desconocido'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '600',
  borderBottom: '2px solid #0f2540',
}

const tdStyle = {
  padding: '10px 16px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'middle',
}

export default Historial
