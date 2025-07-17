import Nav from "../components/nav/Nav";
import CardLibro from "../components/catalogolibros/CardLibro";
import { useState, useEffect } from "react";
import { favoritosUsuario } from "../services/libroService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Favoritos() {
  const [favsUser, setFavUser] = useState([]);

  useEffect(() => {
    async function reqFavoritosUser() {
      try {
        const dtFavUser = await favoritosUsuario();
        setFavUser(dtFavUser);
      } catch{
        toast.error("Error en la carga de los libros favoritos")
      }
    }
    reqFavoritosUser();
  }, []); 

  const navigate = useNavigate();
  const irADetalle = (id) => {
    // En el index de la carpeta router se define a donde redirigir
    navigate(`/libros/${id}`);
  };

  return (
    <>
      <Nav />
      <div className="flex flex-wrap gap-1.5 py-2 px-3 justify-center sm:justify-start">
        {favsUser.map((libroFav) => (
          <CardLibro
            key={libroFav.id}
            libro={libroFav.libro}
            onClick={irADetalle}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
