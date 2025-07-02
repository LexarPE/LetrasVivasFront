import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import "./Carrito.css";

export default function Carrito({ visible, onClose }) {
  const { carrito, quitarDelCarrito, vaciarCarrito } =
    useContext(CarritoContext);
  const { usuario } = useContext(UserContext); // 👈 Saber si está logueado

  if (!visible) return null;

  // ✅ Calcular total
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * (item.cantidad || 1),
    0
  );

  const pagar = () => {
    alert("Gracias por tu compra 🎉");
    // Aquí puedes agregar lógica adicional: redirección, API, etc.
  };

  return (
    <div className="carrito-panel">
      <div className="carrito-header">
        <h3>Tu Carrito</h3>
        <button onClick={onClose} className="cerrar-carrito">
          ✖
        </button>
      </div>

      <div className="carrito-body">
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="mb-2 flex justify-between">
                <span>
                  x{item.cantidad || 1} {item.titulo} (
                  <span>s/.{item.precio}</span>)
                </span>
                <button onClick={() => quitarDelCarrito(item.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {carrito.length > 0 && (
        <div className="carrito-footer">
          <p className="text-right font-semibold mt-2">
            Total: s/.{total.toFixed(2)}
          </p>

          <button
            onClick={vaciarCarrito}
            className="bg-red-500 text-white p-2 rounded mt-2"
          >
            Vaciar Carrito
          </button>

          {localStorage.getItem("token") && (
            <button
              onClick={pagar}
              className="bg-green-600 text-white p-2 rounded mt-2 ml-2"
            >
              Pagar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
