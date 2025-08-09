import { ShoppingCart, CircleX, Trash2 } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { CarritoContext, AuthContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Carrito({ verificacion, idUser }) {
  const [openCarrito, setOpenCarrito] = useState(false);
  const carritoContext = useContext(CarritoContext);
  // const authContext = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    carritoContext.cargarCarrito(idUser);
  }, [idUser]);

  const toggleCarrito = () => setOpenCarrito((prev) => !prev);

  const irAPagar = () => navigate("/pagar");
  if (!verificacion) return null;

  const quitarCarrito = (idLibroCar) => {
    if (!idUser) return;
    carritoContext.deleteLibroCarrito(idLibroCar);
  };

  return (
    <div className="w-full min-h-screen fixed z-50 bg-transparent pointer-events-none">
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Botón flotante del carrito */}
        <button
          onClick={toggleCarrito}
          className="relative bg-[#1E2530] p-3 rounded-full hover:scale-105 active:scale-100 hover:bg-[#1d232d] cursor-pointer"
        >
          {openCarrito ? (
            <CircleX size={33} color="#fff" />
          ) : (
            <>
              <span className="absolute -top-3 -left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {carritoContext.cantidad}
              </span>
              <ShoppingCart size={33} color="#fff" />
            </>
          )}
        </button>

        {/* Panel del carrito */}
        {openCarrito && (
          <div className="w-[320px] max-h-[80vh] overflow-auto bg-white shadow-xl rounded-xl p-4 border border-gray-200">
            <h2 className="font-bold text-lg mb-3 border-b pb-2">
              🛒 Tu Carrito
            </h2>

            {/* Lista de libros */}
            <div className="flex flex-col gap-3">
              {carritoContext.libros?.length > 0 ? (
                carritoContext.libros.map((l) => (
                  <div
                    key={l.id}
                    className=" relative border rounded-md p-3 shadow-sm flex flex-col gap-1 text-sm"
                  >
                    <h6 className="font-semibold">
                      {l.titulo || "Sin título"}
                    </h6>
                    <span>Precio: S/. {l.precioSinIGV}</span>
                    <span>Precio + IGV: S/. {l.precio}</span>
                    <span
                      className="absolute right-2 hover:scale-105 cursor-pointer"
                      onClick={() => quitarCarrito(l.id)}
                    >
                      <Trash2 color="#f04" />
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  Tu carrito está vacío
                </p>
              )}
            </div>

            {/* Total y botón pagar */}
            {carritoContext.libros?.length > 0 && (
              <div className="mt-4 border-t pt-3">
                <p className="flex justify-between text-lg font-semibold mb-2">
                  <span>Total:</span>
                  <span>S/. {carritoContext.total}</span>
                </p>
                <button
                  className="w-full bg-black text-white py-2 rounded-md text-lg hover:bg-gray-800 transition-all"
                  onClick={irAPagar}
                >
                  💳 Pagar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
