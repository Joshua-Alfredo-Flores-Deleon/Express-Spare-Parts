import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import Historial from './pages/Historial'
import Proveedores from './pages/Proveedores'
import Pedidos from './pages/Pedidos'
import PromocionesMarketing from './pages/PromocionesMarketing'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/promociones" element={<PromocionesMarketing />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
