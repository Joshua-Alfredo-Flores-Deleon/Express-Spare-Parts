import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imgPromo from "../assets/Promoción.png";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";

const styles = {
  pageContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  header: {
    textAlign: "center",
    padding: "30px 20px",
    backgroundColor: "white",
    marginBottom: "30px",
  },
  headerTitle: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "400",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#000",
  },
  carouselContainer: {
    maxWidth: "1200px",
    margin: "0 auto 50px",
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  carouselButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    padding: "15px 20px",
    cursor: "pointer",
    fontSize: "24px",
    zIndex: 2,
    transition: "background-color 0.3s",
  },
  carouselButtonLeft: {
    left: "10px",
  },
  carouselButtonRight: {
    right: "10px",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  dotActive: {
    backgroundColor: "#333",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  card: {
    width: "350px",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "20px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
};

const carouselImages = [
  imgPromo,
  img1,
  img2,
];

const ofertas = [
  {
    id: 1,
    imagen: img1,
    titulo: "Compra 1 y llévate el otro con 20%",
    descripcion: "Aprovecha nuestra promoción especial en repuestos seleccionados. Válido hasta fin de mes.",
  },
  {
    id: 2,
    imagen: img2,
    titulo: "Cambio de Frenos",
    descripcion: "Realiza tu segunda compra con nosotros y obtén un descuento especial en cambio de frenos.",
  },
  {
    id: 3,
    imagen: imgPromo,
    titulo: "Consulta nuestros mejores repuestos",
    descripcion: "Contáctanos al 6245-1425 para obtener asesoría personalizada sobre los mejores repuestos para tu vehículo.",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles.carouselContainer}>
      <button
        style={{ ...styles.carouselButton, ...styles.carouselButtonLeft }}
        onClick={prevSlide}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)"}
      >
        ‹
      </button>

      <img
        src={carouselImages[currentIndex]}
        alt={`Oferta ${currentIndex + 1}`}
        style={styles.carouselImage}
      />

      <button
        style={{ ...styles.carouselButton, ...styles.carouselButtonRight }}
        onClick={nextSlide}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)"}
      >
        ›
      </button>

      <div style={styles.dotsContainer}>
        {carouselImages.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              ...(index === currentIndex ? styles.dotActive : {}),
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

function OfertaCard({ oferta }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 16px rgba(0,0,0,0.2)"
          : "0 4px 8px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={oferta.imagen} alt={oferta.titulo} style={styles.cardImage} />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{oferta.titulo}</h3>
        <p style={styles.cardDescription}>{oferta.descripcion}</p>
      </div>
    </div>
  );
}

export default function Novedades() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <p style={styles.headerTitle}>
          Aquí te mostraremos nuestras novedades, como descuentos, promociones de 2 ×1, etc
        </p>
      </div>

      <h2 style={styles.sectionTitle}>Nuestras mejores ofertas</h2>

      <Carousel />

      <div style={styles.cardsContainer}>
        {ofertas.map((oferta) => (
          <OfertaCard key={oferta.id} oferta={oferta} />
        ))}
      </div>
    </div>
  );
}
