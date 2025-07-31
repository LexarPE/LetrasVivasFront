import { useState, useContext, useEffect} from "react";
import { ChevronDown } from "lucide-react";
import Nav from "../components/Nav";
import ContainerBookHome from "../components/ContenedorLibrosInicio";
import { LibroContext } from "../context/Context";
import { AuthContext } from "../context/Context";

export default function Catalogo() {
  const { obtenerlibros } = useContext(LibroContext);
  const authContext = useContext(AuthContext)
  const [filter, setFilter] = useState(false);
  const [categorias, setCategorias] = useState([])
  const [librosF,setLibrosF] = useState([])
  const [validacion,setValidacion] = useState(false)
  let libros = obtenerlibros();
  
  useEffect(() => {
    setValidacion(authContext.validarToken());
  }, [authContext]);

  useEffect(() => {
    if (libros.length > 0) {
      obtenerCategorias();
    }
  }, [libros]);

  function obtenerCategorias() {
    const cats = libros.map((l) => l.categoria);
    const catsFiltradas = new Set(cats)
    setCategorias([...catsFiltradas]);
  }

  function filtrarCategoria(e){
    const filtro = e.target.value
    //Obtiene libros de esa categoria
    const lf = libros.filter((l)=> l.categoria == filtro)
    if(filtro?.length < 0){
      obtenerCategorias()
      return
    }
    setLibrosF(lf)

  }
  

  function activeFilter() {
    setFilter(!filter);
  }
  return (
    <div className="bg-gray-100  relative">
      <Nav />
      <div>
        <div className="lg:w-4xl mx-auto flex justify-end">
          <div className="absolute bg-[#1E2630] text-white w-max px-2 py-2 group z-20 rounded transition-all transit">
            <span
              className="flex items-center cursor-pointer select-none text-center text-xl"
              onClick={activeFilter}
            >
              Categorias
              <ChevronDown />
            </span>
            {filter ? (
              <div className="flex flex-col relative h-[90vh] overflow-auto">
                <label className="flex gap-2 items-center py-1 px-3">
                  <input
                    type="radio"
                    name="filtro"
                    value=""
                    onChange={filtrarCategoria}
                    checked={librosF.length === 0}
                  />
                  <span>Todo</span>
                </label>
                {categorias.map((c, i) => {
                  return (
                    <label
                      className="flex gap-2 items-center py-1 px-3"
                      key={i}
                    >
                      <input
                        type="radio"
                        name="filtro"
                        value={c}
                        onChange={filtrarCategoria}
                        checked={
                          librosF.length > 0 && librosF[0].categoria === c
                        }
                      />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className=" relative top-15">
          <ContainerBookHome
            title={""}
            books={librosF?.length > 0 ? librosF : libros}
            limite={false}
            verificacion={validacion}
          />
        </div>
      </div>
    </div>
  );
}
