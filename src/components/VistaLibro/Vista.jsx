// Obtener la informacion del libro mediante el context y no por props
//Agregar funcionalidad de agregar al carrito
//Agregar funcionalidad de compartir y favorito


import BtnGeneral from "../BotonGeneral";
import Star from "../IconosReact/Star";
import Compartir from "../IconosReact/Compartir";
import Favorito from "../IconosReact/Favorito";


export default function Vista({
  libro: { id,urlLibro, titulo, stars, descripcion, precio, stock },
}) {
  return (
    <div className="flex flex-col md:grid grid-cols-2" key={id}>
      <div className="flex justify-center py-3">
        <img
          src={`${urlLibro}`}
          alt="imagen_de_libro"
          className="max-h-[500px] object-contain"
        ></img>
      </div>
      <div className="px-2 py-2 md:py-10">
        <h2 className="text-3xl md:text-4xl">{titulo}</h2>
        <div className="py-2 flex">
          {/* Hacer un for para cargar las estrellas dinamicamente */}
          {[...Array(5)].map((_, i) => (
            <Star key={i} open={i < stars} />
          ))}
        </div>
        <p className="pb-2 pr-4 text-[13px] max-h-[300px] overflow-y-auto">
          {/* Resumen del libro */}
          {descripcion}
        </p>
        <div className="flex flex-col pb-3">
          <p className="text-[20px] md:text-[22px] font-medium">S/.{precio}</p>
          <span className="text-[12px]">
            Stock: <span className="font-medium">{stock}</span>
          </span>
        </div>
        <div className="flex gap-2.5 md:block">
          {/* Agregar funcion para agregar el libro al carrito */}
          <span>
          <BtnGeneral content={"AGREGAR AL CARRITO"} textZ={"13px"} />
          </span>
          <div className="flex gap-1 py-0.5">
            {/* opciones adicionales (favorito - compartir) */}
            <span>
              <Compartir />
            </span>
            <span>
              <Favorito />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
