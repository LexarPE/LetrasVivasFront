import { useLibros } from "../context/LIbrosContext";
import CardLibro from "../components/catalogolibros/CardLibro";
import "../components/catalogolibros/CatalogoLibros.css";

export default function FavoritosPage() {
  const { favoritos } = useLibros();

  const handleClickLibro = (id) => {
    console.log("Clic en libro con ID:", id);
    // Se podria hacer navegación a detalle
  };

  if (favoritos.length === 0) {
    return <p style={{ padding: "1rem" }}>No tienes libros en favoritos aún.</p>;
  }

  return (
    <div className="catalogo-container">
      <h2>Mis Libros Favoritos</h2>
      <div className="catalogo-grid">
        {favoritos.map((libro) => (
          <CardLibro
            key={libro.id}
            libro={libro}
            onClick={handleClickLibro}
            mostrarLeer={true}
            mostrarPrecio={false} // Activa el efecto Leer
          />
        ))}
      </div>
    </div>
  );
}
