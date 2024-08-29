import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const AdminRoute = () => {
  const { user, loading } = useAuth();

  console.log("User:", user);
  console.log("Is Admin:", user?.isAdmin);

  if (loading) return <h1>Loading...</h1>; // Mientras se carga la autenticación
  if (!user) return <Navigate to="/login" replace />; // Si no hay usuario, redirige a /login
  if (!localStorage.getItem("isAdmin"))
    return <Navigate to="/not-authorized" replace />; // Si el usuario no es admin, redirige a /not-authorized

  return <Outlet />; // Si todo está bien, muestra el componente hijo
};
