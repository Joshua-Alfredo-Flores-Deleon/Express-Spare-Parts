import { useState, useEffect } from 'react'

function FormPromociones({ pedido, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (pedido) {
      setFormData({
        name: pedido.name || '',
        phone: pedido.phone || '',
      })
    }
  }, [pedido])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      setErrorMsg('La descripción debe tener al menos 3 caracteres.')
      return
    }
    
    // Basic phone validation (at least 8 digits/chars)
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg('El teléfono debe tener al menos 8 caracteres.')
      return
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('phone', formData.phone)
    if (imageFile) {
      data.append('image', imageFile)
    }
    onSave(data)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{pedido ? 'Editar Pedido' : 'Agregar Pedido'}</h2>
        {errorMsg && <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="promo-name">Descripción</label>
            <input
              id="promo-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Descripción del pedido"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="promo-phone">Teléfono</label>
            <input
              id="promo-phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Número de teléfono"
            />
          </div>
          <div className="form-group">
            <label htmlFor="promo-image">Imagen</label>
            <div className="file-input-wrapper">
              <input
                id="promo-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {pedido ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormPromociones
