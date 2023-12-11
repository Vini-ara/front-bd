import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/login";
import { Livros } from "./pages/livros";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="login" element={<Login />} />
      <Route path="livros" element={<Livros />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
