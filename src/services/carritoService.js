// 5.



import {axiosInstanceToken } from "../api/axiosInstance";


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


export const obtenerCarrito = async (id) => {
  try {
    const response = await axiosInstanceToken.get(`carrito/listar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}
