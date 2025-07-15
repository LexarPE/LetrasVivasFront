// 4.

import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";

export const obtenerLibros = async () => {
  try {
    const response = await axiosInstance.get("libro/listar");
    return response.data.libros;
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    throw error;
  }
};

export const obtenerLibroPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`libro/${id}`);
    return response.data.libro;
  } catch (error) {
    console.error("Error al obtener el libro por ID:", error);
    throw error;
  }
};

export const guardarLibro = async (libro) => {
  try {
    const response = await axiosInstanceToken.post("/savelibro", libro);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el libro:", error);
    throw error;
  }
};

export const librosUsuario = async () => {
  try {
    const response = await axiosInstanceToken.get(`libros/usuario`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los libros del usuario:", error);
    throw error;
  }
};

export const obtenerPDF = async (id) => {
  try {
    const response = await axiosInstanceToken.get(`libros/${id}/pdf`)
    return response.data
  } catch (error) {
    console.log("Error al obtener PDF")
    throw error
  }
};

export const favoritosUsuario = async () => {
  try {
    const response = await axiosInstanceToken.get(
      `libros/favoritos`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los favoritos del usuario:", error);
    throw error;
  }
};

export const librosMasVendidos = async () => {
  try {
    const response = await axiosInstance.get("libro/listar");
    return response.data.libro;
  } catch (error) {
    console.error("Error al obtener los libros más vendidos:", error);
    throw error;
  }
};
