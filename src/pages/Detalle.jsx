import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Stars from "../components/Stars";
import { Share2, HeartPlus, CircleUser } from "lucide-react";
import Nav from "../components/Nav";
import Carrito from "../components/Carrito";

import { LibroContext, AuthContext } from "../context/Context";
export default function Detalle() {
  const [changeColor, setColor] = useState(false);
  const [libro, setLibro] = useState({});
  const [coment, setComentario] = useState("");
  const libroContext = useContext(LibroContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [validacion, setValidacion] = useState(false);
  
  useEffect(() => {
    setValidacion(authContext.validarToken());
    verificarFav()
    }, [authContext]);


  const { id } = useParams();
  useEffect(() => {
    const lib = async () => {
      let l = await libroContext.libroId(id);
      setLibro(l);
    };
    lib();
  }, []);

  const verificarFav = () => {
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) return;
    const idUser = JSON.parse(sesion).id;
    const favoritosSesion = async () => {
      const uf = await libroContext.favoritosUsuario(idUser);
      const yaExiste = uf?.some((f) => f.libro.id == id);
      setColor(yaExiste);
    };
    favoritosSesion();
  };

  const copiarAlPortapapeles = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("URL copiada al portapapeles"))
      .catch((err) => console.error("Error al copiar", err));
  };

  function valueTArea(e) {
    setComentario(e.target.value);
  }

  function onComentario() {
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) return;
    const idL = libro.id;
    const idUser = JSON.parse(sesion).id;
    if ((coment != "" && coment != null) || coment != undefined) {
      let responseComentario = async () => {
        const mess = await libroContext.agregarComentario(idUser, idL, coment);
        toast.info(mess);
      };
      responseComentario();
    }
  }

  function agregarFav() {
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) return;
    const idL = libro.id;
    const idUser = JSON.parse(sesion).id;

    setColor(!changeColor);

    const favoritosSesion = async () => {
      const uf = await libroContext.favoritosUsuario(idUser);
      const yaExiste = uf?.some((f) => f.libro.id == idL);

      const favS = JSON.parse(sessionStorage.getItem("favs")) || [];

      const favSFiltrados = favS.filter((f) => f.id !== idL);

      sessionStorage.setItem("favs", JSON.stringify([...favSFiltrados, libro]));

      if (!yaExiste) {
        libroContext.agregarFavorito(idUser, idL);
      }
    };

    favoritosSesion();
  }

  function addCarrito() {
    !authContext.validarToken()
      ? (toast.warn("Inicia Sesion"),
        setTimeout(() => {
          navigate("/aceder");
        }, 2000))
      : null;
  }

  function onCalificacion(cal) {
    const sesion = sessionStorage.getItem("sesion");
    if (!sesion) return;
    const idL = libro.id;
    const idUser = JSON.parse(sesion).id;
    let responseCalificacion = async () => {
      const mess = await libroContext.agregarCalificacion(idUser, idL, cal);
      toast.info(mess);
    };
    responseCalificacion();
  }

  return (
    <div>
      <Carrito verificacion={validacion}/>
      <Nav />
      <div className="w-full flex justify-center">
        <div className="lg:w-[80%] md:grid md:grid-cols-2 grid-rows-2 bg-white">
          <div className="flex justify-center py-5">
            <img
              src={libro.url_portada}
              alt="Imagen de libro"
              className="w-full h-[480px] sm:h-[] object-contain"
            ></img>
          </div>
          <div className="px-3 pt-4 md:flex md:flex-col md:relative">
            <h4 className="text-3xl py-1">{libro.titulo}</h4>
            <Stars estrellas={libro.resenas} />
            <p className="py-2 text-xl">{libro.descripcion}</p>
            <div className=" bottom-3">
              <span className="text-2xl py-2 block">S/.{libro.precio}</span>
              <div className="flex items-center gap-2 pb-3">
                <button
                  className="bottom-3 right-3 border px-3 py-1 text-xl bg-[#1d3a66] text-white cursor-pointer"
                  onClick={addCarrito}
                >
                  Agregar al carrito
                </button>
                <span className="cursor-pointer" onClick={copiarAlPortapapeles}>
                  <Share2 />
                </span>
                {authContext.acess ? (
                  <span className="cursor-pointer" onClick={agregarFav}>
                    <HeartPlus color={changeColor != "" ? "#d50" : "#000"} />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className=" px-5 pt-3 col-span-2">
            {authContext.acess ? (
              <div>
                <textarea
                  placeholder="Escribe un comentario: "
                  name="comentario"
                  className="w-full px-2 py-1 resize-none bg-gray-100 outline-none"
                  rows={3}
                  onChange={valueTArea}
                ></textarea>
                <div className="flex gap-3 items-center">
                  <button
                    className="bottom-3 right-3 border px-3 py-1 text-xl bg-[#1d3a66] text-white cursor-pointer"
                    onClick={onComentario}
                  >
                    Comentar
                  </button>
                  <Stars
                    estrellas={libro.resenas}
                    cal={true}
                    funcCalificar={onCalificacion}
                  />
                </div>
              </div>
            ) : null}

            <h5 className="py-3 my-2 px-2 text-xl bg-gray-100">Comentarios:</h5>
            <div className="pb-4 flex flex-col gap-1.5">
              {libro.comentarios?.length != undefined ? (
                libro.comentarios.map((c, i) => {
                  return (
                    <p className="pl-2 bg-gray-100 rounded select-none" key={i}>
                      <span className="flex gap-2 items-center pt-3">
                        <CircleUser />
                        <span>{c.usuario.nombre}</span>
                      </span>
                      <span className="block pl-3 py-2">{c.comentario}</span>
                    </p>
                  );
                })
              ) : (
                <p className="pl-2 bg-gray-100 rounded select-none">
                  <span className="block pl-3 py-2">
                    Cargando comentarios...
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
