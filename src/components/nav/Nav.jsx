import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css';
import Inicio from '../../pages/Inicio';

function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && busqueda.trim()) {
      navigate(`/buscar/${encodeURIComponent(busqueda.trim())}`);
      setBusqueda('');
      setMenuAbierto(false);
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-header">
        <h2>Menú</h2>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}

      <div className={`sidebar-menu ${menuAbierto ? "visible" : ""}`}>
        <Link to="/inicio" className="menu-button">Inicio</Link>
        <Link to="/catalogo" className="menu-button">Catálogo</Link>
        <Link to="/categorias" className="menu-button">Categorías</Link>
        <Link to="/carrito" className="menu-button">Carrito</Link>
        <Link to="/pedidos" className="menu-button">Mis pedidos</Link>
        <Link to="/favoritos" className="menu-button">Favoritos</Link> {/* Botón hacia favoritos :v */}
      </div>
    </nav>
  );
}

export default Nav;


