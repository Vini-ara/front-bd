import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/login";
import { GerenciarItens } from "./pages/gerenciarItens";
import { Itens } from "./pages/itens";
import { Cadastro } from "./pages/cadastro";
import { AuthContextProvider } from "./hooks/auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="itens" element={<Itens />} />
      <Route path="gerenciar-itens" element={<GerenciarItens />} />
      <Route path="cadastro" element={<Cadastro />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
  );
}

export default App;
