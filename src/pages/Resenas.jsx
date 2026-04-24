import { FaUser } from 'react-icons/fa'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

function Estrellas({ cantidad }) {
  return (
    <div style={{ display: 'flex', gap: '2px', color: '#f5a623', marginBottom: '4px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        i <= cantidad
          ? <FaStar key={i} />
          : <FaRegStar key={i} />
      ))}
    </div>
  )
}

function Resenas() {
  const positivas = [
  { nombre: 'Carlos M.', estrellas: 5, texto: 'Excelente servicio, encontré las piezas que necesitaba para mi Toyota a muy buen precio. Las entregas son rápidas.' },
  { nombre: 'Roberto S.', estrellas: 4, texto: 'Muy buena atención al cliente, me ayudaron a encontrar el filtro exacto para mi Nissan. Totalmente recomendado.' },
  { nombre: 'Miguel A.', estrellas: 5, texto: 'Llevo años comprando aquí mis repuestos. Siempre tienen stock y los precios son los mejores del mercado.' },
  { nombre: 'Luis H.', estrellas: 4, texto: 'Las pastillas de freno que compré son de muy buena calidad. Llegaron bien empacadas y en perfecto estado.' },
]

  const negativas = [
  { nombre: 'Fulanito.', estrellas: 2, texto: 'El pedido tardó más de lo esperado en llegar. La pieza estaba bien pero la comunicación podría mejorar.' },
  { nombre: 'Andrés V.', estrellas: 1, texto: 'Me enviaron una pieza incorrecta para mi vehículo. Espero que mejoren la verificación antes de enviar.' },
  { nombre: 'Ricardo T.', estrellas: 2, texto: 'El producto llegó con el empaque dañado. La pieza estaba bien pero deberían cuidar más el embalaje.' },
  { nombre: 'Fernando L.', estrellas: 1, texto: 'Tuve problemas para contactar al servicio al cliente. Ojalá mejoren la atención postventa.' },
]

  const TarjetaResena = ({ nombre, estrellas, texto }) => (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'flex-start' }}>
      <div style={{
        width: '45px', height: '45px', borderRadius: '50%',
        backgroundColor: '#ddd', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0
      }}>
        <FaUser style={{ fontSize: '20px', color: '#555' }} />
      </div>
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{nombre}</p>
        <Estrellas cantidad={estrellas} />
        <p style={{ fontSize: '13px', color: '#555' }}>{texto}</p>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Valoraciones y reseñas</h1>

      {/* Puntuación general */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginBottom: '40px' }}>
        <span style={{ fontSize: '80px', fontWeight: 'bold' }}>5,0</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { estrella: 5, porcentaje: 60 },
            { estrella: 4, porcentaje: 25 },
            { estrella: 3, porcentaje: 5 },
            { estrella: 2, porcentaje: 5 },
            { estrella: 1, porcentaje: 5 },
          ].map((item) => (
            <div key={item.estrella} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '10px' }}>{item.estrella}</span>
              <div style={{ width: '300px', backgroundColor: '#ddd', borderRadius: '5px', height: '12px' }}>
                <div style={{
                  width: `${item.porcentaje}%`,
                  backgroundColor: '#1a3a5c',
                  height: '12px',
                  borderRadius: '5px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reseñas */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Positivas</h2>
          {positivas.map((r, i) => <TarjetaResena key={i} {...r} />)}
        </div>

        <div style={{ width: '1px', backgroundColor: '#ccc' }} />

        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Negativas</h2>
          {negativas.map((r, i) => <TarjetaResena key={i} {...r} />)}
        </div>
      </div>
    </div>
  )
}

export default Resenas