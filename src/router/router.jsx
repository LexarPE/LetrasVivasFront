// 6.


import { createBrowserRouter } from "react-router-dom";

import Inicio from "../pages/Inicio";
import LogReg from "../pages/LoginRegistro";
import DetalleLibro from "../pages/DetalleLibro";
import FavoritosPage from "../pages/FavoritosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <Nav />
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
        // loader: ...
      },
      {
        path: "favoritos",
        element: <FavoritosPage />,
      },
    ],
  },
]);
