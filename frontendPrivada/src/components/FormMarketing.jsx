import { useState, useEffect } from 'react'

function FormMarketing({ onClose, onSave, promocionEdit }) {
  const [titulo, setTitulo] = useState(promocionEdit ? promocionEdit.titulo : '')
  const [descripcion, setDescripcion] = useState(promocionEdit ? promocionEdit.descripcion : '')
  const [image, setImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (promocionEdit) {
      setTitulo(promocionEdit.titulo || '')
      setDescripcion(promocionEdit.descripcion || '')
    }
  }, [promocionEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    
    if (!titulo.trim()) {
      setErrorMsg('El título es requerido.')
      return
    }
    if (!descripcion.trim()) {
      setErrorMsg('La descripción es requerida.')
      return
    }
    if (!promocionEdit && !image) {
      setErrorMsg('La imagen es requerida para una nueva promoción.')
      return
    }

    onSave({ titulo, descripcion, image })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">
          {promocionEdit ? 'Editar Promoción' : 'Agregar Nueva Promoción'}
        </h2>
        {errorMsg && <div style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{errorMsg}</div>}
        <form className="custom-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Título <span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" 
              placeholder="Ej: Compra 1 y llévate otro..."
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción <span style={{color: 'red'}}>*</span></label>
            <textarea 
              placeholder="Descripción de la promoción..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagen {!promocionEdit && <span style={{color: 'red'}}>*</span>}</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              required={!promocionEdit}
            />
            {promocionEdit && promocionEdit.imagen && !image && (
              <small style={{display: 'block', marginTop: '5px', color: '#666'}}>
                Deje el campo vacío para mantener la imagen actual.
              </small>
            )}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">Guardar Promoción</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormMarketing
