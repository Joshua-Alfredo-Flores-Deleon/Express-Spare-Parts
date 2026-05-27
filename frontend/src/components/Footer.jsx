import telefono from '../assets/circulo-de-telefono.png'
import whatsapp from '../assets/telefono-giratorio.png'
import correo from '../assets/sobre.png'

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0d2340',
      color: 'white',
      padding: '30px 40px',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      {/* Texto principal */}
      <p style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>
        Pagina perteneciente a ©Express Spare Parts
      </p>

      {/* Contactos */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        flexWrap: 'wrap'
      }}>
        {/* Teléfono */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={telefono} alt="Teléfono" style={{ width: '28px' }} />
          <span>+503 6245-1425</span>
        </div>

        {/* WhatsApp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={whatsapp} alt="WhatsApp" style={{ width: '28px' }} />
          <span>+503 6245 1425</span>
        </div>

        {/* Correo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={correo} alt="Correo" style={{ width: '28px' }} />
          <span>express_spare_parts@gmail.com</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer