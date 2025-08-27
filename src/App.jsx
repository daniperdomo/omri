import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Accesorios from "./pages/Accesorios";
import Cubitt from './pages/Cubitt';
import Nosotros from './pages/Nosotros';
import Admin from './pages/Admin';
import AdminForm from './pages/AdminForm';
import ProductDetail from './pages/ProductDetail'; // Importa la nueva página
import Perfumes from './pages/Perfumes';

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* navbar */}
        <div className="bg-gray-100">
          <Nav />
        </div> 

        {/* Main content (grow to fill available space) */}
        <main className="flex-grow">
          <ScrollToTop /> {/* Agregar el componente ScrollToTop aquí */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cubitt' element={<Cubitt />} />
            <Route path='/perfumes' element={<Perfumes />} />
            <Route path='/accesorios' element={<Accesorios />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA' element={<Admin />}/>
            <Route path='/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/:type' element={<AdminForm/>} />
            <Route path='/producto/:cod_producto' element={<ProductDetail />} /> {/* Nueva ruta */}
          </Routes>
        </main>

        {/* footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;