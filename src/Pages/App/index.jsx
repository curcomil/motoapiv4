import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "../Home";
import NotFound from "../NotFound";
import Login from "../LoginUser";
import Signup from "../Register";
import ProductPage from "../Details";
import "./App.css";
import Shopping_cart from "../Shopping_cart";
import OrderPages from "../Home/OrderPages/OrderPages";
import CostumerSer from "../Home/CostumerServicePage/CostumerSer";
import Editor_user from "../UserEditor";
import Productos from "../Productos";
import { AuthProvider } from "../../context/AuthContext";
import { ProtectedRoute, AdminRoute } from "../../routes";
import Shopping from "../Myshopping";
import MenuProducto from "../Menu_productos";
import { Pasarela } from "../Pasarela";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    { path: "/pasarela", element: <Pasarela /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/detail", element: <ProductPage /> },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/editoruser", element: <Editor_user /> },
        { path: "/serviceAtention", element: <CostumerSer /> },
        { path: "/shopping", element: <Shopping /> }, // Corregido a minúsculas
      ],
    },
    {
      element: <AdminRoute />,
      children: [
        { path: "/order", element: <OrderPages /> }, // Ruta para la página de órdenes
        { path: "/productos", element: <Productos /> }, // Ruta para el Dashboard de Admin
      ],
    },
    { path: "/carrito", element: <Shopping_cart /> },
    { path: "/menu", element: <MenuProducto /> }, // Corregido a minúsculas
  ]);
  return routes;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
