import { createContext, useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import {
  guardarCarrito,
  guardarCarritoLocal,
  obtenerCarrito,
  obtenerCarritoLocal,
} from "../services/carritoService";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { usuario } = useContext(UserContext);

  const estaLogueado = !!usuario;
  const carritoInicializado = useRef(false);

  // ✅ Al cargar la página, cargar desde localStorage a sessionStorage
  useEffect(() => {
    const cargarCarrito = async () => {
      if (estaLogueado) {
        const datos = await obtenerCarrito();
        if (datos) {
          setCarrito(datos);
          sessionStorage.setItem("carrito", JSON.stringify(datos));
        }
      } else {
        const local = localStorage.getItem("carrito");
        if (local) {
          sessionStorage.setItem("carrito", local);
          setCarrito(JSON.parse(local));
        }
      }

      carritoInicializado.current = true;
    };

    cargarCarrito();
  }, [estaLogueado]);

  // ✅ Cada vez que cambia el carrito, actualizar el sessionStorage
  useEffect(() => {
    if (!carritoInicializado.current) return;

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    const guardar = async () => {
      if (estaLogueado) {
        await guardarCarrito(carrito);
      } else {
        if (carrito.length === 0) {
          localStorage.removeItem("carrito");
        } else {
          await guardarCarritoLocal(carrito);
        }
      }
    };

    guardar();
  }, [carrito, estaLogueado]);

  // ✅ Al cerrar o recargar, guardar el carrito desde sessionStorage a localStorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      const data = sessionStorage.getItem("carrito");
      if (data) {
        localStorage.setItem("carrito", data);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ✅ Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: 1 } : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
