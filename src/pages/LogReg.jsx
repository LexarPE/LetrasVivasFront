import { useState, useContext, useEffect } from "react";
import sesion from "/sesion.jpg";
import { AuthContext } from "../context/Context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function LogReg() {
  const { crearCuenta, acceder, validarToken } =
    useContext(AuthContext);
  const [onSesion, setSesion] = useState(true);
  const [crear, setCrear] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    recontrasena: "",
    rol: "USER",
  });

  const [login, setLogin] = useState({
    correo: "",
    contrasena: "",
  });

  useEffect(() => {
    let permisoAcceso = validarToken();
    if(permisoAcceso) navigate("/")
  }, []);

  const navigate = useNavigate()

  function cambiarCrear() {
    setSesion(!onSesion);
    setCrear({
      nombre: "",
      correo: "",
      contrasena: "",
      recontrasena: "",
      rol: "USER",
    });
    setLogin({ correo: "", contrasena: "" });
  }

  function changeInput(e) {
    onSesion
      ? setLogin({
          ...login,
          [e.target.name]: e.target.value,
        })
      : setCrear({
          ...crear,
          [e.target.name]: e.target.value,
        });
  }

  async function agregarCuenta() {
    //true -false
    const responseCreateCount = await crearCuenta(crear);
    if(responseCreateCount){
      toast.success("Cuenta creada");
      setSesion(!onSesion);
    }
    else {
      toast.error("Ocurrio un error");
    }

  }

  async function loginCuenta() {
    acceder(login);
    navigate("/")
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="w-full min-h-screen flex justify-center items-center">
          {onSesion ? (
            <div className="bg-white flex flex-col px-4 pt-2 pb-4 rounded-xl select-none">
              <h4 className="text-center text-3xl py-3">Inicio de sesión</h4>
              <div className="flex flex-col gap-3">
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Correo: "
                  name="correo"
                  onChange={changeInput}
                  value={login.correo}
                ></input>
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Contraseña: "
                  name="contrasena"
                  onChange={changeInput}
                  value={login.contrasena}
                  type="password"
                ></input>
                <div
                  className="text-center p-2 bg-blue-800 rounded-xl text-white hover:bg-blue-900 transition-all cursor-pointer"
                  onClick={loginCuenta}
                >
                  Ingresar
                </div>
                <div className="w-full text-center">
                  <span
                    className="cursor-pointer hover:text-blue-700 "
                    onClick={cambiarCrear}
                  >
                    Crear cuenta
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white flex flex-col px-4 pt-2 pb-4 rounded-xl select-none">
              <h4 className="text-center text-3xl py-3">Crear cuenta</h4>
              <div className="flex flex-col gap-3">
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Nombre: "
                  type="text"
                  name="nombre"
                  onChange={changeInput}
                  value={crear.nombre}
                ></input>
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Correo: "
                  type="email"
                  name="correo"
                  onChange={changeInput}
                  value={crear.correo}
                ></input>
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Contraseña: "
                  type="password"
                  name="contrasena"
                  onChange={changeInput}
                  value={crear.contrasena}
                ></input>
                <input
                  className="min-w-[350px] max-w-[400px] px-2 py-1 outline-none border border-[#1E2630] rounded-xl"
                  placeholder="Re-Contraseña: "
                  type="password"
                  name="recontrasena"
                  onChange={changeInput}
                  value={crear.recontrasena}
                ></input>
                <div
                  className="text-center p-2 bg-blue-800 rounded-xl text-white hover:bg-blue-900 transition-all cursor-pointer"
                  onClick={agregarCuenta}
                >
                  Crear
                </div>
                <div className="w-full text-center">
                  <span
                    className="cursor-pointer hover:text-blue-700"
                    onClick={cambiarCrear}
                  >
                    Ingresar
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:block invisible h-0 lg:min-h-screen lg:visible">
          <img
            className="w-full h-0 lg:h-[100vh] object-cover"
            src={sesion}
            alt="imagen de sesion"
          ></img>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
