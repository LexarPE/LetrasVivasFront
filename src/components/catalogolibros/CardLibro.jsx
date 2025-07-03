import "./CatalogoLibros.css";
import Favorito from "../IconosReact/Favorito";

export default function CardLibro({ libro, onClick, mostrarLeer = false }) {
  return (
    <div
      className={`libro-card ${mostrarLeer ? "favorito-card" : ""}`}
      id={libro.id}
      onClick={() => onClick(libro.id)}
    >
      <div className="imagen-con-hover">
        <img src={libro.imagen} alt={libro.titulo} />

        {/* Ícono de favorito */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Favorito idLibro={libro.id} />
        </div>

        {/* Overlay "Leer" */}
        {mostrarLeer && <div className="overlay-leer">Leer</div>}
      </div>

      <p className="titulo">{libro.titulo}</p>
      <p className="autor">{libro.autor}</p>

      {/* Mostrar precio si NO estamos en favoritos */}
      {!mostrarLeer && (
        <p className="precio">S/ {libro.precio.toFixed(2)}</p>
      )}
    </div>
  );
}
