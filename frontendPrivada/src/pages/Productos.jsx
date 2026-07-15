import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import Boton from '../components/Boton'
import ListadoProductos from '../components/ListadoProductos'
import FormProductos from '../components/FormProductos'

const API = 'http://localhost:4000/api'

function Productos() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product`)
      setProducts(res.data)
      setFiltered(res.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(products)
    } else {
      const term = search.toLowerCase()
      setFiltered(products.filter(p => 
        p.name?.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term)
      ))
    }
  }, [search, products])

  const handleSave = async (data) => {
    try {
      if (editProduct) {
        await axios.put(`${API}/product/${editProduct._id}`, data)
      } else {
        await axios.post(`${API}/product`, data)
      }
      setShowForm(false)
      setEditProduct(null)
      fetchProducts()
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Error al guardar el producto')
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    try {
      await axios.delete(`${API}/product/${id}`)
      fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Error al eliminar el producto')
    }
  }

  const handleOpenForm = () => {
    setEditProduct(null)
    setShowForm(true)
  }

  if (loading) {
    return <div className="loading-container">Cargando productos...</div>
  }

  return (
    <>
      <div className="toolbar">
        <Boton texto="Agregar" onClick={handleOpenForm} />
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar usuario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-products"
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      <ListadoProductos 
        products={filtered} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {showForm && (
        <FormProductos
          product={editProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditProduct(null) }}
        />
      )}
    </>
  )
}

export default Productos
