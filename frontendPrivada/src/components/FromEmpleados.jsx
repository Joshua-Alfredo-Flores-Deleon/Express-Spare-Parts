import { useState, useEffect } from 'react'

function FromEmpleados({ proveedor, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    direcion: '',
    status: true,
  })
  const [imageFile, setImageFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (proveedor) {
      setFormData({
        name: proveedor.name || '',
        email: proveedor.email || '',
        phone: proveedor.phone || '',
        direcion: proveedor.direcion || '',
        status: proveedor.status !== undefined ? proveedor.status : true,
      })
    }
  }, [proveedor])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      setErrorMsg('El nombre debe tener al menos 3 caracteres.')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('El correo no tiene un formato válido.')
      return
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg('El teléfono debe tener al menos 8 caracteres.')
      return
    }

    if (!formData.direcion.trim() || formData.direcion.trim().length < 5) {
      setErrorMsg('La dirección debe tener al menos 5 caracteres.')
      return
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('direcion', formData.direcion)
    data.append('status', formData.status)
    if (imageFile) {
      data.append('image', imageFile)
    }
    onSave(data)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{proveedor ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
        {errorMsg && <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="prov-name">Nombre</label>
            <input
              id="prov-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del proveedor"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prov-email">Correo</label>
            <input
              id="prov-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prov-phone">Teléfono</label>
            <input
              id="prov-phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0000-0000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="prov-direcion">Dirección</label>
            <input
              id="prov-direcion"
              type="text"
              name="direcion"
              value={formData.direcion}
              onChange={handleChange}
              placeholder="Dirección del proveedor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="prov-image">Imagen</label>
            <div className="file-input-wrapper">
              <input
                id="prov-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'none' }}>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />
              Activo
            </label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {proveedor ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FromEmpleados
