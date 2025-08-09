import { useNavigate } from "react-router-dom";

export default function LibroBibli({ libro }) {
  const navigate = useNavigate();

  if (!libro || !libro.libro_id) return null;

  function irDetalle() {
    navigate(`/viewPdf/${libro.libro_id}`);
  }

  return (
    <div
      className="flex flex-col items-center min-w-[130px] max-w-[200px] relative"
      onClick={irDetalle}
    >
      <img
        src={libro.url_portada}
        alt="Imagen de libro"
        className="w-full h-[260px] sm:h-[280px] object-cover rounded-xl"
      ></img>
      <div className="group absolute hover:bg-[#1E2630] w-full h-[260px] sm:h-[280px] rounded-xl opacity-70 flex items-center hover:cursor-pointer transition-all select-none">
        <h6 className="invisible w-full text-center group-hover:visible group-hover:text-white">
          Leer
        </h6>
      </div>
      <div className="w-full px-2">
        <h5 className="font-bold py-1 truncate overflow-hidden whitespace-nowrap">
          {libro.titulo}
        </h5>
        <h5 className="truncate overflow-hidden whitespace-nowrap">
          {libro.nombre_autor}
        </h5>
      </div>
    </div>
  );
}
