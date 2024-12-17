import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Agrega esta línea
import clienteAxios from "../../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);


    //Cuando cargue el componente se va a ejecutar, consulta api y trae los resultados
    useEffect(() => {

        const obtenerPacientes = async () => {
            try {

                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Obtener informacion de cliente con axios 
                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes();
    }, []);






    // insertar en la api 
    const guardarPacientes = async (paciente) => {
        try {
            // Obtener el token del localStorage para autenticación
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            // Hacer la petición POST a la API
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            // Eliminar datos innecesarios de la respuesta
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

            // Actualizar el estado con el nuevo paciente
            setPacientes((prevPacientes) => [...prevPacientes, pacienteAlmacenado]);

        } catch (error) {
            console.log(error.response?.data?.msg || "Error al guardar el paciente");
        }
    };


    return (
        <PacientesContext.Provider value={{
            pacientes,
            guardarPacientes,
        }}>
            {children}
        </PacientesContext.Provider>
    );
};

PacientesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PacientesProvider };

export default PacientesContext;
