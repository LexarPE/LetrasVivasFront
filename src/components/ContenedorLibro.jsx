import { HeartPlus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CarritoContext, LibroContext } from "../context/Context";

export default function Libro({ libro, auth }) {
  const { favoritosUsuario, agregarFavorito } = useContext(LibroContext);
  const { agregarLibro } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [color, setColor] = useState(false);
  const [verificarLog, setVerificarLog] = useState(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      const sesion = sessionStorage.getItem("sesion");
      if (!sesion) {
        setColor(false);
        setVerificarLog(false);
        return;
      }
      const idUser = JSON.parse(sesion).id;
      const favoritos = await favoritosUsuario(idUser);
      const yaExiste = favoritos?.some((f) => f.libro.id === libro.id);
      setColor(!!yaExiste);
      setVerificarLog(true);
    };

    if (auth) verificarFavorito();
  }, [auth, libro.id, favoritosUsuario]);

  const irDetalle = () => navigate(`/libro/${libro.id}`);

  const agregarFav = async (e) => {
    e.stopPropagation();
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) return;

    const idUser = JSON.parse(sesion).id;
    const idL = libro.id;

    setColor(true);

    const favoritos = await favoritosUsuario(idUser);
    const yaExiste = favoritos?.some((f) => f.libro.id === idL);

    const favs = JSON.parse(sessionStorage.getItem("favs")) || [];
    const nuevosFavs = favs.filter((f) => f.id !== idL);
    sessionStorage.setItem("favs", JSON.stringify([...nuevosFavs, libro]));

    if (!yaExiste) agregarFavorito(idUser, idL);
  };

  const agregarAlCarrito = (e) => {
    e.stopPropagation();
    agregarLibro(libro.id);
  };

  return (
    <div
      className="flex flex-col items-center min-w-[130px] max-w-[200px] relative"
      onClick={irDetalle}
    >
      <img
        src={libro.url_portada}
        alt="Imagen de libro"
        className="w-full h-[260px] sm:h-[280px] object-cover rounded-xl"
      />
      <div className="group absolute hover:bg-[#1E2630] w-full h-[260px] sm:h-[280px] rounded-xl opacity-70 flex items-center cursor-pointer transition-all select-none">
        <h6 className="invisible w-full text-center group-hover:visible text-white">
          Ver detalles
        </h6>
        <div className="w-full absolute invisible group-hover:visible bottom-3 left-3 flex flex-col gap-2">
          {auth && verificarLog && (
            <span className="w-max" onClick={agregarFav}>
              <HeartPlus
                color={color ? "#e42f2f" : "#fff"}
                className="cursor-pointer hover:scale-110 transition-transform"
                strokeWidth="2.75px"
              />
            </span>
          )}
          {auth && (
            <span className="w-max" onClick={agregarAlCarrito}>
              <ShoppingCart
                color="#fff"
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </span>
          )}
        </div>
      </div>
      <div className="w-full px-2">
        <h5 className="font-bold py-1 truncate">{libro.titulo}</h5>
        <h5 className="truncate">{libro.autor}</h5>
        <span className="font-bold py-1">S/.{libro.precio}</span>
      </div>
    </div>
  );
}
