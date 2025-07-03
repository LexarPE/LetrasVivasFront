// 8.


import { createContext, useState, useEffect, useContext } from "react";

export const LibrosContext = createContext();

const books = [
  {
    id: 1,
    titulo: "El gran libro juego del espacio",
    autor: "subi",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/597531f9de47f5e5225ef01cbe4bbd93/9/7/9788419898272_jg6wgxetqtw0rbjd.jpg",
  },
  {
    id: 2,
    titulo: "El gran libro juego de las civilizaciones",
    autor: "subi",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9788417210816_ntvpce08rkmjfs6h.jpg",
  },
  {
    id: 3,
    titulo: "Escapando de la mansión embrujada",
    autor: "Unzu,Iker",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9786287583405_zhqofxpsd30xinkn.jpg",
  },
  {
    id: 4,
    titulo: "Feast",
    autor: "León, Pía;Martínez, Malena y Siles, Melissa",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/597531f9de47f5e5225ef01cbe4bbd93/9/7/9786124450570_5emnitrncv0xndaz.jpg",
  },
  {
    id: 5,
    titulo: "Epic History of the Incas",
    autor: "A.A. V.V.",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9786124450617_25hlzc6o3fnkallw.jpg",
  },
  {
    id: 6,
    titulo: "Todo está j*dido",
    autor: "Mark Manson",
    precio: 80,
    imagen: "https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/e/a/ea9788417968298_ravljngogax4onof.jpg",
  },
];

export const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [masvendidosLibros, setMasVendidosLibros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    setLibros(books);
    setMasVendidosLibros(books);
  }, []);

  const libroPorId = async (id) => {
    let mostrarBooks = books.filter((obj) => obj.id === id);
    return mostrarBooks[0];
  };

  const toggleFavorito = (idLibro) => {
    setFavoritos((prevFavoritos) => {
      const existe = prevFavoritos.some((libro) => libro.id === idLibro);
      if (existe) {
        return prevFavoritos.filter((libro) => libro.id !== idLibro);
      } else {
        const libro = libros.find((libro) => libro.id === idLibro);
        return libro ? [...prevFavoritos, libro] : prevFavoritos;
      }
    });
  };

  return (
    <LibrosContext.Provider
      value={{
        libros,
        masvendidosLibros,
        libroPorId,
        favoritos,
        toggleFavorito,
      }}
    >
      {children}
    </LibrosContext.Provider>
  );
};


export const useLibros = () => useContext(LibrosContext);
