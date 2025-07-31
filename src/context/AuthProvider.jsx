
import { AuthContext } from "./Context";
import { guardarUsuario, iniciarSesion } from "../services/userService";
import { useState } from "react";

export default function AuthProvider({ children }) {
  const [acess,setAcess] = useState(false)

  async function agregarToken(tk) {
    sessionStorage.setItem("sesion", JSON.stringify(tk));
  }

  function validarToken() {
    const raw = sessionStorage.getItem("acess")
    if (!raw) return false; // Si es null o vacío, salimos
    
    const sePass = JSON.parse(raw);
    
    if (sePass) {
      setAcess(sePass)
      return true
    }
    console.log("sin verificar");
    setAcess(false)
  }

  function eliminarToken() {
    sessionStorage.setItem("sesion", "");
    sessionStorage.clear()
    setAcess(false)
    return true;
  }

  async function crearCuenta(user) {
    guardarUsuario(user);
  }

  async function acceder(user) {
    try {
      const tk = await iniciarSesion(user);
      agregarToken(tk);
      setAcess(true)
      sessionStorage.setItem("acess",true)
      return true;
    } catch {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ crearCuenta, acceder, validarToken, eliminarToken, acess }}
    >
      {children}
    </AuthContext.Provider>
  );
}
