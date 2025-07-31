import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import LibroProvider from "./context/LibroProvider.jsx";
import CarritoProvider from "./context/CarritoProvider.jsx";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <LibroProvider>
          <RouterProvider router={router} />
        </LibroProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
