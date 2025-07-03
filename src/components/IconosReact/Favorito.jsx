import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLibros } from "../../context/LIbrosContext";

export default function Favorito({ idLibro }) {
  const { favoritos, toggleFavorito } = useLibros();

  const esFavorito = favoritos.some((libro) => libro.id === idLibro);

  return (
    <button
      onClick={() => toggleFavorito(idLibro)}
      title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.4rem",
      }}
    >
      {esFavorito ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
}
