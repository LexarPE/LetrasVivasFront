// Metodo para obtener comentarios de un libro
import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";

// OK
export const agregarComentario = async (idUser, idLibro, comentario) => {
  try {
    const response = await axiosInstanceToken.post(
      `comentarios/crear/${idLibro}/${idUser}`,
      {
        comentario: `${comentario}`,
      }
    );
    if (response?.status === 200 || response?.status === 201) return response;
  } catch (error) {
    if (error.response?.status === 409) {
      return error.response.data.error;
    }
    throw error;
  }
};

// OK
export const agregarCalificacion = async (idUser, idLibro, cal) => {
  try {
    const response = await axiosInstanceToken.post(`resenas/calificar`, {
      calificacion: cal,
      id_usuario: idUser,
      id_libro: idLibro,
    });
    if (response?.status === 200 || response?.status === 201) return response;
  } catch (error) {
    if (error.response?.status === 409) {
      return error.response.data.error;
    }
    throw error;
  }
};