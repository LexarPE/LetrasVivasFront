// 8.



import { createContext, useState, useEffect } from "react";
import {
  obtenerLibros,
  obtenerLibroPorId,
  buscarLibro,
  guardarLibro,
  librosUsuario,
  favoritosUsuario,
  librosMasVendidos,
} from "../services/libroService"; 

export const LibrosContext = createContext();


export const LibrosProvider = ({ children }) => {
  // COMENTAR
  const books = [
    {
      id: 1,
      titulo: "El gran libro juego del espacio",
      autor: "subi",
      precio: 80,
      imagen: "/libros/espacio.webp",
    },
    {
      id: 2,
      titulo: "El gran libro juego de las civilizaciones",
      autor: "subi",
      precio: 80,
      imagen: "/libros/civ.jpg",
    },
    {
      id: 3,
      titulo: "Escapando de la mansión embrujada",
      autor: "Unzu,Iker",
      precio: 80,
      imagen: "/libros/mansion.jpg",
    },
    {
      id: 4,
      titulo: "Feast",
      autor: "León, Pía;Martínez, Malena y Siles, Melissa",
      precio: 80,
      imagen: "/libros/feast.jpg",
    },
    {
      id: 5,
      titulo: "Epic History of the Incas",
      autor: "A.A. V.V.",
      precio: 80,
      imagen: "/libros/incas.jpg",
    },
    {
      id: 6,
      titulo: "Todo está j*dido",
      autor: "Mark Manson",
      precio: 80,
      imagen: "/libros/todo2.jpg",
    },
  ];

  const [libros, setLibros] = useState([]);
  const [masvendidosLibros, setMasVendidosLibros] = useState([]);

  // Cargar los libros y los más vendidos al iniciar el contexto
  useEffect(() => {
    // Descomentar cuanto tenga conexion al back

    // let Datalibros = obtenerLibros();
    // let DatalibrosMasVendidos = librosMasVendidos();
    // setLibros(Datalibros);
    // setMasVendidosLibros(DatalibrosMasVendidos);

    // Comentar 
    setLibros(books);
    setMasVendidosLibros(books)
  }, []);
  
  const libroPorId = async (id) => {
    //Descomentar cunado tenga conexion al back
    // let libroObtenido = await obtenerLibroPorId(id);
    // return libroObtenido;

    //Pruebas sin back
    let mostrarBooks = books.filter((obj)=> obj.id == id)
    return mostrarBooks[0]
  };



  return (
    <LibrosContext.Provider value={{ libros, masvendidosLibros, libroPorId}}>
      {children}
    </LibrosContext.Provider>
  );
};
