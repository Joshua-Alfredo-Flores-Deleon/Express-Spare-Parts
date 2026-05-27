import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './pages/Carrito'
import Resenas from './pages/Resenas'
import Inicio from './pages/Inicio'
import Contactanos from './pages/Contactanos'
import Registrarse from './pages/Registrarse'
import Novedades from './pages/Novedades'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/resenas" element={<Resenas />} />
        <Route path="/contactos" element={<Contactanos />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/novedades" element={<Novedades />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App