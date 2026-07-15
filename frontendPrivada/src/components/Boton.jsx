function Boton({ texto = 'Agregar', onClick }) {
  return (
    <button className="btn-agregar" onClick={onClick} id="btn-agregar">
      {texto}
    </button>
  )
}

export default Boton
