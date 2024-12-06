import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../../config/axios";


export const Registrar = () => {
    // Estado para los campos
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    // Estado para el mensaje de alerta
    const [alerta, setAlerta] = useState({});

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ message: 'Hay campos vacíos', error: true });
            return;
        }

        // Validación de contraseñas iguales
        if (password !== repetirPassword) {
            setAlerta({ message: 'Las contraseñas no son iguales', error: true });
            return;
        }

        // Validación de longitud de la contraseña
        if (password.length < 5) {
            setAlerta({ message: 'La contraseña debe tener al menos 5 caracteres', error: true });
            return;
        }


        // Limpiar los campos
        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');

        // Quitar el mensaje
        setTimeout(() => {
            setAlerta({});
        }, 4000);

        // Crear usuario en la api
        try {

            // Datos del veterinario
            const veterinario = { nombre, email, password };

            // Realizar la solicitud POST
            await clienteAxios.post('/veterinarios', veterinario, {
                headers: { 'Content-Type': 'application/json' }
            });
            setAlerta({
                message: 'Usuario Creado exitosamente revisa Tu Email',
                error: false
            });
        } catch (error) {
            setAlerta({
                message: error.response.data.msg,
                error: true
            })
        }

    };



    // Extraer el mensaje de la alerta
    const { message } = alerta;

    return (
        <main className="container">
            <div className="row min-vh-100">
                {/* Columna de texto */}
                <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold display-4 text-start">
                        <span className="text-primary">Crea una cuenta y administra</span> tus pacientes
                    </h1>
                </div>

                {/* Columna del formulario */}
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    {/* Mostrar la alerta */}
                    {message && <Alerta alerta={alerta} />}

                    <form
                        onSubmit={handleSubmit}
                        className="w-100">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="repetirPassword" className="form-label fw-bold">Repetir Contraseña</label>
                            <input
                                type="password"
                                id="repetirPassword"
                                className="form-control w-100"
                                value={repetirPassword}
                                onChange={(e) => setRepetirPassword(e.target.value)}
                                placeholder="Repite tu contraseña"
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
                        </div>
                    </form>

                    {/* Enlaces adicionales */}
                    <nav className="d-flex w-100 flex-column flex-lg-row align-items-center justify-content-lg-between text-center justify-content-evenly w-75 mt-5 py-2">
                        <Link to="/" className="mt-4 mt-lg-0 d-inline-block text-decoration-none text-small">
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                        <Link to="/olvide-password" className="mt-3 mt-lg-0 d-inline-block text-decoration-none text-small">
                            Olvidé mi contraseña
                        </Link>
                    </nav>
                </div>
            </div>
        </main>
    );
};
