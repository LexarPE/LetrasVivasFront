import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

export default function LectorPDFCanvas({ pdfUrl }) {
  const canvasRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const cargarPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);

      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      const page = await pdf.getPage(pageNumber);
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
    };

    cargarPDF().catch((err) => console.error("Error al cargar PDF:", err));
  }, [pdfUrl, pageNumber]);

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
