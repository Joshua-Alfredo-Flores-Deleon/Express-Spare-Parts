function ListadoEmpleados({ empleados }) {
  if (!empleados || empleados.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay empleados registrados</p>
      </div>
    )
  }

  return (
    <table className="data-table" id="employees-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Rol</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((emp) => (
          <tr key={emp._id}>
            <td style={{ fontWeight: 600 }}>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.rol || '—'}</td>
            <td>
              <span className={`status-indicator ${emp.status ? 'active' : 'inactive'}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListadoEmpleados
