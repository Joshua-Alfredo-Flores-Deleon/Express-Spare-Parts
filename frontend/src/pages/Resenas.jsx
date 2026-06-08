import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaStar, FaRegStar } from 'react-icons/fa'

const API_URL = 'http://localhost:4000/api'

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

function TarjetaResena({ nombre, estrellas, titulo, texto, tipo }) {
  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'flex-start' }}>
      <div style={{
        width: '45px', height: '45px', borderRadius: '50%',
        backgroundColor: '#ddd', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0
      }}>
        <FaUser style={{ fontSize: '20px', color: '#555' }} />
      </div>
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{nombre}</p>
        {tipo && <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{tipo}</p>}
        <p style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>{titulo}</p>
        <Estrellas cantidad={estrellas} />
        <p style={{ fontSize: '13px', color: '#555' }}>{texto}</p>
      </div>
    </div>
  )
}

function FormularioResena({ onSuccess }) {
  const [form, setForm] = useState({
    ranking: 5,
    title: '',
    experience_type: '',
    details: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setMensaje('')
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, ranking: Number(form.ranking) }),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('¡Gracias por tu reseña!')
        setForm({ ranking: 5, title: '', experience_type: '', details: '' })
        if (onSuccess) onSuccess()
      } else {
        setMensaje(data.message || 'Error al enviar reseña')
      }
    } catch {
      setMensaje('No se pudo conectar con el servidor')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
      <h3 style={{ marginBottom: '15px', color: '#1a3a5c' }}>Deja tu reseña</h3>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Calificación</label>
        <select name="ranking" value={form.ranking} onChange={handleChange}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}>
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} estrella{n !== 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Título</label>
        <input name="title" value={form.title} onChange={handleChange} required
          placeholder="Ej: Excelente servicio"
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Tipo de experiencia</label>
        <input name="experience_type" value={form.experience_type} onChange={handleChange}
          placeholder="Ej: Excelente, Buena, Regular"
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Comentario</label>
        <textarea name="details" value={form.details} onChange={handleChange} required rows={4}
          placeholder="Cuéntanos tu experiencia..."
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', resize: 'vertical' }} />
      </div>
      {mensaje && <p style={{ color: mensaje.includes('Gracias') ? 'green' : 'red', marginBottom: '10px' }}>{mensaje}</p>}
      <button type="submit" disabled={enviando}
        style={{ padding: '10px 28px', backgroundColor: '#1a3a5c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
        {enviando ? 'Enviando...' : 'Enviar reseña'}
      </button>
    </form>
  )
}

function Resenas() {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [reviewsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/reviews/active`),
        fetch(`${API_URL}/reviews/stats`),
      ])
      const reviewsData = await reviewsRes.json()
      const statsData = await statsRes.json()
      setReviews(reviewsData)
      setStats(statsData)
    } catch {
      setError('No se pudieron cargar las reseñas. Verifica que el servidor esté activo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const positivas = reviews.filter(r => r.ranking >= 4)
  const negativas = reviews.filter(r => r.ranking < 4)

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>Cargando reseñas...</div>
  }

  if (error) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Valoraciones y reseñas</h1>

      {/* Puntuación general */}
      {stats && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginBottom: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '80px', fontWeight: 'bold', display: 'block' }}>
              {stats.averageRanking || '0.0'}
            </span>
            <span style={{ fontSize: '14px', color: '#888' }}>{stats.totalReviews} reseñas</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map((n) => {
              const count = stats.distribution?.[n] || 0
              const pct = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '10px' }}>{n}</span>
                  <div style={{ width: '300px', backgroundColor: '#ddd', borderRadius: '5px', height: '12px' }}>
                    <div style={{ width: `${pct}%`, backgroundColor: '#1a3a5c', height: '12px', borderRadius: '5px' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#777' }}>{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Reseñas */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Positivas ({positivas.length})</h2>
          {positivas.length === 0
            ? <p style={{ textAlign: 'center', color: '#888' }}>No hay reseñas positivas aún.</p>
            : positivas.map((r) => (
                <TarjetaResena
                  key={r._id}
                  nombre={r.id_customer?.full_name || 'Cliente'}
                  estrellas={r.ranking}
                  titulo={r.title}
                  texto={r.details}
                  tipo={r.experience_type}
                />
              ))
          }
        </div>

        <div style={{ width: '1px', backgroundColor: '#ccc' }} />

        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Negativas ({negativas.length})</h2>
          {negativas.length === 0
            ? <p style={{ textAlign: 'center', color: '#888' }}>No hay reseñas negativas.</p>
            : negativas.map((r) => (
                <TarjetaResena
                  key={r._id}
                  nombre={r.id_customer?.full_name || 'Cliente'}
                  estrellas={r.ranking}
                  titulo={r.title}
                  texto={r.details}
                  tipo={r.experience_type}
                />
              ))
          }
        </div>
      </div>

      {/* Formulario para dejar reseña */}
      <FormularioResena onSuccess={fetchData} />
    </div>
  )
}

export default Resenas