import { createBrowserRouter } from "react-router-dom";

import LogReg from "../pages/LogReg";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Catalogo from "../pages/Catalogo";
import RutaPrivada from "../components/RutaPrivada";
import Biblioteca from "../pages/Biblioteca";
import Favoritos from "../pages/Favoritos";


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "aceder",
        element: <LogReg />,
      },
      {
        path: "libro/:id",
        element: <Detalle />,
      },
      {
        path: "catalogo",
        element: <Catalogo />,
      },
      {
        path: "biblioteca",
        element: <RutaPrivada>
          <Biblioteca/>
        </RutaPrivada>,
      },
      {
        path: "favoritos",
        element: <RutaPrivada>
          <Favoritos/>
        </RutaPrivada>,
      },
    ],
  },
]);