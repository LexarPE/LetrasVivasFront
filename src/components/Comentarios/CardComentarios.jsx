import Comentario from "./Comentario";
import HeaderSeccion from "../HeaderSeccion";

export default function CardComentarios({ Comentarios }) {
  return (
    <div className="flex flex-col gap-4 px-5 py-2 relative">
      <HeaderSeccion titulo="COMENTARIOS" size={"14px"} />
      {Comentarios.map((comentario, index) => (
        <Comentario key={index} info={comentario} />
      ))}
    </div>
  );
}
