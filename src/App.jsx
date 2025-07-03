import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { UserProvider } from "./context/UserContext.jsx";
import { LibrosProvider } from "./context/LIbrosContext.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <LibrosProvider>
          <CarritoProvider>
            <RouterProvider router={router} />
          </CarritoProvider>
        </LibrosProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
