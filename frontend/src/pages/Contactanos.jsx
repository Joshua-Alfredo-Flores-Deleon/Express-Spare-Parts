import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
 
const styles = {
  pageTitle: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "10px",
  },
  contenedor: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "50px",
    padding: "0 20px 60px",
  },
  card: {
    flex: 1,
    minWidth: "280px",
    maxWidth: "460px",
    background: "linear-gradient(180deg, #1602cc, #011130)",
    color: "white",
    padding: "50px",
    borderRadius: "30px",
  },
  infoText: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "rgb(173, 172, 172)",
    lineHeight: "1.6",
  },
  formTitle: { textAlign: "center" },
};
 
function InfoCard() {
  return (
    <div style={styles.card}>
      <p style={styles.infoText}>
        Si necesitas información sobre cómo usar un producto o reportar un
        problema con la página o un producto dañado, contáctanos para resolver
        tu problema lo más rápido posible.
      </p>
      <h5>Nuestras ubicaciones son:</h5>
      <p style={styles.infoText}>
        Zona Rosa, a la par de Plaza Olivos y Parque Cuscatlán, del lado de la
        Federación de Escalada y Montañismo.
      </p>
      <p style={styles.infoText}><strong>Teléfono:</strong> 6245-1425</p>
      <p style={styles.infoText}><strong>WhatsApp:</strong> 6245-1425</p>
      <p style={styles.infoText}><strong>Correo:</strong> express_spare_parts@gmail.com</p>
    </div>
  );
}
 
function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    descripcion: "",
  });
 
  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState({ texto: "", tipo: "" });
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Validación básica de campos obligatorios en el frontend
    if (!form.nombre || !form.correo || !form.descripcion) {
      setMensajeEstado({
        texto: "Por favor, completa todos los campos obligatorios (*).",
        tipo: "danger",
      });
      return;
    }
 
    setEnviando(true);
    setMensajeEstado({ texto: "", tipo: "" });
 
    // REEMPLAZA ESTA URL CON LA QUE TE DA FORMSPREE
    const formspreeEndpoint = "https://formspree.io/f/mdaqakkq"; 
 
    try {
      const respuesta = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: form.nombre,
          Email: form.correo,
          Telefono: form.telefono,
          Mensaje: form.descripcion,
        }),
      });
 
      if (respuesta.ok) {
        setMensajeEstado({
          texto: "¡Tu mensaje ha sido enviado! Te responderemos muy pronto.",
          tipo: "success",
        });
        // Reiniciamos el formulario
        setForm({ nombre: "", correo: "", telefono: "", descripcion: "" });
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
      setMensajeEstado({
        texto: "Ocurrió un error al intentar enviar tu mensaje. Inténtalo de nuevo.",
        tipo: "danger",
      });
    } finally {
      setEnviando(false);
    }
  };
 
  return (
    <div style={styles.card}>
      <h1 style={styles.formTitle}>Formulario</h1>
 
      {mensajeEstado.texto && (
        <div className={`alert alert-${mensajeEstado.tipo} py-2 text-center`} role="alert">
          {mensajeEstado.texto}
        </div>
      )}
 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre *</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Correo *</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            placeholder="nombre@ejemplo.com"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            placeholder="xxxx-xxxx"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Descripción *</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="d-flex justify-content-end">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default function ContactPage() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Contáctenos</h1>
      <div style={styles.contenedor}>
        <InfoCard />
        <ContactForm />
      </div>
    </div>
  );
}
 