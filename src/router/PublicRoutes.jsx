//importamos Navigate de react-router para redirigir a la página de home si el usuario ya está logueado
import { Navigate } from "react-router";
//creamos el componente PublicRoutes que recibe como prop children, que son los componentes que se van a renderizar si el usuario NO está logueado
export const PublicRoutes = ({ children }) => {
    const isLogged = localStorage.getItem("isLogged") === "true";

    // Si NO está logueado, lo deja ver el Login/Registro. Si ya entró, lo redirige al Home.
    return !isLogged ? children : <Navigate to="/" replace />;
};