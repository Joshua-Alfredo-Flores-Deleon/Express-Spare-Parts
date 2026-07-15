import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'
import Boton from '../components/Boton'
import FormMarketing from '../components/FormMarketing'

const API = 'http://localhost:4000/api'

function PromocionesMarketing() {
  const [promociones, setPromociones] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [promocionEdit, setPromocionEdit] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchPromociones()
  }, [])

  const fetchPromociones = async () => {
    try {
      const res = await axios.get(`${API}/promocion`)
      setPromociones(res.data)
      setFiltered(res.data)
      setErrorMsg('')
    } catch (error) {
      console.error(error)
      setErrorMsg('La conexión a la base de datos falló o no hay datos (ECONNREFUSED).')
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearch(term)
    if (!term) {
      setFiltered(promociones)
    } else {
      setFiltered(promociones.filter(p => 
        p.titulo?.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term)
      ))
    }
  }

  const handleOpenForm = (promo = null) => {
    setPromocionEdit(promo)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setPromocionEdit(null)
    setShowForm(false)
  }

  const handleSave = async (data) => {
    try {
      const formData = new FormData()
      formData.append('titulo', data.titulo)
      formData.append('descripcion', data.descripcion)
      if (data.image) formData.append('image', data.image)

      if (promocionEdit) {
        await axios.put(`${API}/promocion/${promocionEdit._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post(`${API}/promocion`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      fetchPromociones()
      handleCloseForm()
    } catch (error) {
      console.error(error)
      alert('Error al guardar la promoción. Verifica la conexión a la base de datos.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar esta promoción?')) {
      try {
        await axios.delete(`${API}/promocion/${id}`)
        fetchPromociones()
      } catch (error) {
        console.error(error)
        alert('Error al eliminar la promoción')
      }
    }
  }

  return (
    <>
      <div className="toolbar">
        <Boton texto="Agregar Promoción" onClick={() => handleOpenForm()} />
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar promoción" 
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {errorMsg && <div style={{color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', margin: '15px 0'}}>{errorMsg}</div>}

      <table className="data-table" id="promos-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!filtered || filtered.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                No hay promociones registradas
              </td>
            </tr>
          ) : filtered.map((promo) => (
              <tr key={promo._id}>
                <td>
                  {promo.imagen ? (
                    <img src={promo.imagen} alt={promo.titulo} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px'}} />
                  ) : 'Sin imagen'}
                </td>
                <td style={{ fontWeight: 600 }}>{promo.titulo}</td>
                <td>{promo.descripcion}</td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-action edit" onClick={() => handleOpenForm(promo)} title="Editar">
                      <FiEdit2 />
                    </button>
                    <button className="btn-action delete" onClick={() => handleDelete(promo._id)} title="Eliminar">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showForm && (
        <FormMarketing
          onClose={handleCloseForm}
          onSave={handleSave}
          promocionEdit={promocionEdit}
        />
      )}
    </>
  )
}

export default PromocionesMarketing
