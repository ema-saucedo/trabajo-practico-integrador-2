//importamos esto para poder navegar sin tener que recargar la página y para forzar la navegación a otra ruta
import { Link, useNavigate } from "react-router";
//creamos el componente Navbar que es una barra de navegación que se muestra en todas las páginas
export const Navbar = () => {
//usamos el hook useNavigate para poder navegar a otra ruta sin recargar la página
    const navigate = useNavigate();
//creamos la función handleLogout que se encarga de cerrar la sesión del usuario
    const handleLogout = async () => {
//
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
//atrapamos los posibles errores que puedan ocurrir al hacer la petición al servidor y los mostramos en la consola
        } catch (error) {
            console.error("Error en el servidor al cerrar sesión", error);
//finalmente, eliminamos el item "isLogged" del localStorage y navegamos a la página de login
        } finally {
            localStorage.removeItem("isLogged");
            navigate("/login");
        }
    };
//retornamos el JSX que representa la barra de navegación con un enlace al inicio y un botón para cerrar sesión
    return (
        <nav className="bg-slate-800 p-4 text-white flex justify-between items-center shadow-md">
            <Link to="/" className="font-bold text-xl hover:text-blue-400 transition">
                DevBlog
            </Link>
            <button 
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded font-medium hover:bg-red-600 transition"
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};