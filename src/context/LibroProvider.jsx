import { useState, useEffect } from "react";
import { LibroContext } from "./Context";
import {
  obtenerLibros,
  agregarFavorito,
  favoritosUsuario,
  librosUsuario,
  libroPorId
} from "../services/libroService";
import {
  agregarComentario,
  agregarCalificacion,
} from "../services/comentarioService";
export default function LibroProvider({ children }) {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    cargarLibros();
  }, []);

  async function cargarLibros() {
    const libs = await obtenerLibros();
    setLibros(libs);
  }

  function obtenerlibros() {
    return libros;
  }

  async function libroId(id) {
    const libs = await obtenerLibros();
    const lib = libs.filter((l) => {
      return l.id == id;
    });
    return lib[0];
  }

  async function libroBiblioteId(id) {
    const libs = await libroPorId(id);
    return libs;
  }

  async function bibliotecaUsuario() {
    const bU = await librosUsuario();
    return bU
  }
  // async function obtenerAutor(id) {
  //   return ""
  // }

  return (
    <LibroContext.Provider
      value={{
        obtenerlibros,
        libroId,
        agregarComentario,
        agregarCalificacion,
        agregarFavorito,
        favoritosUsuario,
        bibliotecaUsuario,
        libroBiblioteId,
      }}
    >
      {children}
    </LibroContext.Provider>
  );
}
