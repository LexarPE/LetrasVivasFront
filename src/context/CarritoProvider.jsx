import { CarritoContext } from "./Context";
import {
  obtenerCarrito,
  agregarLibroCarrito
} from "../services/carritoService";
import { useEffect, useState } from "react";

export default function CarritoProvider({ children }) {
  const [cantidad, setCantidad] = useState(0);
  const [libros,setLibros] = useState([])
  const [subTotal,setSubtotal] = useState("0.00")
  const [igv,setIgv] = useState("0.00")
  const [total,setTotal] = useState("0.00")
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const sesion = sessionStorage.getItem("sesion");
    if (sesion) {
      const id = JSON.parse(sesion)?.id;
      setIdUser(id);
    }
  }, []);

  async function agregarLibro(idLibro) {
    agregarLibroCarrito(idUser,idLibro)
  }

  async function cargarCarrito() {
    if (!idUser) return;
    const productos = await obtenerCarrito(idUser);
    setCantidad(productos?.resumen?.cantidad || 0);
    setLibros(productos?.libros || [])
    setSubtotal(productos?.resumen?.subtotal || "0.00")
    setIgv(productos?.resumen?.igv || "0.00")
    setTotal(productos?.resumen?.total || "0.00")
  }

  return (
    <CarritoContext.Provider
      value={{
        cargarCarrito,
        cantidad,
        libros,
        subTotal,
        igv,
        total,
        agregarLibro,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
