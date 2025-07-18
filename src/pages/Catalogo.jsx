import Nav from "../components/nav/Nav";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LibrosContext } from "../context/LIbrosContext";
import CardLibro from "../components/catalogolibros/CardLibro";
import SidebarCategorias from "../components/SidebarCategorias";

export default function Catalogo() {
  const navigate = useNavigate();
  const { libros, setLib, libCat } = useContext(LibrosContext);

  const cargarFiltro = (nomCat) => {
    const filtrados =
      nomCat == null ? libros : libros.filter((i) => i.categoria === nomCat);
    setLib(filtrados);
  };

  return (
    <div className="h-screen">
      <Nav />
      <div className="relative grid grid-cols-[1fr_max-content] h-full">
        <div className="flex justify-center flex-wrap gap-3 px-4 pt-4 overflow-auto">
          {libCat.map((libro, i) => (
            <CardLibro
              key={i}
              libro={libro}
              onClick={(id) => navigate(`/libros/${id}`)}
            />
          ))}
        </div>
        <SidebarCategorias c={cargarFiltro} />
      </div>
    </div>
  );
}
