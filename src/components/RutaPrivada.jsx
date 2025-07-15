// components/RutaPrivada.jsx
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const RutaPrivada = ({ children }) => {
  const { user } = useContext(AuthContext);
  return localStorage.getItem("auth") ? children : <Navigate to="/" />;
};

export default RutaPrivada;
