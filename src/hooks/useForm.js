import { useState } from "react";
//Con esta función manejamos el estado de los formularios de manera más sencilla y limpia.
export const useForm = (initialForm = {}) => {
// Creamos un estado para el formulario, inicializado con los valores que se pasen como argumento
    const [formState, setFormState] = useState(initialForm);
// Función para manejar los cambios en los inputs del formulario
    const handleInputChange = (e) => {
// Desestructuramos el evento para obtener el nombre y valor del input que se está modificando
        const { name, value } = e.target;
// Actualizamos el estado del formulario, manteniendo los valores anteriores y cambiando solo el que corresponde al input modificado
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };
// Función para resetear el formulario a su estado inicial
    const handleReset = () => {
// Reseteamos el estado del formulario a los valores iniciales
        setFormState(initialForm);
    };

    return {
        ...formState, // Desestructuramos para acceder más fácil a los campos
        formState,
        handleInputChange,
        handleReset
    };
};