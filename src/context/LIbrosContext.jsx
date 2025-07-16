// 8.

import { createContext, useState, useEffect } from "react";
import {
  obtenerLibros,
  obtenerLibroPorId,
  agregarFavorito,
  librosUsuario,
  favoritosUsuario,
  librosMasVendidos,
} from "../services/libroService";

export const LibrosContext = createContext();

export const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [masvendidosLibros, setMasVendidosLibros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar los libros y los más vendidos al iniciar el contexto
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Llama a la función que retorna la promesa
        const Datalibros = await obtenerLibros();
        setLibros(Datalibros);

        const DatalibrosMasVendidos = await obtenerLibros();
        setMasVendidosLibros(DatalibrosMasVendidos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const libroPorId = async (id) => {
    // Descomentar cunado tenga conexion al back

    try {
      // Llama a la función que retorna la promesa
      const libroObtenido = await obtenerLibroPorId(id);
      return libroObtenido;
    } catch (error) {
      console.error("Error al obtener libro:", error);
    }
  };

  const addFavorito = async (idUser,objetoLibro) => {
    if (!favoritos.some((obj) => obj.id === objetoLibro.id)) {
      const result = await agregarFavorito(idUser,objetoLibro.id);
      setFavoritos([...favoritos, objetoLibro]);
      if(result == true) return true
      return false
    }
    return true
  };

  const datosLocales = JSON.parse(localStorage.getItem("favoritos")) || [];
  const datosSesion = JSON.parse(sessionStorage.getItem("favoritos")) || [];

  // Combinar sin duplicados (basado en el ID del libro)
  const combinadosSinDuplicados = [
    ...datosLocales,
    ...datosSesion.filter(
      (libroSesion) =>
        !datosLocales.some((libroLocal) => libroLocal.id === libroSesion.id)
    ),
    ...favoritos.filter(
      (libroFavorito) =>
        !datosLocales.some(
          (libroLocal) => libroLocal.id === libroFavorito.id
        ) &&
        !datosSesion.some((libroSesion) => libroSesion.id === libroFavorito.id)
    ),
  ];
  

  // Guardar en localStorage correctamente (en formato JSON)
  localStorage.setItem("favoritos", JSON.stringify(combinadosSinDuplicados));
  

  return (
    <LibrosContext.Provider
      value={{ libros, masvendidosLibros, libroPorId, favoritos, addFavorito }}
    >
      {children}
    </LibrosContext.Provider>
  );
};
