import { useEffect } from "react";
import { useResource } from "../hooks/useAppContext";

const ESTADO_STYLES = {
  Disponible: "bg-green-100 text-green-700",
  Agotado: "bg-red-100 text-red-600",
  "Stock bajo": "bg-yellow-100 text-yellow-700",
};

export default function ListadoProductos() {
  const { filteredItems, loading, error, search, setSearch, fetchItems, openModal } =
    useResource("productos");

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-md max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => openModal()}
          className="bg-[#0b1f4d] text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-[#0f2a66]"
        >
          Agregar
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 py-6">Cargando productos...</p>}
      {error && <p className="text-center text-red-500 py-6">{error}</p>}

      {!loading && !error && (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 font-medium">Producto</th>
              <th className="py-2 font-medium">Precio</th>
              <th className="py-2 font-medium">Estado de inventario</th>
              <th className="py-2 font-medium">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  No hay productos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
            {filteredItems.map((producto) => (
              <tr
                key={producto.id}
                className="border-b last:border-none cursor-pointer hover:bg-gray-50"
                onClick={() => openModal(producto)}
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={producto.urlImagen || "/placeholder-product.png"}
                      alt={producto.nombre}
                      className="w-10 h-10 rounded object-cover bg-gray-100"
                    />
                    <div>
                      <p className="font-semibold">{producto.nombre}</p>
                      <p className="text-gray-400 text-xs line-clamp-1">
                        {producto.descripcion}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-gray-600">${producto.precio}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ESTADO_STYLES[producto.estadoInventario] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {producto.estadoInventario}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
