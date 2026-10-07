//acá importamos lo mismo que en HomePage.jsx, pero además importamos useForm que es un custom hook que nos permite manejar el estado de los formularios de manera más sencilla y limpia
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {
//usamos el custom hook useForm para manejar el estado del formulario de login, inicializando los campos email y password como cadenas vacías
    const { email, password, handleInputChange } = useForm({ email: '', password: '' });
//creamos dos estados locales isLoading y error para manejar el estado de carga y el estado de error del formulario
    const [isLoading, setIsLoading] = useState(false);
//creamos un estado local error para manejar el estado de error del formulario
    const [error, setError] = useState(null);
//usamos el hook useNavigate para poder navegar a otra ruta sin recargar la página
    const navigate = useNavigate();

//creamos la función handleSubmit que se encarga de manejar el envío del formulario de login
    const handleSubmit = async (e) => {
//acá evitamos que la pagina entera se recargue al enviar el formulario, y ponemos los estados del formulario en isLoading en true y error en null porque no tenemos errores al inicio
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
//hacemos la petición al servidor usando fetch, enviando los datos del formulario en el body de la petición y las credenciales para que incluya las cookies
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
//acá le decimos al servidor que le estamos enviando un JSON y que incluya las cookies en la petición
                headers: { 'Content-Type': 'application/json' },
//el stringify convierte el objeto de datos del formulario en una cadena JSON para enviarlo al servidor
                body: JSON.stringify({ email, password }),
//y esto es para las cookies, para que el servidor pueda reconocer al usuario y mantener la sesión iniciada
                credentials: 'include'
            });
            const data = await response.json().catch(() => null);

            //si la respuesta es ok, guardamos en el localStorage que el usuario está logueado y navegamos a la página principal, si no, mostramos un mensaje de error según el código de estado HTTP
            if (response.ok) {
                localStorage.setItem('isLogged', 'true');
                navigate('/'); 
            } else if (response.status === 401) {
                setError(data?.message || 'Credenciales incorrectas. Verifique su email y contraseña.');
            } else if (response.status === 400 && data?.errors?.length > 0) {
                setError(data.errors.map(e => e.msg).join('. '));
            } else {
                setError(data?.message || 'Error en el servidor. Intente más tarde.');
            }
//si hay algún error en la petición, lo capturamos y actualizamos el estado de error con un mensaje genérico
        } catch {
            setError('Error de red. Verifique la conexión.');
        } finally {
//finalmente ponemos isLoading en false para indicar que la petición terminó, haya sido exitosa o no
            setIsLoading(false);
        }
    };
//retornamos el JSX que representa la página de login con un título, un mensaje de error, un formulario con campos de email y contraseña, un botón de envío y un enlace a la página de registro
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Iniciar Sesión</h2>
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded text-sm">
                        {error}
                    </div>
                )}
{/* el onsubmit del formulario llama a la función handleSubmit que maneja el envío del formulario y el estado de carga y error */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
//el input de email recibe el valor del estado y actualiza el estado cuando el usuario escribe
                            type="email" name="email" value={email} onChange={handleInputChange} 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input 
//lo mismo ocurre con el input de contraseña, que recibe el valor del estado y actualiza el estado cuando el usuario escribe
                            type="password" name="password" value={password} onChange={handleInputChange} 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            required 
                        />
                    </div>
                    <button 
//el botón de envío del formulario está deshabilitado cuando isLoading es true, y muestra un texto diferente según el estado de carga
                        type="submit" disabled={isLoading}
                        className="w-full bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
{/* el texto del botón cambia según el estado de carga, mostrando "Ingresando..." cuando isLoading es true y "Entrar" cuando isLoading es false */}
                        {isLoading ? 'Ingresando...' : 'Entrar'}
                    </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};