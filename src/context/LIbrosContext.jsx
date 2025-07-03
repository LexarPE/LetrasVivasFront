// 8.



import { createContext, useState, useEffect } from "react";
import {
  obtenerLibros,
  obtenerLibroPorId,
  guardarLibro,
  librosUsuario,
  favoritosUsuario,
  librosMasVendidos,
} from "../services/libroService"; 

export const LibrosContext = createContext();


export const LibrosProvider = ({ children }) => {


  const [libros, setLibros] = useState([]);
  const [masvendidosLibros, setMasVendidosLibros] = useState([]);

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


  return (
    <LibrosContext.Provider value={{ libros, masvendidosLibros, libroPorId}}>
      {children}
    </LibrosContext.Provider>
  );
};
