import { useState, useContext, useEffect } from "react";
import InputField from "./InputField.jsx";
import ToggleLink from "./ToggleLink.jsx";
import "../../styles/global.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

export default function AuthForm() {
  const navigate = useNavigate();
  const { usuario, setUsuario, guardarUsuario, iniciarSesion } =
    useContext(UserContext);

  useEffect(() => {
    // Si hay token en localStorage, redirige al inicio
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const [mode, setMode] = useState("login");
  const initialRegister = {
    nombre: "",
    correo: "",
    contrasena: "",
    reContrasena: "",
  };
  const initialLogin = { correo: "", contrasena: "" };

  const [formData, setFormData] = useState(initialRegister);
  const [errors, setErrors] = useState({});
  const [alerta, setAlerta] = useState(""); // Estado para mostrar mensajes de error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación del formulario
  const validate = () => {
    const newErrors = {};
    if (mode === "register") {
      if (!formData.nombre.trim()) newErrors.nombre = "Nombre requerido";
      if (!formData.correo.trim()) newErrors.correo = "Correo requerido";
      else if (!/\S+@\S+\.\S+/.test(formData.correo))
        newErrors.correo = "Correo inválido";
      if (!formData.contrasena) newErrors.contrasena = "Contraseña requerida";
      if (formData.reContrasena !== formData.contrasena)
        newErrors.reContrasena = "Las contraseñas no coinciden";
    } else {
      if (!formData.correo.trim()) newErrors.correo = "Correo requerido";
      else if (!/\S+@\S+\.\S+/.test(formData.correo))
        newErrors.correo = "Correo inválido";
      if (!formData.contrasena) newErrors.contrasena = "Contraseña requerida";
    }
    return newErrors;
  };

  // Envía los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    if (mode === "register") {
      await onRegister(formData);
    } else {
      await onLogin(formData);
    }
  };

  // Función para mostrar mensajes temporales
  const mostrarAlerta = (mensaje) => {
    setAlerta(mensaje);
    setTimeout(() => setAlerta(""), 3000); // Oculta después de 3 segundos
  };

  // Registro
  const onRegister = async (data) => {
    try {
      const respuesta = await guardarUsuario(data);
      if (!respuesta || respuesta.error) {
        throw new Error(respuesta?.mensaje || "Error al registrarse");
      }
      navigate("/");
    } catch (error) {
      mostrarAlerta(error.response.data.error);
    }
  };

  // Login
  const onLogin = async (data) => {
    try {
      const { correo, contrasena } = data;
      const getLogin = await iniciarSesion({ correo, contrasena });

      if (!getLogin || !getLogin.token) {
        throw new Error(getLogin?.mensaje || "Credenciales inválidas");
      }

      setUsuario(getLogin.token);
      localStorage.setItem("token", getLogin.token);
      navigate("/");
    } catch (error) {
      mostrarAlerta(error.message);
    }
  };

  // Cambiar entre modo login y registro
  const toggleMode = () => {
    const newMode = mode === "register" ? "login" : "register";
    setMode(newMode);
    setFormData(newMode === "register" ? initialRegister : initialLogin);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border border-blue-500 max-w-md w-full mx-auto shadow"
    >
      {/* Título */}
      <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
        {mode === "register" ? "Registro" : "Inicio de sesión"}
      </h2>

      {/* Mensaje de error temporal */}
      {alerta && (
        <div className="bg-red-200 text-red-800 font-semibold px-4 py-2 rounded mb-4 text-center transition-opacity duration-300">
          {alerta}
        </div>
      )}

      {/* Campos del formulario */}
      {mode === "register" ? (
        <>
          <InputField
            label="Nombre:"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />
          <InputField
            label="Correo:"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
          />
          <InputField
            label="Contraseña:"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            error={errors.contrasena}
          />
          <InputField
            label="Re-Contraseña:"
            name="reContrasena"
            type="password"
            value={formData.reContrasena}
            onChange={handleChange}
            error={errors.reContrasena}
          />
        </>
      ) : (
        <>
          <InputField
            label="Correo:"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
          />
          <InputField
            label="Contraseña:"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            error={errors.contrasena}
          />
        </>
      )}

      {/* Botón */}
      <button
        type="submit"
        className="w-full mt-4 py-2 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
      >
        {mode === "register" ? "Crear Cuenta" : "Ingresar"}
      </button>

      {/* Cambiar entre login y registro */}
      <ToggleLink mode={mode} onToggle={toggleMode} />
    </form>
  );
}
