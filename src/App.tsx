import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/login";
import { Livros } from "./pages/livros";
import { GerenciarItens } from "./pages/gerenciarItens";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="login" element={<Login />} />
      <Route path="livros" element={<Livros />} />
      <Route path="gerenciar-itens" element={<GerenciarItens />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
