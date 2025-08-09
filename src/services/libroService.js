// 4.
import axios from "axios";
import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";

// OK
export const obtenerLibros = async () => {
  try {
    const response = await axiosInstance.get("libro/catalogo/completo");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    throw error;
  }
};

// OK
export const agregarFavorito = async (idUser, idLibro) => {
  try {
    const response = await axiosInstanceToken.post(
      `favoritos/agregar/${idUser}`,
      {
        id_libro: `${idLibro}`,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      console.error("Conflicto: ya existe ese favorito o hay inconsistencia");
      return true;
    }
    throw error;
  }
};

//OK
export const favoritosUsuario = async (id) => {
  try {
    const response = await axiosInstanceToken.get(`favoritos/listar/${id}`);
    return response.data.favoritos;
  } catch (error) {
    console.error("Error al obtener los favoritos del usuario:", error);
    throw error;
  }
};

export const libroPorId = async (id)=>{
  try {
    const response = await axiosInstanceToken.get(`libro/${id}`);
    return response.data.libro;
  } catch (error) {
    console.error("Error al obtener los libros del usuario:", error);
    throw error;
  }
}

//OK
export const librosUsuario = async () => {
  try {
    const response = await axiosInstanceToken.get(`libro/listar/biblioteca/0`);
    return response.data.libros;
  } catch (error) {
    console.error("Error al obtener los libros del usuario:", error);
    throw error;
  }
};

//
export const obtenerPDF = async (id) => {
  try {
    const response = await axiosInstanceToken.get(`libros/${id}/pdf`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener PDF");
    throw error;
  }
};
