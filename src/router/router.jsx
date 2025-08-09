import { createBrowserRouter } from "react-router-dom";

import LogReg from "../pages/LogReg";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Catalogo from "../pages/Catalogo";
import RutaPrivada from "../components/RutaPrivada";
import Biblioteca from "../pages/Biblioteca";
import Favoritos from "../pages/Favoritos";

// Pago
import { Elements } from "@stripe/react-stripe-js";
import Pago from "../pages/Pago";
import { loadStripe } from "@stripe/stripe-js";
import PDFView from "../components/PDFView";
const stripePromise = loadStripe(
  "pk_test_51RpXVNC1Fs0061BHBke5Ca2uFw21zzrdtFVhYdF7cSUNzDc5KhnKNJw4Xt95GrtXXN0sbtr8UoF1lFKxdtOM8yCB009DEuMEph"
);


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
        element: (
          <RutaPrivada>
            <Biblioteca />
          </RutaPrivada>
        ),
      },
      {
        path: "viewPdf/:id",
        element : (
          <PDFView />
        )
      },
      {
        path: "favoritos",
        element: (
          <RutaPrivada>
            <Favoritos />
          </RutaPrivada>
        ),
      },
      {
        path: "pagar",
        element: (
          <RutaPrivada>
            <Elements stripe={stripePromise} >
              <Pago />
            </Elements>
          </RutaPrivada>
        ),
      },
    ],
  },
]);