import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

import "react-toastify/dist/ReactToastify.css";

import Nav from "../components/nav/Nav";
import HeaderSeccion from "../components/HeaderSeccion";
import CardLibro from "../components/catalogolibros/CardLibro";
import { obtenerLibros } from "../services/libroService";

export default function Pedidos() {
  const [libros, setLibros] = useState([]);
  const [pdfURL, setPdfURL] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef(null);

  const cargarLibros = async () => {
    try {
      const datos = await obtenerLibros();
      if (datos && Array.isArray(datos)) {
        setLibros(datos);
        toast.success("Libros cargados");
      } else {
        toast.error("No se encontraron libros");
      }
    } catch {
      toast.error("Error al cargar los libros");
    }
  };

  const renderPDF = async (url, pageNum = 1) => {
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      const page = await pdf.getPage(pageNum);
      const scale = 1;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      toast.error("Error al renderizar el PDF");
      console.error(error);
    }
  };

  const ejecutar = async (id) => {
    try {
      const url = "/libro.pdf"; // Reemplaza luego con: const blob = await obtenerPDF(id)
      setPdfURL(url);
      setPageNumber(1);
      await renderPDF(url, 1);
      toast.success("PDF cargado");
    } catch (e) {
      toast.error("No se pudo cargar el PDF");
      console.error(e);
    }
  };

  const siguiente = () => {
    if (pageNumber < numPages) {
      const nuevaPagina = pageNumber + 1;
      setPageNumber(nuevaPagina);
      renderPDF(pdfURL, nuevaPagina);
    }
  };

  const anterior = () => {
    if (pageNumber > 1) {
      const nuevaPagina = pageNumber - 1;
      setPageNumber(nuevaPagina);
      renderPDF(pdfURL, nuevaPagina);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  return (
    <>
      <Nav />
      <div style={{ padding: "20px" }}>
        <HeaderSeccion size={"14px"} titulo={"BIBLIOTECA"} />

        {pdfURL ? (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-full flex justify-center items-center overflow-x-auto">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border rounded shadow"
              />
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={anterior}
                disabled={pageNumber <= 1}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                ⬅ Anterior
              </button>
              <span className="text-sm">
                Página {pageNumber} de {numPages}
              </span>
              <button
                onClick={siguiente}
                disabled={pageNumber >= numPages}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Siguiente ➡
              </button>
            </div>
            <button
              onClick={() => setPdfURL(null)}
              className="mt-4 text-sm text-red-500 underline"
            >
              🔙 Volver a la biblioteca
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-wrap py-4 gap-6">
            {libros.map((libro, i) => (
              <div key={i} className="relative group">
                <CardLibro libro={libro} onClick={() => ejecutar(libro.id)} />
                <div className="absolute inset-0 bg-[#0B357F] opacity-0 group-hover:opacity-95 transition-all z-10 flex justify-center items-center rounded pointer-events-none">
                  <p className="font-bold text-white select-none">Leer</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
