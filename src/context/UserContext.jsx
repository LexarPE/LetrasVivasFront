// 7.



import { createContext, useState } from "react";

import { guardarUsuario, iniciarSesion } from "../services/userService";

// crea un contexto global en React para compartir el estado del usuario entre componentes sin necesidad de pasar props manualmente.
export const UserContext = createContext();

// UserProvider es un componente proveedor.
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, guardarUsuario , iniciarSesion }}>
      {children}
    </UserContext.Provider>
  );
};