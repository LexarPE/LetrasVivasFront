import "./CatalogoLibros.css";

export default function CardLibro({ libro, onClick}) {
  return (
    <div className="libro-card" id={libro.id} onClick={() => onClick(libro.id)}>
      <img src={libro.url_portada} alt={libro.titulo} />
      <p className="titulo">{libro.titulo}</p>
      <p className="precio">S/ {libro.precio}</p>
    </div>
  );
}
