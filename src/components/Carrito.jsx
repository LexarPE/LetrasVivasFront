import { ShoppingCart, CircleX } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/Context";


export default function Carrito({ verificacion }) {
  const [openCarrito, setOpenCarrito] = useState(false);
  const carritoContext = useContext(CarritoContext);

  useEffect(() => {
    carritoContext.cargarCarrito();
  }, []);

  function carritoOpen() {
    setOpenCarrito(true);
  }

  function carritoClose() {
    setOpenCarrito(false);
  }

  return (
    verificacion && (
      <div className="w-full min-h-screen fixed z-50 bg-transparent pointer-events-none">
        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 pointer-events-auto">
          {/* Icono flotante */}
          <span className="relative bg-[#1E2530] p-3 rounded-full hover:scale-105 active:scale-100 hover:bg-[#1d232d] cursor-pointer pointer-events-auto">
            {!openCarrito ? (
              <span onClick={carritoOpen}>
                <span className="absolute left-[-5px] top-[-20px] text-xl font-semibold">
                  {carritoContext.cantidad}
                </span>
                <ShoppingCart size={"33px"} color="#fff" />
              </span>
            ) : (
              <span onClick={carritoClose}>
                <CircleX size={"33px"} color="#fff" />
              </span>
            )}
          </span>

          {/* Ventana del carrito */}
          {openCarrito && (
            <div className="w-[300px] max-h-[80vh] overflow-auto bg-white shadow-lg rounded-lg p-4">
              <p className="font-bold text-lg mb-2">Carrito</p>
              <div className="flex flex-col gap-2">
                {carritoContext.libros?.length > 0 ? (
                  carritoContext.libros.map((l, i) => (
                    <div key={i} className="text-sm border p-2 rounded">
                      <h6>{l.titulo || "Sin título"}</h6>
                      <div>
                        <span>P. Sin IGV:{l.precioSinIGV}</span>
                        <span>Precio:{l.precio}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Carrito vacío</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
