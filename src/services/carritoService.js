// 5.



import {axiosInstanceToken } from "../api/axiosInstance";

// Cuando el usuario no tiene cuenta
export const guardarCarritoLocal = async (carrito) => {
  if(carrito.length === 0) {
    return;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


export const guardarCarrito = async (carrito) => {
  try {
    if (carrito.length === 0) {
      return;
    }
    const response = await axiosInstanceToken.post("/carrito", carrito );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el carrito:", error);
    throw error;
  }
}


export const obtenerCarrito = async () => {
  try {
    const response = await axiosInstanceToken.get("/carrito");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    throw error;
  }
}


export const obtenerCarritoLocal = () => {
  const local = localStorage.getItem("carrito");
  if (local) {
    console.log(JSON.parse(local));
    return JSON.parse(local);
  }
  return [];
}