import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'

const API = 'http://localhost:4000/api'

function Historial() {
  const [historial, setHistorial] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`${API}/historial`)
        setHistorial(res.data)
        setFiltered(res.data)
      } catch (err) {
        console.error('Error fetching historial:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchHistorial()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(historial)
    } else {
      const term = search.toLowerCase()
      setFiltered(historial.filter(h => {
        const clientName = h.id_cliente?.full_name || ''
        const ventaDesc = h.id_venta?.name || ''
        const status = h.status || ''
        return (
          clientName.toLowerCase().includes(term) ||
          ventaDesc.toLowerCase().includes(term) ||
          status.toLowerCase().includes(term)
        )
      }))
    }
  }, [search, historial])

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return <div className="loading-container">Cargando historial...</div>
  }

  return (
    <>
      <div className="toolbar" style={{ justifyContent: 'center' }}>
        <div className="search-container" style={{ maxWidth: '500px' }}>
          <input
            type="text"
            placeholder="Buscar usuario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-historial"
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      <table className="data-table" id="historial-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Venta</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {!filtered || filtered.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                No hay registros en el historial
              </td>
            </tr>
          ) : filtered.map((record) => (
              <tr key={record._id}>
                <td style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  {record.id_cliente?.full_name || 'Cliente no encontrado'}
                </td>
                <td>
                  {record.id_venta?.name || record.id_venta?.delivery || 'Sin descripción'}
                  {record.id_venta?.paymentMethod && (
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {record.id_venta.paymentMethod}
                    </div>
                  )}
                </td>
                <td>{formatDate(record.date || record.createdAt)}</td>
                <td>
                  <span className={`status-text ${record.status === 'Completado' || record.status === 'Activo' ? 'active' : 'inactive'}`}>
                    {record.status || 'Completado'}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Historial
