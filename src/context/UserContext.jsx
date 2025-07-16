// 7.



import { createContext, useState } from "react";

import { guardarUsuario, iniciarSesion } from "../services/userService";

// crea un contexto global en React para compartir el estado del usuario entre componentes sin necesidad de pasar props manualmente.
export const UserContext = createContext();

// UserProvider es un componente proveedor.
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [idUr, setIdU] = useState(null)

  const setIdUser = (id)=>{
    const idu = localStorage.getItem("ideUser")
    if(!idu){
      localStorage.setItem("ideUser",id)
    }
    else setIdU(idu)
  }

  const idUser = ()=>{
    return localStorage.getItem("ideUser");
  }

  return (
    <UserContext.Provider
      value={{
        idUser,
        setIdUser,
        usuario,
        setUsuario,
        guardarUsuario,
        iniciarSesion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};