//importamos estos hooks de React para manejar el estado, los efectos y las funciones de callback
import { useState, useEffect, useCallback } from "react";
//creamos el hook useFetch que recibe una url como argumento
export const useFetch = (url) => {
//esto dice que el estado inicial de data es null porque no tenemos datos al principio, isLoading es true porque estamos cargando los datos y error es null porque no hay errores al inicio
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

//creamos la función fetchData que es asincrónica y se encarga de hacer la petición a la url
    const fetchData = useCallback(async () => {
//ponemos isLoading en true porque vamos a empezar a cargar los datos
        setIsLoading(true);
        try {
//hacemos la petición a la url usando fetch y le pasamos las credenciales para que incluya las cookies
            const response = await fetch(url, { credentials: 'include' });
//si la respuesta no es ok, lanzamos un error con un mensaje según el código de estado HTTP
            if (!response.ok) {
                if (response.status === 401) throw new Error("No autorizado. Inicie sesión.");
                if (response.status === 403) throw new Error("Falta de permisos.");
                if (response.status === 500) throw new Error("Error interno del servidor.");
//si no es ninguno de esos casos, lanzamos un error genérico
                throw new Error("Error al obtener los datos");
            }
//si la respuesta es ok, convertimos la respuesta a JSON y actualizamos el estado de data con los datos obtenidos
            const result = await response.json();
            setData(result);
//si hay algún error en la petición, lo capturamos y actualizamos el estado de error con el mensaje del error
        } catch (err) {
            setError(err.message);
        } finally {
// finally asegura que el loading termine, haya error o éxito
            setIsLoading(false);
        }
    }, 
//el array de dependencias de useCallback es [url] porque la función fetchData depende de la url que se pasa como argumento al hook
    [url]); 

//usamos useEffect para invocar la función fetchData cuando el componente se monta o cuando la url cambia
    useEffect(() => {
        fetchData();
    },
//el array de dependencias es fetchData lo que significa que solo se va a volver a ejecutar si la url cambia, ya que fetchData depende de url y se memoriza con useCallback 
    [fetchData]);
//retornamos un objeto con los datos obtenidos, el estado de carga y el estado de error para que el componente que use este hook pueda acceder a ellos
    return { data, isLoading, error };
};