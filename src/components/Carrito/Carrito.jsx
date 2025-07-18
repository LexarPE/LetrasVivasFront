import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";

export default function Carrito({ visible, onClose }) {
  const { carrito, quitarDelCarrito, vaciarCarrito } =
    useContext(CarritoContext);
  const { usuario } = useContext(UserContext);

  if (!visible) return null;

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * (item.cantidad || 1),
    0
  );

  const pagar = () => {
    alert("Gracias por tu compra 🎉");
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#0B357F] text-white rounded-tr-xl">
        <h3 className="text-lg font-bold">🛒 Tu Carrito</h3>
        <button
          onClick={onClose}
          className="text-white text-xl hover:text-gray-200"
        >
          ✖
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {carrito.length === 0 ? (
          <p className="text-gray-600 text-center mt-6">
            Tu carrito está vacío.
          </p>
        ) : (
          <ul className="space-y-4">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start bg-gray-50 p-3 rounded shadow-sm"
              >
                <div>
                  <p className="font-medium text-sm">
                    x{item.cantidad || 1} {item.titulo}
                  </p>
                  <p className="text-xs text-gray-500">s/.{item.precio}</p>
                </div>
                <button
                  onClick={() => quitarDelCarrito(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {carrito.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <p className="text-right font-semibold text-gray-800 mb-2">
            Total: <span className="text-blue-700">s/.{total.toFixed(2)}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={vaciarCarrito}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
            >
              Vaciar
            </button>
            {localStorage.getItem("token") && (
              <button
                onClick={pagar}
                className="flex-1 bg-[#0B357F] hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
              >
                Pagar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
