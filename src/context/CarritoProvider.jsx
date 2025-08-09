import { CarritoContext } from "./Context";
import {
  obtenerCarrito,
  agregarLibroCarrito,
  pagarCarrito,
  eliminarLibroCarrito,
} from "../services/carritoService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CarritoProvider({ children }) {
  const [cantidad, setCantidad] = useState(0);
  const [libros, setLibros] = useState([]);
  const [subTotal, setSubtotal] = useState("0.00");
  const [igv, setIgv] = useState("0.00");
  const [total, setTotal] = useState("0.00");
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const sesion = sessionStorage.getItem("sesion");
    if (sesion) {
      const id = JSON.parse(sesion)?.id;
      setIdUser(id);
    }
  }, []);

  useEffect(() => {
    if (idUser) cargarCarrito();
  }, [idUser]);

  async function agregarLibro(idLibro) {
    try {
      if (!idUser) return;
      await agregarLibroCarrito(idUser, idLibro);
      cargarCarrito(idUser);
    } catch(e){
      console.log("Ocurrio un error",e)
      toast.error(e.response.data.error)
    }
  }

  async function deleteLibroCarrito(idLibro){
    if(!idUser) return
    await eliminarLibroCarrito(idUser,idLibro)
    cargarCarrito(idUser)
  } 

  async function cargarCarrito(id) {
    if (!id) return;
    const productos = await obtenerCarrito(id);
    setCantidad(productos?.resumen?.cantidad || 0);
    setLibros(productos?.libros || []);
    setSubtotal(productos?.resumen?.subtotal || "0.00");
    setIgv(productos?.resumen?.igv || "0.00");
    setTotal(productos?.resumen?.total || "0.00");
    setIdUser(id)
  }

  function pagar() {
    if (!idUser || !total) return;
    return pagarCarrito(idUser, total);
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
        pagar,
        deleteLibroCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
