import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'
import Boton from '../components/Boton'
import FormPromociones from '../components/FormPromociones'

const API = 'http://localhost:4000/api'

function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editPedido, setEditPedido] = useState(null)

  const fetchPedidos = async () => {
    try {
      const res = await axios.get(`${API}/venta`)
      setPedidos(res.data)
      setFiltered(res.data)
    } catch (err) {
      console.error('Error fetching pedidos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPedidos()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(pedidos)
    } else {
      const term = search.toLowerCase()
      setFiltered(pedidos.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.phone?.toLowerCase().includes(term)
      ))
    }
  }, [search, pedidos])

  const handleSave = async (formData) => {
    try {
      if (editPedido) {
        await axios.put(`${API}/venta/${editPedido._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post(`${API}/venta`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      setShowForm(false)
      setEditPedido(null)
      fetchPedidos()
    } catch (err) {
      console.error('Error saving pedido:', err)
      alert('Error al guardar el pedido')
    }
  }

  const handleEdit = (pedido) => {
    setEditPedido(pedido)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este pedido?')) return
    try {
      await axios.delete(`${API}/venta/${id}`)
      fetchPedidos()
    } catch (err) {
      console.error('Error deleting pedido:', err)
      alert('Error al eliminar el pedido')
    }
  }

  const handleOpenForm = () => {
    setEditPedido(null)
    setShowForm(true)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return <div className="loading-container">Cargando pedidos...</div>
  }

  return (
    <>
      <div className="toolbar">
        <Boton texto="Agregar" onClick={handleOpenForm} />
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar usuario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-pedidos"
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      <table className="data-table" id="pedidos-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!filtered || filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                No hay pedidos registrados
              </td>
            </tr>
          ) : filtered.map((pedido) => (
              <tr key={pedido._id}>
                <td>
                  {pedido.image ? (
                    <img src={pedido.image} alt="pedido" className="promo-image" />
                  ) : (
                    <span style={{ color: '#9CA3AF' }}>Sin imagen</span>
                  )}
                </td>
                <td>{formatDate(pedido.createdAt)}</td>
                <td>{pedido.name || '—'}</td>
                <td>
                  <span className={`status-indicator ${pedido.paymenStatua ? 'active' : 'inactive'}`} />
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn-action edit"
                      onClick={() => handleEdit(pedido)}
                      title="Editar"
                      id={`edit-pedido-${pedido._id}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(pedido._id)}
                      title="Eliminar"
                      id={`delete-pedido-${pedido._id}`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showForm && (
        <FormPromociones
          pedido={editPedido}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditPedido(null) }}
        />
      )}
    </>
  )
}

export default Pedidos
