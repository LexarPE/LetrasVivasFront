import Nav from "../components/nav/Nav";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LibrosContext } from "../context/LIbrosContext";
import CardLibro from "../components/catalogolibros/CardLibro";

export default function Catalogo() {
  const navigate = useNavigate();
  const {libros} = useContext(LibrosContext)
  return <>
  <Nav/>
  <div className="flex flex-wrap gap-3 px-4 pt-4">
    {
      libros.map((libro, i)=>{
        return (
          <CardLibro
            libro={libro}
            onClick={(id) => navigate(`/libros/${id}`)}
            key={i}
          />
        );
      })
    }
  </div>
  </>;
}
