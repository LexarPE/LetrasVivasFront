import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Stars({ estrellas = [], cal = false, funcCalificar }) {
  const [calificar, setCalificar] = useState(true);
  const [calificacionSeleccionada, setCalificacionSeleccionada] =
    useState(null);

  useEffect(() => {
    try {
      const sesion = JSON.parse(sessionStorage.getItem("sesion"));
      const userId = sesion?.id;
      if (!userId) return;

      const yaCalifico = estrellas.some((e) => e?.usuario?.id === userId);
      setCalificar(!yaCalifico);
    } catch (err) {
      console.error("Error al verificar calificación:", err);
    }
  }, [estrellas]);

  const arrayCalificacion = estrellas
    .map((e) => Number(e?.calificacion))
    .filter((c) => !isNaN(c) && c > 0);

  let calificacionMayor =
    calificacionSeleccionada > 0
      ? calificacionSeleccionada
      : arrayCalificacion.length > 0
      ? Math.max(...arrayCalificacion)
      : 0;


  const calificarClick = (e) => {
    const valor = parseInt(e.currentTarget.id);
    if (!isNaN(valor)) {
      setCalificacionSeleccionada(valor); // guarda valor visual
      setCalificar(false); // fuerza modo visual
      if (typeof funcCalificar === "function") {
        funcCalificar(valor); // guarda en backend si aplica
      }
    }
  };

  if (cal && calificar) {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            id={i + 1}
            onClick={calificarClick}
            className="cursor-pointer hover:scale-110 transition-transform"
            title={`Calificar con ${i + 1} estrella(s)`}
          >
            <Star
              color={i < calificacionSeleccionada ? "#d50" : "#ccc"}
              strokeWidth="3px"
            />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          <Star
            color={i < calificacionMayor ? "#d50" : "#ccc"}
            strokeWidth="3px"
          />
        </span>
      ))}
    </div>
  );
}
