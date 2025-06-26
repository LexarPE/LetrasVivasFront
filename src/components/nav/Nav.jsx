// Mostrar opciones para usuario si está logueado y no logueado
// Se pueda navegar a las paginas con las opciones del menú




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const links = [["Inicio","/home"],["Catalogo","/catalogo"]]
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
        <a href="/inicio" className="menu-button">
          Inicio
        </a>
        <a href="" className="menu-button">
          Catálogo
        </a>
        <a href="" className="menu-button">
          Categorías
        </a>
        <a href="" className="menu-button">
          Carrito
        </a>
        <a href="" className="menu-button">
          Mis pedidos
        </a>{" "}
        {/*Usuario*/}
        <a href="" className="menu-button">
          Favoritos
        </a>{" "}
        {/*Usuario*/}
      </div>
    </nav>
  );
}






export default Nav

