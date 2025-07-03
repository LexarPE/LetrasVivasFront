
import { verificarTokenLocalStorage } from "../../utils/authToken";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carrito from "../../components/Carrito/Carrito";
import "./Nav.css";

function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tokenVerificacion, settokenVerificacion] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth")
    settokenVerificacion(false);
    navigate("/");
  };

  useEffect(() => {
    settokenVerificacion(verificarTokenLocalStorage());
  }, []);

  return (
    <>
      <nav className="nav-container">
        <div className="nav-header">
          <h2 onClick={() => navigate("/")} className="cursor-pointer">
            Menú
          </h2>
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}

        <div className={`sidebar-menu ${menuAbierto ? "visible" : ""}`}>
          <a href="/" className="menu-button">
            Inicio
          </a>
          <a href="/catalogo" className="menu-button">
            Catálogo
          </a>
          <a
            onClick={() => setMostrarCarrito(true)}
            className="menu-button cursor-pointer"
          >
            Carrito
          </a>

          {tokenVerificacion && (
            <>
              <a href="/biblioteca" className="menu-button">
                Biblioteca
              </a>
              <a href="/favoritos" className="menu-button">
                Favoritos
              </a>
              <a onClick={cerrarSesion} className="menu-button cursor-pointer">
                Cerrar sesión
              </a>
            </>
          )}

          {!tokenVerificacion && (
            <a href="/logReg" className="menu-button">
              Iniciar Sesión
            </a>
          )}
        </div>
      </nav>

      {/* Panel del carrito */}
      <Carrito
        visible={mostrarCarrito}
        onClose={() => setMostrarCarrito(false)}
      />
    </>
  );
}

export default Nav;
