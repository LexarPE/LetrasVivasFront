import Banner from "../components/Banner";
import ContainerBookHome from "../components/ContenedorLibrosInicio";
import Nav from "../components/Nav";
import Carrito from "../components/Carrito";
import { useContext, useEffect, useState } from "react";
import { LibroContext,AuthContext } from "../context/Context";

export default function Home() {
  const authContext = useContext(AuthContext)
  const { obtenerlibros } = useContext(LibroContext);
  const [validacion, setValidacion] = useState(false)
  let libros = obtenerlibros();

  useEffect(() => {
    setValidacion(authContext.validarToken());
  }, [authContext]);
  return (
    <div className="bg-gray-100 pb-5 min-h-screen">
      <Carrito verificacion={validacion} idUser={authContext.id} />
      <Nav />
      <Banner />
      <ContainerBookHome
        title={"Recomendaciones:"}
        books={libros}
        autores={[]}
        limite={true}
        verificacion={validacion}
      />
    </div>
  );
}
