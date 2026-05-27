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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Formulario enviado:", form);
    // Aquí puedes agregar la lógica de envío (fetch, axios, etc.)
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.formTitle}>Formulario</h1>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          name="correo"
          placeholder="nombre@ejemplo.com"
          value={form.correo}
          onChange={handleChange}
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
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          rows="3"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Contactenos</h1>
      <div style={styles.contenedor}>
        <InfoCard />
        <ContactForm />
      </div>
    </div>
  );
}