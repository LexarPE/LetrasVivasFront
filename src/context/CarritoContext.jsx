// 9.



import { createContext, useState, useEffect, useContext} from "react";

import { UserContext } from "./UserContext";

import {
  guardarCarrito,
  guardarCarritoLocal,
  obtenerCarrito,
  obtenerCarritoLocal
} from "../services/carritoService";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const { usuario } = useContext(UserContext);

  // Verificar si el usuario tiene una cuenta ("token")
  const estaLogueado = !!usuario;

  // Cargar carrito al iniciar
  useEffect(() => {
    if (estaLogueado) {
      setCarrito(async()=> await obtenerCarrito());
    } else {
      const local = obtenerCarritoLocal();
      if (local) setCarrito(local);
    }
  }, [estaLogueado]);

  // Guardar carrito cada vez que cambia
  useEffect(() => {
    if (carrito.length === 0) return;
    if (estaLogueado) {
      async () => await guardarCarrito(carrito);
    } else {
      async () => await guardarCarritoLocal(carrito);
    }
  }, [carrito, estaLogueado]);


  // Funciones para manejar el carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
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
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
