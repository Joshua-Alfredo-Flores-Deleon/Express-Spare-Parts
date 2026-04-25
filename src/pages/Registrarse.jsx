import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imgLogo from "../assets/golo-removebg-preview 5.png";
import imgVelo from "../assets/velo.png";
import imgFondo from "../assets/fondo.png";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundImage: `url(${imgFondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
    position: "relative",
    overflow: "hidden",
  },
  topBarsContainer: {
    position: "absolute",
    top: "30px",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 100px",
    zIndex: 10,
  },
  topBar: {
    width: "250px",
    height: "5px",
    background: "linear-gradient(90deg, #00d4ff, #0099cc)",
    boxShadow: "0 0 15px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5)",
    position: "relative",
  },
  topBarEdge: {
    position: "absolute",
    top: "-10px",
    right: "-20px",
    width: "0",
    height: "0",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "25px solid #1a2332",
  },
  bottomBarsContainer: {
    position: "absolute",
    bottom: "30px",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 100px",
    zIndex: 10,
  },
  bottomBar: {
    width: "250px",
    height: "5px",
    background: "linear-gradient(90deg, #00d4ff, #0099cc)",
    boxShadow: "0 0 15px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5)",
    position: "relative",
  },
  bottomBarEdge: {
    position: "absolute",
    bottom: "-10px",
    right: "-20px",
    width: "0",
    height: "0",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderTop: "25px solid #1a2332",
  },
  mainCard: {
    display: "flex",
    maxWidth: "900px",
    width: "100%",
    background: "white",
    borderRadius: "0",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
    position: "relative",
    zIndex: 1,
  },
  formSection: {
    flex: "0 0 55%",
    padding: "40px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f8f9fa",
  },
  logoContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  logo: {
    width: "140px",
    height: "auto",
  },
  formTitle: {
    fontSize: "26px",
    fontWeight: "500",
    color: "#5a6c7d",
    marginBottom: "25px",
    textAlign: "center",
  },
  formGroup: {
    width: "100%",
    maxWidth: "380px",
    marginBottom: "18px",
  },
  input: {
    width: "100%",
    padding: "12px 18px",
    border: "1px solid #d0d5da",
    borderRadius: "25px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#95a5a6",
    backgroundColor: "#fafafa",
  },
  submitButton: {
    width: "auto",
    padding: "12px 50px",
    background: "#3d6b85",
    color: "white",
    border: "none",
    borderRadius: "3px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  },
  infoSection: {
    flex: "0 0 45%",
    background: "transparent",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${imgVelo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  veloImage: {
    display: "none",
  },
  techPattern: {
    position: "absolute",
    top: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    border: "2px solid rgba(0, 200, 255, 0.5)",
    animation: "rotate 20s linear infinite",
    zIndex: 1,
  },
  infoContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    marginTop: "40px",
    background: "rgba(5, 15, 30, 0.85)",
    padding: "30px 35px",
    borderRadius: "5px",
  },
  infoTitle: {
    fontSize: "17px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#ffffff",
  },
  infoText: {
    fontSize: "13px",
    marginBottom: "18px",
    lineHeight: "1.4",
    color: "rgba(255,255,255,0.8)",
  },
  loginLink: {
    display: "inline-block",
    color: "#00d4ff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "10px 30px",
    border: "2px solid #00d4ff",
    borderRadius: "3px",
  },
  chevronContainer: {
    position: "absolute",
    top: "50px",
    right: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    zIndex: 2,
  },
  chevron: {
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "16px solid rgba(0, 220, 255, 0.7)",
    animation: "bounce 2s ease-in-out infinite",
  },
  chevronLeft: {
    position: "absolute",
    top: "45%",
    left: "12px",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    zIndex: 2,
  },
  chevronLeftItem: {
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "16px solid rgba(0, 220, 255, 0.7)",
    animation: "bounce 2s ease-in-out infinite",
  },
};

export default function Registrarse() {
  const [form, setForm] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    usuario: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro enviado:", form);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.topBarsContainer}>
        <div style={styles.topBar}>
          <div style={styles.topBarEdge}></div>
        </div>
        <div style={styles.topBar}>
          <div style={styles.topBarEdge}></div>
        </div>
        <div style={styles.topBar}>
          <div style={styles.topBarEdge}></div>
        </div>
      </div>

      <div style={styles.bottomBarsContainer}>
        <div style={styles.bottomBar}>
          <div style={styles.bottomBarEdge}></div>
        </div>
        <div style={styles.bottomBar}>
          <div style={styles.bottomBarEdge}></div>
        </div>
        <div style={styles.bottomBar}>
          <div style={styles.bottomBarEdge}></div>
        </div>
      </div>
      
      <div style={styles.mainCard}>
        <div style={styles.formSection}>
          <div style={styles.logoContainer}>
            <img src={imgLogo} alt="Express Spare Parts" style={styles.logo} />
          </div>
          
          <h2 style={styles.formTitle}>Regístrate</h2>
          
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="nombreCompleto"
                placeholder="Nombre Completo"
                value={form.nombreCompleto}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="tel"
                name="telefono"
                placeholder="Número de Teléfono"
                value={form.telefono}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                value={form.usuario}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Registrarse
            </button>
          </form>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.chevronContainer}>
            <div style={styles.chevron}></div>
            <div style={{ ...styles.chevron, animationDelay: "0.15s" }}></div>
            <div style={{ ...styles.chevron, animationDelay: "0.3s" }}></div>
          </div>

          <div style={styles.chevronLeft}>
            <div style={styles.chevronLeftItem}></div>
            <div style={{ ...styles.chevronLeftItem, animationDelay: "0.15s" }}></div>
            <div style={{ ...styles.chevronLeftItem, animationDelay: "0.3s" }}></div>
            <div style={{ ...styles.chevronLeftItem, animationDelay: "0.45s" }}></div>
            <div style={{ ...styles.chevronLeftItem, animationDelay: "0.6s" }}></div>
          </div>

          <div style={styles.infoContent}>
            <h3 style={styles.infoTitle}>Si tienes ya una cuenta</h3>
            <p style={styles.infoText}>haz click aquí abajo</p>
            <a href="/login" style={styles.loginLink}>
              Iniciar Sesión
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(10px); opacity: 1; }
        }

        input:focus {
          border-color: #3498db !important;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2) !important;
        }

        button:hover {
          background: #2d5468;
          box-shadow: 0 5px 10px rgba(0,0,0,0.3);
        }

        a:hover {
          color: #00ffff !important;
        }

        @media (max-width: 768px) {
          .mainCard {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
