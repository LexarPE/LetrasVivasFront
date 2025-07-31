// 3.



import { axiosInstance} from "../api/axiosInstance";


//OK
export const guardarUsuario = async (usuario) => {
  try { 
    if (usuario.contrasena != usuario.recontrasena) {
      throw new Error("Contraseña no valida en el registro");
    }
    const dataUser = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      rol: "USER",
    };

    const response = await axiosInstance.post("auth/registrar", dataUser);
    if(response.status != 200 || response.status != 201){
      return false
    }
    console.log(response.status)
    return true
  } catch (error) {
    console.error(error.response ? error.response.data.error : "Ocurrio un error al crear una cuenta");
  }
};


//OK
export const iniciarSesion = async (usuario) => {
  try {
    const response = await axiosInstance.post("auth/iniciar-sesion", usuario);
    return response.data;


  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
