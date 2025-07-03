// 6.

import { createBrowserRouter } from "react-router-dom";

import Inicio from "../pages/Inicio";
import LogReg from "../pages/LoginRegistro"; // Colocar como ruta inicial
import DetalleLibro from "../pages/DetalleLibro";
import Catalogo from "../pages/Catalogo";
import Pedidos from "../pages/Pedidos";
import Favoritos from "../pages/Favoritos";
import RutaPrivada from "../components/RutaPrivada";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <Nav />,
    children: [
      {
        index: true,
        element: <Inicio />,
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
      {
        path: "catalogo",
        element: <Catalogo />,
      },
      {
        path: "biblioteca",
        element: (
          <RutaPrivada>
            <Pedidos />
          </RutaPrivada>
        ),
      },
      {
        path: "favoritos",
        element: (
        <RutaPrivada>
          <Favoritos />
        </RutaPrivada>
      )
      },
    ],
  },
]);
