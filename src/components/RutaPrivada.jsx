// components/RutaPrivada.jsx
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children }) => {
  const sesion = sessionStorage.getItem("sesion");
  const token = sesion ? JSON.parse(sesion).token : null;

  return token ? children : <Navigate to="/" />;
};

export default RutaPrivada;
