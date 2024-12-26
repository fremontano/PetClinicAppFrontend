/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import PropTypes from "prop-types";
import useAuth from '../hooks/useAuth';


// Mensaje de exito 
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    // Arreglos de pacientes para el formulario
    const [pacientes, setPacientes] = useState([]);
    // Se crea este objeto paciente vacio para llenar o editar el formulario 
    const [pacienteObj, setPacienteObj] = useState({});

    const { auth } = useAuth();




    //Cargar el componente, y trae el resultado desde la api
    useEffect(() => {

        const obtenerPacientes = async () => {

            try {
                // consultar la api 
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
                if (Array.isArray(data.pacientes)) setPacientes(data.pacientes);


            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [auth]);


    //Guardar paciente
    const handleGuardaPaciente = async (paciente) => {

        if (paciente.id) {

            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Ruta Editar paciente
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                // Sincronizar los datos editados y mostrar en pantalla
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacienteActualizado);

            } catch (error) {
                console.log(error)
            }
        } else {

            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.post('/pacientes', paciente, config);

                const { __v, updatedAt, createdAt, ...pacienteAlmacenado } = data.pacienteAlmacenado;


                setPacientes((prevPacientes) => [pacienteAlmacenado, ...prevPacientes]);
                // Mostrar el mensaje de éxito
                Toast.fire({
                    icon: "success",
                    title: "Paciente agregado exitosamente"
                });

            } catch (error) {
                console.log(error);
            }
        }
    };


    //Editar pacinte
    const handleEditarPaciente = (pacienteObj) => {
        setPacienteObj(pacienteObj);
    }


    // Eliminar paciente
    const handleEliminarPaciente = async id => {
        // Mostrar alerta de confirmacion antes de eliminar
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-success'
            }
        });

        // Si el usuario confirma la eliminacion
        if (result.isConfirmed) {

            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Realizar la eliminacion en la API
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                // Filtrar el paciente eliminado de la lista
                const pacienteEliminar = pacientes.filter(prevPaciente => prevPaciente._id !== id);
                setPacientes(pacienteEliminar);

                // Mostrar alerta de exito
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El paciente ha sido eliminado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }

                });

            } catch (error) {
                console.log(error);

                // Mostrar alerta de error si ocurre algun problema
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el paciente. Inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Si el usuario cancela, muestra mensaje de cancelacion
            Swal.fire({
                title: 'Cancelado',
                text: 'El paciente no fue eliminado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };


    return (
        <PacientesContext.Provider value={{
            pacientes,
            pacienteObj,
            handleGuardaPaciente,
            handleEditarPaciente,
            handleEliminarPaciente,
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
