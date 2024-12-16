import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import PropTypes from 'prop-types';

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


    return (
        <AuthContext.Provider

            // retorna un objeto, que pone disponible puede ser cualquier valor
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
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
