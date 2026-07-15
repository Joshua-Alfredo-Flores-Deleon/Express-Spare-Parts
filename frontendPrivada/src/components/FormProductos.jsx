import { useState, useEffect } from 'react'

function FormProductos({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    supplider_id: ''
  })
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        supplider_id: product.supplider_id || ''
      })
    }
  }, [product])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    
    if (formData.name.trim().length < 3) {
      setErrorMsg('El nombre del producto debe tener al menos 3 caracteres.')
      return
    }
    if (Number(formData.price) <= 0) {
      setErrorMsg('El precio debe ser un número mayor a 0.')
      return
    }
    if (Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
      setErrorMsg('El stock debe ser un número entero válido (0 o más).')
      return
    }
    if (!formData.supplider_id.trim()) {
      setErrorMsg('El ID del proveedor es requerido.')
      return
    }

    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
        {errorMsg && <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción técnica"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplider_id">ID Proveedor</label>
            <input
              id="supplider_id"
              type="text"
              name="supplider_id"
              value={formData.supplider_id}
              onChange={handleChange}
              placeholder="ID del proveedor"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {product ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormProductos
