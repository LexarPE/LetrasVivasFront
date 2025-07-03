import { useEffect, useState } from "react";
import { librosUsuario } from "../services/libroService";
import Nav from "../components/nav/Nav";
import HeaderSeccion from "../components/HeaderSeccion";
import CardLibro from "../components/catalogolibros/CardLibro";

export default function Pedidos() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Puedes usar esto si estás llamando a una API
    // librosUsuario().then(setLibros);

    // Datos simulados para probar
    setLibros([
      {
        id: 2,
        titulo: "El gran libro juego del espacio",
        imagen: "/portadas/espacio.jpg",
        precio: 15.00
      },
      {
        id: 3,
        titulo: "Feast",
        imagen: "/portadas/feast.jpg",
        precio: 43.0
      },
    ]);

  }, []);
  
  function ejecutar(id){
    console.log(id)
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "20px" }}>
        <HeaderSeccion size={"14px"} titulo={"BIBLIOTECA"} />
        <div className="w-full flex flex-wrap py-4 gap-6">
          {libros.map((libro, i) => (
            <div key={i} className="relative group">
              <CardLibro libro={libro} onClick={ejecutar} />
              {/* Contenido que aparece al hacer hover */}
              <div className="absolute inset-0 bg-[#0B357F] opacity-0 group-hover:opacity-95 transition-all z-10 flex justify-center items-center rounded">
                {/* Puedes poner texto, botones, etc. aquí */}
                <p className="font-bold text-white">Leer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
