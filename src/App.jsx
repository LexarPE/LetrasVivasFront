import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import LibroProvider from "./context/LibroProvider.jsx";
import CarritoProvider from "./context/CarritoProvider.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AuthProvider>
        <CarritoProvider>
          <LibroProvider>
            <RouterProvider router={router} />
          </LibroProvider>
        </CarritoProvider>
      </AuthProvider>
      {/* Elemento necesario para cargar las notificaciones */}
      <ToastContainer/>
    </div>
  );
}

export default App;
