import { useContext, useState } from "react";
import BtnGeneral from "../BotonGeneral";
import Star from "../IconosReact/Star";
import Compartir from "../IconosReact/Compartir";
import Favorito from "../IconosReact/Favorito";
import { CarritoContext } from "../../context/CarritoContext";
import Nav from "../nav/Nav";

export default function Vista({
  libro: { id, urlLibro, titulo, stars, descripcion, precio, url_portada },
}) {
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
            <Star key={i} open={i < stars} />
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
              <Favorito />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
