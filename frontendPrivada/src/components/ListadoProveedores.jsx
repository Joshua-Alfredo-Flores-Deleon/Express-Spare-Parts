import { FiEdit2, FiTrash2 } from 'react-icons/fi'

function ListadoProveedores({ proveedores, onEdit, onDelete }) {
  return (
    <table className="data-table" id="providers-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Imagen</th>
          <th>Direccion</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {!proveedores || proveedores.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
              No hay proveedores registrados
            </td>
          </tr>
        ) : proveedores.map((prov) => (
          <tr key={prov._id}>
            <td style={{ fontWeight: 600 }}>{prov.name}</td>
            <td>{prov.email}</td>
            <td>{prov.phone}</td>
            <td>
              {prov.image ? (
                <img src={prov.image} alt={prov.name} className="table-image" />
              ) : (
                <span style={{ color: '#9CA3AF' }}>Sin imagen</span>
              )}
            </td>
            <td>{prov.direcion || '—'}</td>
            <td>
              <span className={`status-indicator ${prov.status ? 'active' : 'inactive'}`} />
            </td>
            <td>
              <div className="actions-cell">
                <button
                  className="btn-action edit"
                  onClick={() => onEdit(prov)}
                  title="Editar"
                  id={`edit-provider-${prov._id}`}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => onDelete(prov._id)}
                  title="Eliminar"
                  id={`delete-provider-${prov._id}`}
                >
                  <FiTrash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListadoProveedores
