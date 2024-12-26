import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import PropTypes from 'prop-types';


import Swal from 'sweetalert2';

// Configuracion del Toast
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

const AuthContext = createContext();




// El provider es el que contienen los datos para usar en los demas componentes 
const AuthProvider = ({ children }) => {

    //Defino mis estados, estaran disponible en cualquier componente
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});





    //cuando cargue la aplicacion, verificar si el usuario esta autenticado
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('No hay token disponible');
                setCargando(false);
                return;
            }

            // Leer el tokens 
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };


            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil', config);

                setAuth(data);


            } catch (error) {
                console.log('Error al autenticar:', error);
                // si en caso de error se crea un objeto vacio, y no este atenticado el usuario
                setAuth({});
            }

            setCargando(false);
        };

        autenticarUsuario();
    }, []);

    // Cerrar cesion 
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    //Actualizar Perfil
    const handleActualizarPerfil = async (datosPerfil) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No hay token disponible');
            return;
        }

        // Leer el token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = `/veterinarios/perfil/${datosPerfil._id}`;

            const { data } = await clienteAxios.put(url, datosPerfil, config);

            Toast.fire({
                icon: 'success',
                title: '¡Perfil actualizado con éxito!'
            });

            return { success: true, data };

        } catch (error) {
            //  mostrar el mensaje si hay error
            const errorMsg = error.response?.data?.msg || 'Hubo un error al actualizar el perfil';

            Toast.fire({
                icon: 'error',
                title: errorMsg
            });

            return { success: false, error: errorMsg };
        }
    }


    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return {
                message: 'No hay token disponible',
                error: true
            };
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                message: data.msg,
                error: false
            };

        } catch (error) {
            return {
                message: error.response?.data?.msg || 'Error al actualizar contraseña',
                error: true
            };
        }
    };



    return (
        <AuthContext.Provider

            // retorna un objeto, que pone disponible puede ser cualquier valor
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                handleActualizarPerfil,
                guardarPassword
            }}

        >
            {children}
        </AuthContext.Provider>
    );
};



// Validacion de PropTypes
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



export {
    AuthProvider
};

export default AuthContext;
