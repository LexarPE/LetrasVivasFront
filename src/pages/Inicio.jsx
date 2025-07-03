
import Nav from "../components/nav/Nav";
import Banner from "../components/Banner/Banner";
import CatalogoLibros from "../components/catalogolibros/CatalogoLibros";

import { useContext} from "react";
import { LibrosContext } from "../context/LIbrosContext";




function Inicio() {
  const { libros, masvendidosLibros } = useContext(LibrosContext);
  
  return (
    <>
      <Nav />
      <Banner />
      <CatalogoLibros libros={libros} masvendidosLibros={masvendidosLibros} />
    </>
  );
}

export default Inicio;
