import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Usar CDN del worker correcto
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.js`;

export default function LectorPDF({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(err) => console.error("Error al cargar PDF:", err)}
        loading={<p className="text-gray-500">Cargando PDF...</p>}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          ⬅ Anterior
        </button>
        <span className="text-sm">
          Página {pageNumber} de {numPages}
        </span>
        <button
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
