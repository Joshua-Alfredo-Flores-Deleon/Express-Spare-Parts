import React, { useState, useEffect } from "react";
import "../productos.css"; // Importación de tus estilos externos

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);

  // --- MODAL DINÁMICO PARA TODO TIPO DE ALERTAS ---
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    type: "success", // "success" o "error"
    title: "",
    message: ""
  });

  // Función reutilizable para lanzar cualquier modal en la pantalla
  const showAlert = (type, title, message) => {
    setAlertModal({
      isOpen: true,
      type,
      title,
      message
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/product"); 
        
        if (!response.ok) {
          // Reemplazo de alerta de error de servidor por Modal
          showAlert(
            "error", 
            "Error de Conexión", 
            `El servidor respondió con código ${response.status}. Por favor, verifica la ruta de tu API.`
          );
          setLoading(false);
          return;
        }

        const data = await response.json();
        setProducts(data);

        const initialQuantities = {};
        data.forEach(p => { initialQuantities[p._id] = 1; });
        setQuantities(initialQuantities);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando productos:", error);
        // Reemplazo de alerta catastrófica por Modal
        showAlert(
          "error", 
          "Servidor Desconectado", 
          "No se pudo establecer conexión con el Backend. Asegúrate de que Node/Express esté encendido."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, type) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      if (type === "increment") return { ...prev, [id]: current + 1 };
      if (type === "decrement" && current > 1) return { ...prev, [id]: current - 1 };
      return prev;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Reemplazo de alerta de éxito por Modal
  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    const productName = product.name || product.description;

    showAlert(
      "success",
      "¡Agregado con éxito!",
      <span>Has añadido <strong>{qty}x</strong> "{productName}" a tu carrito de compras.</span>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#4b5563" }}>
        <h2>Cargando catálogo de repuestos...</h2>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            
            {/* Estrella Favoritos */}
            <button 
              onClick={() => toggleFavorite(product._id)}
              className={`favorite-btn ${favorites[product._id] ? "active" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[product._id] ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.326.623-.326.774 0a1.39 1.39 0 0 0 1.234.811l3.5.21c.342.02.478.441.21.677l-2.618 2.333a1.39 1.39 0 0 0-.394 1.217l.629 3.488c.061.343-.3.605-.605.441l-3.08-1.618a1.39 1.39 0 0 0-1.282 0l-3.08 1.618c-.305.164-.666-.098-.606-.441l.63-3.488a1.39 1.39 0 0 0-.394-1.217L2.83 5.374c-.268-.236-.131-.657.21-.677l3.5-.21a1.39 1.39 0 0 0 1.233-.811L11.48 3.498Z" />
              </svg>
            </button>

            {/* Imagen */}
            <div className="product-image-wrapper">
              <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
            </div>

            {/* Detalles */}
            <div>
              <h3 className="product-description">{product.description || product.name}</h3>
              <div className="product-price-row">
                <span className="product-price">${product.price}</span>
                <span className="badge badge-oem">OEM</span>
                <span className="badge badge-performance">Performance</span>
              </div>
            </div>

            {/* Controles */}
            <div className="product-controls-row">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(product._id, "decrement")} className="quantity-btn">−</button>
                <span className="quantity-value">{quantities[product._id] || 1}</span>
                <button onClick={() => handleQuantityChange(product._id, "increment")} className="quantity-btn">+</button>
              </div>

              <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                <span>+</span> Agregar
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* --- UN SOLO MODAL INTELIGENTE PARA TODO --- */}
      {alertModal.isOpen && (
        <div className="modal-overlay" onClick={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Icono Dinámico (Cambia según si es success o error) */}
            <div className={`modal-icon icon-${alertModal.type}`}>
              {alertModal.type === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>

            <h2>{alertModal.title}</h2>
            <div className="modal-message">{alertModal.message}</div>
            
            <button 
              className={`modal-close-btn btn-${alertModal.type}`} 
              onClick={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Productos;