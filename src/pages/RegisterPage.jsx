//acá importamos lo mismo que en loginPage.jsx.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'useForm';

//creamos el componente RegisterPage que es la página de registro de usuarios
export const RegisterPage = () => {
//usamos el custom hook useForm para manejar el estado del formulario de registro, inicializando los campos username, email, password y bio como cadenas vacías
    const { username, email, password, bio, handleInputChange, handleReset } = useForm({
        username: '', email: '', password: '', bio: ''
    });
//agregamos los estados locales isLoading, validationErrors y serverMessage para manejar el estado de carga, los errores de validación y los mensajes del servidor respectivamente
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
//usamos el hook useNavigate para poder navegar a otra ruta sin recargar la página
    const navigate = useNavigate();
//está es la función que va a enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
//ponemos isLoading en true porque vamos a empezar a cargar los datos
        setIsLoading(true);
//reseteamos los errores de validación para que no se muestren errores anteriores
        setValidationErrors([]);
//reseteamos el mensaje del servidor para que no se muestre un mensaje anterior
        setServerMessage({ type: '', text: '' });

        try {
//hacemos la petición al servidor usando fetch, enviando los datos del formulario en el body de la petición
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
//acá le decimos al servidor que le estamos enviando un JSON
                headers: { 'Content-Type': 'application/json' },
//acá se convierte el objeto en una cadena JSON para enviarlo al servidor, incluyendo el objeto profile con la bio del usuario
                body: JSON.stringify({ username, email, password, profile: { bio } })
            });
//convertimos la respuesta a JSON para poder manejarla
            const data = await response.json();
//si la respuesta es ok o el código de estado es 201 (creado), reseteamos el formulario, mostramos un mensaje de éxito y redirigimos a la página de login después de 2 segundos
            if (response.ok || response.status === 201) {
//reseteamos el formulario para que los campos queden vacíos
                handleReset(); 
//acá lo mandamos al login despues de 2 segundos porque si no, lo enviaría instantáneamente y no le daría tiempo al usuario de leer el mensaje de éxito
                setServerMessage({ type: 'success', text: 'Registro exitoso. Redirigiendo...' });
                setTimeout(() => navigate('/login'), 2000);
            } else if (response.status === 400) {
//si el código de estado es 400 (bad request), mostramos los errores de validación que nos devuelve el servidor, o un mensaje genérico si no hay errores específicos
                setValidationErrors(data.errors || [{ msg: data.message || 'Datos inválidos' }]);
            } else {
                setServerMessage({ type: 'error', text: data.message || 'Error del servidor (500)' });
            }
        } catch (err) {
//si hay algún error en la petición, lo capturamos y actualizamos el estado de error con un mensaje genérico
            setServerMessage({ type: 'error', text: 'Error de red. Verifique la conexión.' });
        } finally {
//y por ultimo ponemos isLoading en false para indicar que la petición terminó, haya sido exitosa o no
            setIsLoading(false);
        }
    };
//retornamos el JSX que representa la página de registro con un título, un mensaje de error o éxito, un formulario con campos de usuario, email, contraseña y biografía, un botón de envío y un enlace a la página de login
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Crear Cuenta</h2>
//si serverMessage.text tiene un valor, mostramos un mensaje con estilo según el tipo de mensaje (error o éxito)
                {serverMessage.text && (
                    <div className={`p-3 mb-6 rounded text-sm text-center font-medium ${serverMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {serverMessage.text}
                    </div>
                )}
//si validationErrors tiene algún valor, mostramos una lista de errores de validación con estilo
                {validationErrors.length > 0 && (
                    <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-3 mb-6 rounded text-sm">
                        <ul className="list-disc pl-5">
//mapeamos cada error de validación para mostrar su mensaje en un elemento li, usando el índice como key
                            {validationErrors.map((err, i) => (
                                <li key={i}>{err.msg}</li>
                            ))}
                        </ul>
                    </div>
                )}
//el onsubmit del formulario llama a la función handleSubmit que maneja el envío del formulario y el estado de carga y error
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
//el input de usuario recibe el valor del estado y actualiza el estado cuando el usuario escribe
                        <input type="text" name="username" value={username} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//el input de email recibe el valor del estado y actualiza el estado cuando el usuario escribe
                        <input type="email" name="email" value={email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
//el input de contraseña recibe el valor del estado y actualiza el estado cuando el usuario escribe
                        <input type="password" name="password" value={password} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required minLength="6" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
//el textarea de biografía recibe el valor del estado y actualiza el estado cuando el usuario escribe
                        <textarea name="bio" value={bio} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="3"></textarea>
                    </div>
//el botón de envío del formulario está deshabilitado cuando isLoading es true, y muestra un texto diferente según el estado de cargajJ
                    <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white font-bold p-3 rounded-md hover:bg-green-700 transition disabled:opacity-50 mt-4">
                        {isLoading ? 'Registrando...' : 'Registrarme'}
                    </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Inicia Sesión</Link>
                </div>
            </div>
        </div>
    );
};