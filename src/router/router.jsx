// 6.


import { createBrowserRouter } from "react-router-dom";


import Inicio from "../pages/Inicio";
import LogReg from "../pages/LoginRegistro"; // Colocar como ruta inicial
import DetalleLibro from "../pages/DetalleLibro"; 

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <Nav />,
    children: [
      {
        index: true,
        element: <Inicio/>,
      },
      {
        path: "logReg",
        element: <LogReg />,
      },
      {
        path: "libros/:id",
        element: <DetalleLibro />,
        // loader: //funcion fetch    ===> useLoaderData() en DetalleLibro.jsx para obtener datos
      },
    ],
  },
]);