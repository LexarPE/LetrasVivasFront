import { useState, useEffect, useContext } from "react";
import { AuthContext, LibroContext } from "../context/Context";
import Nav from "../components/Nav";
import LibroBibli from "../components/LibroBibli";

export default function Biblioteca() {
  const libroContext = useContext(LibroContext);
  const [biblioteca, setBiblioteca] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.validarToken();
    const dataBiblioteca = async () => {
      const dB = await libroContext.bibliotecaUsuario();
      setBiblioteca(dB || []);
    };
    dataBiblioteca();
  }, [libroContext.bibliotecaUsuario]);

  return (
    <div>
      <Nav />
      <div className="flex justify-center flex-wrap gap-3 py-2 px-4">
        {biblioteca.length > 0 ? (
          biblioteca.map((lf, i) => (
            <LibroBibli libro={lf.libro ? lf.libro : lf} key={i} />
          ))
        ) : (
          <div className="text-3xl">Cargando biblioteca....</div>
        )}
      </div>
    </div>
  );
}
