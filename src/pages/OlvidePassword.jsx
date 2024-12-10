import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../../config/axios";

export const OlvidePassword = () => {
    // Estados 
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    // Funcion enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || email.length < 5) {
            setAlerta({ message: 'El Email es obligatorio', error: true });
            return;
        }


        try {

            const { data } = await clienteAxios.post('/veterinarios/olvido-password', { email });
            setAlerta({
                message: data.msg
            })


        } catch (error) {

            setAlerta({
                message: error.response.data.msg,
                error: true
            });

        }

    };

    const { message } = alerta;

    console.log(alerta);

    return (
        <main className="container">
            <div className="row min-vh-100">
                {/* Columna de texto */}
                <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold display-4 text-start">
                        <span className="text-primary">Recupera tu Acceso y no Pierdas</span>{' '}
                        tus pacientes
                    </h1>
                </div>

                {/* Columna del formulario */}
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">

                    {/* Mostrar mensaje */}
                    {message && (
                        <Alerta alerta={alerta} />
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="w-100">

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </div>
                    </form>
                    {/* Registrar */}
                    <nav className="d-flex w-100 flex-column flex-lg-row align-items-center justify-content-lg-between text-center justify-content-evenly align-items-start w-75 mt-5 py-2">
                        <Link to="/" className="mt-4 mt-lg-0 d-inline-block text-decoration-none text-small">Ya tienes una cuenta? Inicia Sesion</Link>
                    </nav>
                </div>
            </div>
        </main>
    );
};
