import { AdminNavbar } from "../components/AdminNavbar";
import { Alerta } from '../components/Alerta';
import { useState } from 'react';

import useAuth from '../hooks/useAuth';



export const CambiarPassword = () => {


    const { guardarPassword } = useAuth();


    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                message: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        // Validar longitud de la nueva contraseña
        if (password.newPassword.length < 8) {
            setAlerta({
                message: 'La contraseña debe tener al menos 8 caracteres',
                error: true
            });
            return;
        }

        // Llamar a la función para guardar la nueva contraseña
        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);

        // Si no hay error, limpiar el formulario y quitar la alerta
        if (!respuesta.error) {
            setPassword({
                currentPassword: '',
                newPassword: ''
            });

            setTimeout(() => {
                setAlerta({});
            }, 5000);
        }
    };




    const { message } = alerta;

    return (
        <>
            <AdminNavbar />
            <div className="bg-body-secondary mb-5 pb-5">
                <div className="container-xl mt-5 mb-5 p-4">
                    <div className="w-50 offset-3 text-center mb-4">
                        <h2 className="fw-bold fs-1">Cambiar Contraseña</h2>
                        <p className="fw-bold">
                            Modifica tu <span className="text-primary">contraseña aquí</span>
                        </p>
                    </div>

                    <div className="col-12 col-lg-6 mx-auto rounded p-2 bg-light shadow">
                        {message && <Alerta alerta={alerta} />}
                        <form onSubmit={handleSubmit} className="p-2">
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label fw-bold text-dark">
                                    Contraseña Actual
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                                    className="form-control w-100 p-2 mt-2 bg-body-secondary"
                                    placeholder="Escribe tu contraseña actual"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label fw-bold text-dark">
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                                    className="form-control w-100 p-2 mt-2 bg-body-secondary"
                                    placeholder="Actualiza tu contraseña"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary px-2 py-2 w-100 my-3"
                            >
                                Cambiar Contraseña
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
