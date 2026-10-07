//importamos Navigate de react-router para redirigir a la página de login si el usuario no está logueado
import { Navigate } from "react-router";
//creamos el componente PrivateRoutes que recibe como prop children, que son los componentes que se van a renderizar si el usuario está logueado
export const PrivateRoutes = ({ children }) => {
    // Verificamos si la bandera isLogged existe y es "true" en localStorage
    const isLogged = localStorage.getItem("isLogged") === "true";

    // Si está logueado, renderiza la pantalla solicitada. Si no, lo manda al login.
    return isLogged ? children : <Navigate to="/login" replace />;
};