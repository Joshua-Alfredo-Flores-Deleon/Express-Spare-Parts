import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carrito from './pages/Carrito'
import Resenas from './pages/Resenas'
import Inicio from './pages/Inicio'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/resenas" element={<Resenas />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App