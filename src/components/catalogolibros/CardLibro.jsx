import "./CatalogoLibros.css";

export default function CardLibro({ libro, onClick}) {
  return (
      <div className="libro-card" id={libro.id} onClick={() => onClick(libro.id)} >
        <img src={libro.imagen} alt={libro.titulo} />
        <p className="titulo">{libro.titulo}</p>
        <p className="precio">S/ {libro.precio.toFixed(2)}</p>
      </div>
  );
}
