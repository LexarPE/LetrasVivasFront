import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Vista from "../components/VistaLibro/vista";
import CardComentarios from "../components/Comentarios/CardComentarios";

import { LibrosContext } from "../context/LIbrosContext";

export default function DetalleLibro() {
  // Eliminar este objeto y usar el contexto para obtener el libro
  // const books = {
  //   id: 3,
  //   urlLibro: "/libros/todo2.jpg",
  //   titulo: "Todo está j*dido",
  //   stars: 3,
  //   descripcion:
  //     "Un libro que explora la filosofía de la vida moderna y cómo encontrar sentido en un mundo caótico.",
  //   precio: "80.00",
  //   stock: 10,
  // };

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
  }, [libroPorId, id, libro]);

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
