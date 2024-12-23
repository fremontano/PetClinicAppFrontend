import { useEffect, useState } from "react";
import { AdminNavbar } from "../components/AdminNavbar";
import useAuth from "../hooks/useAuth";
import { Alerta } from '../components/Alerta';

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



export const EditarPerfil = () => {

    const { auth, handleActualizarPerfil } = useAuth();

    // Estados
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    // Llenar el formulario con datos iniciales del usuario autenticado
    useEffect(() => {
        setPerfil(auth);
    }, [auth]);


    // Manejar envio del formulario
    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;

        if ([nombre, email].includes('')) {
            setAlerta({
                message: 'Los campos nombre y correo son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 2500);

            return;
        }

        //   handleActualizarPerfil
        const { success, error } = await handleActualizarPerfil({ ...perfil, web: perfil.web || '' });


        if (error) {
            setAlerta({
                message: error,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 2500);

            return;
        }

        // Mostrar mensaje, si la actualizacion es exitosa
        if (success) {
            Toast.fire({
                icon: 'success',
                title: '¡Perfil actualizado con éxito!'
            });

            // Limpiar formulario
            setPerfil({
                nombre: '',
                email: '',
                telefono: '',
                web: ''
            });
        }
    };




    const { message } = alerta;

    return (
        <div className="bg-body-secondary mb-5 pb-5">
            <AdminNavbar />

            <div className="container-xl mt-5 mb-5">
                <div className="w-50 offset-3 text-center mb-4">
                    <h2 className="fw-bold fs-1">Editar Perfil</h2>
                    <p className="fw-bold">
                        Modifica tu <span className="text-primary">información aquí</span>
                    </p>
                </div>

                {/* Formulario */}
                <div className="col-12 col-lg-6 mx-auto rounded p-2 bg-light shadow">

                    {/* Mostrar alerta */}
                    {message && <Alerta alerta={alerta} />}

                    <form
                        onSubmit={handleSubmit}
                        className="p-2">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label fw-bold text-dark text-uppercase">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                                className="form-control w-100 p-2 mt-2 bg-body-secondary"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="correoElectronico" className="form-label fw-bold text-dark">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                                className="form-control w-100 p-2 mt-2 bg-body-secondary"
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="sitioWeb" className="form-label fw-bold text-dark">Sitio Web</label>
                            <input
                                type="text"
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                                className="form-control w-100 p-2 mt-2 bg-body-secondary"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label fw-bold text-dark">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                                className="form-control w-100 p-2 mt-2 bg-body-secondary"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary px-2 py-2 w-100 my-3"
                        >
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


// Mapea los campos con este nombre de la propiedad name ->  name="nombre"
// onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}