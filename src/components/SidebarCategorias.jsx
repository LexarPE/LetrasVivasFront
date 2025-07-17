import { useState, useEffect } from "react";
import { X, ListFilter } from "lucide-react";
import { cargarCategorias } from "../services/categoriaService";

export default function SidebarCategorias({ c }) {
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fakeCategorias = async () => {
      const categorias = await cargarCategorias();
      setCategorias(categorias);
    };
    fakeCategorias();
  }, []);

  const manejarCambio = (nombreCat) => {
    if (categoriaSeleccionada === nombreCat) {
      // Si ya está seleccionada, desmarcarla
      setCategoriaSeleccionada(null);
      c(null);
    } else {
      // Marcar nueva categoría
      setCategoriaSeleccionada(nombreCat);
      c(nombreCat);
    }
  };

  return (
    <div>
      {/* Botón abrir */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#0B357F] text-white p-2 flex items-center gap-1"
      >
        <ListFilter size={18} />
        Filtros
      </button>

      {/* Pestaña lateral */}
      {open && (
        <div className="absolute top-0 right-0 w-64 h-full bg-white border border-blue-300 shadow-lg p-4 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-blue-700 font-semibold text-lg">Categorías</h2>
            <button onClick={() => setOpen(false)}>
              <X className="text-blue-700 hover:text-red-500" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-blue-900">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={categoriaSeleccionada === null}
                onChange={() => manejarCambio(null)}
              />
              Todos
            </label>

            {categorias.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-blue-900"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={categoriaSeleccionada === cat.nombrecat}
                  onChange={() => manejarCambio(cat.nombrecat)}
                />
                {cat.nombrecat}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
