// 6.


import { createBrowserRouter } from "react-router-dom";


import Inicio from "../pages/Inicio";
import LogReg from "../pages/LoginRegistro"; // Colocar como ruta inicial
import DetalleLibro from "../pages/DetalleLibro"; 
import Catalogo from "../pages/Catalogo";
import Categorias from "../pages/Categorias";
import Pedidos from "../pages/Pedidos";
import Favoritos from "../pages/Favoritos";



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
        path: "categorias",
        element: <Categorias/>
      },
      {
        path: "list-pedidos",
        element: <Pedidos/>
      },
      {
        path: "favoritos",
        element: <Favoritos/>
      }
    ],
  },
]);