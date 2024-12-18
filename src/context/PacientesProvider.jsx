import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Agrega esta línea
import clienteAxios from "../../config/axios";
// sweetalert2 
import Swal from 'sweetalert2';


const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);

    // actualizar paciente, mediante un objeto
    const [objPaciente, setObjPaciente] = useState({});

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
                console.log(error);
            }
        };
        obtenerPacientes();
    }, []);

    // insertar en la api 
    const guardarPacientes = async (paciente) => {
        if (paciente.id) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Ruta Editar paciente
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                // Sincronizar los datos editados y mostrar en pantalla
                setPacientes((prevPacientes) =>
                    prevPacientes.map((pacienteState) =>
                        pacienteState._id === data._id ? data : pacienteState
                    )
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Crear un nuevo paciente
                const { data } = await clienteAxios.post('/pacientes', paciente, config);

                // Eliminar datos innecesarios
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                // Actualizar el estado con el nuevo paciente
                setPacientes((prevPacientes) => [...prevPacientes, pacienteAlmacenado]);
            } catch (error) {
                console.log(error.response?.data?.msg || "Error al guardar el paciente");
            }
        }
    };


    // Editar paciente, le pasamos el objeto entero
    const setEditar = (paciente) => {
        setObjPaciente(paciente);
    };



    // eliminar paciente 
    const eliminarPaciente = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success mx-4",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const showAlert = (title, text, icon) => {
            swalWithBootstrapButtons.fire({
                title: title,
                text: text,
                icon: icon
            });
        };

        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Verificar si existe el token
                    const token = localStorage.getItem('token');
                    if (!token) {
                        return showAlert("Error", "No tienes permiso para eliminar este paciente. Inicia sesión.", "error");
                    }

                    // Configuracion para la solicitud
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    };

                    // Eliminar paciente desde el servidor
                    const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                    // Eliminar paciente del estado local
                    const pacienteEliminar = pacientes.filter(prevPaciente => prevPaciente._id !== id);
                    setPacientes(pacienteEliminar);

                    showAlert("¡Eliminado!", "El paciente ha sido eliminado.", "success");
                } catch (error) {
                    // Revisar el tipo de error
                    const errorMessage = error.response ? error.response.data.message : "No se pudo eliminar el paciente.";
                    showAlert("Error", errorMessage, "error");
                    console.log(error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                showAlert("Cancelado", "El paciente no se ha Eliminado", "error");
            }
        });
    };



    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPacientes,
                setEditar,
                objPaciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

PacientesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PacientesProvider };
export default PacientesContext;
