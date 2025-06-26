// 3.



import { axiosInstance, axiosInstanceToken } from "../api/axiosInstance";

export const guardarUsuario = async (usuario) => {
  try {
    console.log(usuario)
    // ${urlBack}/api/registar
    const response = await axiosInstance.post("/registar", usuario);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    throw error;
  }
};

export const iniciarSesion = async (usuario) => {
  try {
    const response = await axiosInstanceToken.post("/login", usuario);
    return response.data;


  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
