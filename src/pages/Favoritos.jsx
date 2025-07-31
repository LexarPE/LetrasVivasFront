import { useState, useEffect, useContext } from "react";
import { AuthContext, LibroContext } from "../context/Context";
import LibroFav from "../components/LibroFav";
import Nav from "../components/Nav";
export default function Favoritos() {
  const libroContext = useContext(LibroContext);
  const [idUser, setIdUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const authContext = useContext(AuthContext)

  useEffect(() => {
    const sesion = sessionStorage.getItem("sesion");
    if (sesion) {
      const { id } = JSON.parse(sesion);
      setIdUser(id);
    }
    authContext.validarToken();
  }, []);

  useEffect(() => {
    if (idUser) {
      const libsFav = async () => {
        const libs = await libroContext.favoritosUsuario(idUser);
        setFavoritos(libs || []);
      };
      libsFav();
    }
  }, [idUser]);

  return (
    <div>
      <Nav />
      <div className="flex justify-center flex-wrap gap-3 py-2 px-4">
        {favoritos.length > 0 ? (
          favoritos.map((lf, i) => (
            <LibroFav libro={lf.libro ? lf.libro : lf} key={i} />
          ))
        ) : (
          <div className="text-3xl">Cargando favoritos....</div>
        )}
      </div>
    </div>
  );
}
