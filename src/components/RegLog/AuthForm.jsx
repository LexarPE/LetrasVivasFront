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

  useEffect(()=>{
    localStorage.getItem("token")
      ? navigate("/")
      : null;
  },[usuario, navigate])
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  // Cuando se implemente la lógica de registro
  const onRegister = async (data) => {
    console.log(data)
    let onRegister = async () => {
      const getUserReg = await guardarUsuario(data);
      console.log(getUserReg);
    };

    onRegister();
  };
  
  // Cuando se implemente la lógica de inicio de sesión
  const onLogin = async (data) => {
    let onLogin = async ()=>{
      const getLogin = await iniciarSesion(data);
      getLogin ? (
        setUsuario(getLogin.token),
        localStorage.setItem("token", [getLogin.token || ""]),
        navigate("/")
      ) : null
      
    }
    
    onLogin()
  };

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
      <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
        {mode === "register" ? "Registro" : "Inicio de sesión"}
      </h2>

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

      <button
        type="submit"
        className="w-full mt-4 py-2 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
      >
        {mode === "register" ? "Crear Cuenta" : "Ingresar"}
      </button>

      <ToggleLink mode={mode} onToggle={toggleMode} />
    </form>
  );
}
