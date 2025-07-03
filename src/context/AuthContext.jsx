// context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUsuario] = useState(null); // null = no autenticado
  const login = (datosUsuario) => {
    setUsuario(datosUsuario)
    localStorage.setItem("auth", datosUsuario ? true : "");
  };
  
  const logout = () => setUsuario(null);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

