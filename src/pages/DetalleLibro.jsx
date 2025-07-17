import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Vista from "../components/VistaLibro/Vista";
import CardComentarios from "../components/Comentarios/CardComentarios";

import { LibrosContext } from "../context/LIbrosContext";

export default function DetalleLibro() {

  const { id } = useParams();
  const [libro, setLibro] = useState({});
  const [resenas, setResenas] = useState([])
  const [comentarios, setComentarios] = useState([])

  const { libroPorId } = useContext(LibrosContext);

  useEffect(() => {
    // Extrae el libro por id del contexto
    let getLibro = async () => {
      const libroObtenido = await libroPorId(id);
      setLibro(libroObtenido[0] || {});
      setResenas(libroObtenido[1])
      setComentarios(libroObtenido[2])
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
      <Vista libro={libro} stars={resenas} />
      {/* nombre, comentario */}
      <CardComentarios Comentarios={comentarios} />
    </>
  );
}
