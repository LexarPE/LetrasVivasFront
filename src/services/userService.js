// 3.



import { axiosInstance} from "../api/axiosInstance";

export const guardarUsuario = async (usuario) => {
  try { 
    const dataUser = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: usuario.contrasena == usuario.reContrasena ? usuario.reContrasena : null ,
      rol: "USER",
    };


    const response = await axiosInstance.post("auth/registrar", dataUser);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al guardar el usuario:", error.response.data.error);
    throw error;
  }
};

export const iniciarSesion = async (usuario) => {
  try {
    const response = await axiosInstance.post("auth/iniciar-sesion", usuario);
    return response.data;


  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
