// 5.



import {axiosInstanceToken } from "../api/axiosInstance";


// OK
export const agregarLibroCarrito = async (idUser,idLibro) => {
  try{
      const response = await axiosInstanceToken.post(`carrito/agregar/${idUser}`, {
      id_libro : idLibro
    } );
    return response.data;
  } catch (error) {
    console.error("Error al guardar libro en carrito:", error);
    throw error;
  }
}

// OK
export const obtenerCarrito = async (id) => {
  try {
    const response = await axiosInstanceToken.get(`carrito/listar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}


export const pagarCarrito = async (id,monto)=>{
  try {
    const response = await axiosInstanceToken.post(`api/pago/confirmar/${id}`,{
      monto: monto 
    });
    return response.data;
  } catch (error) {
    console.error("Error al pagar el carrito:", error);
    throw error;
  }
}


export const eliminarLibroCarrito = async (id,idlibroCarrito)=>{
  try {
    const response = await axiosInstanceToken.delete(`carrito/eliminar/${id}/${idlibroCarrito}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar libro del carrito:", error);
    throw error;
  }
}
