import { useContext, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useParams } from "react-router-dom";
import { LibroContext } from "../context/Context";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFCanvasViewer() {
  const canvasRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const renderTaskRef = useRef(null); // 👈 Guardar la tarea de render
  const pdfRef = useRef(null);

  const libroProvider = useContext(LibroContext);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const cargarPDF = async () => {
      const libro = await libroProvider.libroBiblioteId(id);
      // const urlDeLibro ="/dummy.pdf";
      const urlDeLibro = libro.url_libro;

      const loadingTask = pdfjsLib.getDocument(urlDeLibro);
      const pdf = await loadingTask.promise;
      if (!isMounted) return;
      pdfRef.current = pdf;
      setNumPages(pdf.numPages);

      await renderPage(pdf, pageNumber);
    };

    cargarPDF().catch((err) => console.error("Error al cargar PDF:", err));

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [id]);

  useEffect(() => {
    if (pdfRef.current) {
      renderPage(pdfRef.current, pageNumber);
    }
  }, [pageNumber]);

  const renderPage = async (pdf, num) => {
    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel(); // 👈 Cancela render anterior
      } catch (e) {}
    }

    const page = await pdf.getPage(num);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    renderTaskRef.current = page.render(renderContext);
    await renderTaskRef.current.promise;
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="w-full flex justify-center items-center overflow-x-auto py-2.5">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto border rounded shadow"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ⬅ Anterior
        </button>
        <span>
          Página {pageNumber} de {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
