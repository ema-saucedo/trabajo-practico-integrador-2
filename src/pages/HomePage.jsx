//importamos el custom hook useFetch que nos permite hacer peticiones a una API y manejar el estado de carga y error
import { useFetch } from '../hooks/useFetch';
//declaramos el componente HomePage que es la página principal de la aplicación
export const HomePage = () => {
//usamos el custom hook useFetch para hacer una petición a la API de artículos y obtener los datos, el estado de carga y el estado de error
    const { data, isLoading, error } = useFetch('http://localhost:3000/api/articles');
    //el backend devuelve un objeto { articles: [...] }, nos aseguramos de obtener el array
    const articles = Array.isArray(data) ? data : (data?.articles || []);

//retornamos el JSX que representa la página principal con un título, un mensaje de carga, un mensaje de error y una lista de artículos
    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Últimos Artículos</h1>
{/*si isLoading es true, mostramos un mensaje de carga con animación*/}
            {isLoading && <p className="text-blue-500 font-semibold animate-pulse">Cargando artículos...</p>}
{/*si error tiene un valor, mostramos un mensaje de error con estilo */}
            {error && <p className="text-red-500 font-semibold bg-red-100 p-3 rounded">{error}</p>}
{/*si isLoading es false y no hay artículos, mostramos un mensaje indicando que no hay artículos publicados */}
            {!isLoading && articles.length === 0 && (
                <p className="text-gray-500 italic">No hay artículos publicados en este momento.</p>
            )}
{/*si hay artículos, mostramos una lista de artículos con estilo*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article.id} className="border border-gray-200 p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition">
{/*usamos el operador de encadenamiento opcional para evitar errores si article.author es null o undefined, y mostramos el nombre de usuario del autor o "Anónimo" si no hay autor*/}
                        <h2 className="text-xl font-bold text-slate-800 mb-2">{article.title}</h2>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <p className="text-sm font-medium text-blue-600">
                            Autor: {article.author?.username || 'Anónimo'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};