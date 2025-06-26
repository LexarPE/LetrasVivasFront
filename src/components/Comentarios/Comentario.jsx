import UserComentario from "../IconosReact/IconoUserComentario";

export default function Comentario({ info: { nombre, comentario } }) {
  return (
    <div className="p-2 bg-[#F6FAFF] rounded-[5px] shadow-[#0b367f91] shadow-sm">
      <div className="flex items-center gap-1">
        <UserComentario />
        <div>
          <h3 className="text-[15px] font-semibold">{nombre}</h3>
        </div>
      </div>
      <p className="mt-2 text-gray-700 text-[13px]">{comentario}</p>
    </div>
  );
}
