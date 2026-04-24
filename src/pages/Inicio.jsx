import React, { useState } from "react";

import imgPromo from "../assets/Promoción.png";
import imgFreno from "../assets/sistema-de-frenos.jpg";
import imgMotor from "../assets/como-funciona-motor-202066339-1586191787_5.webp";
import imgEnfriamiento from "../assets/sistema-enfriamiento-aire.jpg";
import imgBaleros from "../assets/shutterstock_1089804707-scaled.jpg";
import imgClutch from "../assets/clutch-g20ed8438b-640.jpg";
import imgElectrica from "../assets/116138149-services-car-engine-machine-concept-automobile-mechanic-repairman-hands-repairing-a-car-engine.jpg";
import imgMapa from "../assets/Mapa.png";

const categorias = [
  { img: imgFreno, nombre: "Sistema de Frenos" },
  { img: imgMotor, nombre: "Motores" },
  { img: imgEnfriamiento, nombre: "Sistema de Enfriamiento" },
  { img: imgBaleros, nombre: "Baleros" },
  { img: imgClutch, nombre: "Suspensión y Embrague" },
  { img: imgElectrica, nombre: "Partes Eléctricas" },
];


const styles = {
  promo: { width: "100%",
  maxWidth: "1000px",   // no crecerá más de 800px
  height: "auto", 
  display: "block",
  margin: "0 auto" },
  maintext: { textAlign: "center", margin: "20px 0" },
  contenedor: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },
  categoriaBox: { width: "300px", position: "relative", overflow: "hidden" },
  categoriaImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  },
  categoriaLabel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    margin: 0,
    padding: "10px",
    color: "white",
    fontWeight: "bold",
    background: "rgba(0,0,0,0.6)",
  },
  contenedor2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 20px",
  },
  info: { maxWidth: "500px", textAlign: "center" },
  infoP: { marginTop: "40px", fontSize: "20px" },
  btnSucursales: {
    marginTop: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "20px auto 0",
    fontSize: "20px",
  },
  mapaImg: { width: "900px", height: "auto", borderRadius: "10px" },
};

function CategoriaCard({ img, nombre }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={styles.categoriaBox}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img}
        alt={nombre}
        style={{
          ...styles.categoriaImg,
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      />
      <p style={styles.categoriaLabel}>{nombre}</p>
    </div>
  );
}

export default function Inicio() {
  return (
    <div>
      {/* Banner promocional */}
      <img src={imgPromo} alt="Promoción" style={styles.promo} />

      {/* Categorías */}
      <div>
        <h1 style={styles.maintext}>Categorias</h1>

        <div style={styles.contenedor}>
          {categorias.slice(0, 3).map((cat) => (
            <CategoriaCard key={cat.nombre} img={cat.img} nombre={cat.nombre} />
          ))}
        </div>

        <div style={styles.contenedor}>
          {categorias.slice(3, 6).map((cat) => (
            <CategoriaCard key={cat.nombre} img={cat.img} nombre={cat.nombre} />
          ))}
        </div>
      </div>

      {/* Sucursales + Mapa */}
      <div style={styles.contenedor2}>
        <div style={styles.info}>
          <h2>Nuestras sucursales</h2>
          <p style={styles.infoP}>
            Visita nuestras sucursales físicas para obtener mejor información
            sobre las piezas que necesitas.
          </p>
          <p style={styles.infoP}>Nosotros somos la Fuerza detrás de tu motor</p>
          <button style={styles.btnSucursales} className="btn btn-primary">
            Ver Sucursales
          </button>
        </div>

        <div>
          <img src={imgMapa} alt="Mapa de sucursales" style={styles.mapaImg} />
        </div>
      </div>
    </div>
  );
}
