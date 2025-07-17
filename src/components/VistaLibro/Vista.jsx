import { useContext, useState, useEffect } from "react";
import BtnGeneral from "../BotonGeneral";
import Star from "../IconosReact/Star";
import Compartir from "../IconosReact/Compartir";
import Favorito from "../IconosReact/Favorito";
import { CarritoContext } from "../../context/CarritoContext";
import Nav from "../nav/Nav";
import { favoritosUsuario } from "../../services/libroService";

export default function Vista({
  stars,
  libro: { id, urlLibro, titulo, descripcion, precio, url_portada }
}) {
  const [idFavLibs, setIdFavLibs] = useState(0);
  useEffect(() => {
    const reqLibFavUser = async () => {
      try {
        const IdLibsFavs = await favoritosUsuario();
        const esFavorito = IdLibsFavs.some((item) => item.libro.id === id);
        if (esFavorito) {
          setIdFavLibs([id]); // solo guarda el id actual si es favorito
        } else {
          setIdFavLibs([null]); // si no es favorito, deja vacío
        }
      } catch (error) {
        console.error("Error al obtener libros favoritos:", error);
      }
    };
    reqLibFavUser();
  }, [id]);

  function obtenerMayorCalificacion() {
    if (!Array.isArray(stars) || stars.length === 0) return 0;

    const calificaciones = stars.map((item) => item.calificacion || 0);
    return Math.max(...calificaciones);
  }


  const { agregarAlCarrito } = useContext(CarritoContext);

  const [alertaVisible, setAlertaVisible] = useState(false); // 🔔 estado para alerta

  function addBook() {
    agregarAlCarrito({
      id,
      urlLibro,
      url_portada,
      titulo,
      stars,
      descripcion,
      precio,
    });

    // ✅ Mostrar alerta por 2.5 segundos
    setAlertaVisible(true);
    setTimeout(() => setAlertaVisible(false), 2500);
  }

  return (
    <div className="flex flex-col md:grid grid-cols-2 pt-[68px]" key={id}>
      <div className="absolute top-0 w-full">
        <Nav />
      </div>

      {/* ✅ Alerta flotante */}
      {alertaVisible && (
        <div className="fixed top-[80px] right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          Producto agregado al carrito ✅
        </div>
      )}

      <div className="flex justify-center py-3">
        <img
          src={`${url_portada}`}
          alt="imagen_de_libro"
          className="max-h-[500px] object-contain"
        />
      </div>

      <div className="px-2 py-2 md:py-10">
        <h2 className="text-3xl md:text-4xl">{titulo}</h2>
        <div className="py-2 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} open={i < obtenerMayorCalificacion()} />
          ))}
        </div>
        <p className="pb-2 pr-4 text-[13px] max-h-[300px] overflow-y-auto">
          {descripcion}
        </p>
        <div className="flex flex-col pb-3">
          <p className="text-[20px] md:text-[22px] font-medium">S/.{precio}</p>
        </div>

        <div className="flex gap-2.5 md:block">
          <span>
            <BtnGeneral
              content={"AGREGAR AL CARRITO"}
              textZ={"13px"}
              eFuncion={addBook}
            />
          </span>
          <div className="flex gap-1 py-0.5">
            <span>
              <Compartir />
            </span>
            <span>
              {localStorage.getItem("token")?.length > 100 && (
                <Favorito
                  libro={{
                    id,
                    urlLibro,
                    titulo,
                    stars,
                    descripcion,
                    precio,
                    url_portada,
                  }}
                  idfav={idFavLibs}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
