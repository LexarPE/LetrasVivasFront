import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Vista from "../components/VistaLibro/Vista";
import CardComentarios from "../components/Comentarios/CardComentarios";

import { LibrosContext } from "../context/LIbrosContext";

export default function DetalleLibro() {

  const { id } = useParams();
  const [libro, setLibro] = useState({});

  const { libroPorId } = useContext(LibrosContext);

  useEffect(() => {
    // Extrae el libro por id del contexto
    let getLibro = async () => {
      const libroObtenido = await libroPorId(id);
      setLibro(libroObtenido || {});
    };
    getLibro()
    // Guarda el libro obtenido en el estado
  }, [id,libroPorId]);
  if (libro.id == null) {
    return <p className="text-3xl text-center">Cargando...</p>;
  }

  return (
    <>
      {/*  urlLibro, titulo, stars, descripcion, precio, stock */}
      {/* Quitar books y colocar libro */}
      <Vista libro={libro} />
      {/* nombre, comentario */}
      <CardComentarios Comentarios={[]} />
    </>
  );
}
