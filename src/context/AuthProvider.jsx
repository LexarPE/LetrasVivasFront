
import { AuthContext } from "./Context";
import { guardarUsuario, iniciarSesion } from "../services/userService";
import { useState } from "react";

export default function AuthProvider({ children }) {
  const [acess,setAcess] = useState(false)
  const [id, setIdUser] = useState(null)
  async function agregarToken(tk) {
    sessionStorage.setItem("sesion", JSON.stringify(tk));
  }

  function validarToken() {
    const raw = sessionStorage.getItem("acess")
    const se = sessionStorage.getItem("sesion")
    if (!raw ) return false; // Si es null o vacío, salimos
    
    const sePass = JSON.parse(raw);
    const seSe = JSON.parse(se);
    
    if (sePass) {
      setAcess(sePass)
      setIdUser(seSe.id)
      return true
    }
    console.log("sin verificar");
    setAcess(false)
  }

  function eliminarToken() {
    sessionStorage.clear()
    setAcess(false)
    return true;
  }

  async function crearCuenta(user) {
    guardarUsuario(user);
    return true
  }

  async function acceder(user) {
    try {
      const tk = await iniciarSesion(user);
      agregarToken(tk);
      setAcess(true)
      sessionStorage.setItem("acess",true)
      return true;
    } catch {
      setAcess(false)
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ crearCuenta, acceder, validarToken, eliminarToken, acess,id}}
    >
      {children}
    </AuthContext.Provider>
  );
}
