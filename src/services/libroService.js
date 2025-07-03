// 4.


import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";


export const obtenerLibros = async () => {
  try {
    const response = await axiosInstance.get("/libros");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    throw error;
  }
}


export const obtenerLibroPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`/libros/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el libro por ID:", error);
    throw error;
  }
}


export const guardarLibro = async (libro) => {
  try {
    const response = await axiosInstanceToken.post("/savelibro", libro);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el libro:", error);
    throw error;
  }
}


export const librosUsuario = async (usuarioId) => {
  try {
    const response = await axiosInstanceToken.get(`/libros/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los libros del usuario:", error);
    throw error;
  }
}


export const favoritosUsuario = async (usuarioId) => {
  try {
    const response = await axiosInstanceToken.get(`/libros/favoritos/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los favoritos del usuario:", error);
    throw error;
  }
}

export const librosMasVendidos = async () => {
  try {
    const response = await axiosInstance.get("/libros/masvendidos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los libros más vendidos:", error);
    throw error;
  }
}