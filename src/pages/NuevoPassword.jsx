import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../../config/axios";

export const NuevoPassword = () => {
    // Estados
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);

    // para verificar url 
    const [passworsModificado, setPassworsModificado] = useState(false);


    // Extraer el token y verificarlo
    const { token } = useParams();

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                // Verificar si el token es valido
                await clienteAxios(`/veterinarios/olvido-password/${token}`);
                setAlerta({
                    message: 'Nuevo Contraseña',
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    message: 'Hubo un error en el enlace',
                    error: true,
                });
                console.log(error);
            }
        };

        if (token) {
            comprobarToken();
        }
    }, []);

    // Funcion para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || password.length < 5) {
            setAlerta({
                message: 'La contraseña debe tener al menos 5 caracteres',
                error: true,
            });
            return;
        }

        try {
            // Enviar la nueva contraseña al backend
            const url = `/veterinarios/olvido-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setPassworsModificado(true);

            // Verificar si el mensaje de éxito fue retornado correctamente
            setAlerta({
                message: data.msg || 'Contraseña cambiada con éxito',
                error: false,
            });
        } catch (error) {
            setAlerta({
                message: 'Hubo un error al restablecer la contraseña',
                error: true,
            });
            console.log(error);
        }
    };


    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100">
                {/* Columna de texto */}
                <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center text-lg-start text-center">
                    <h1 className="fw-bold display-4">
                        <span className="text-primary">Restablece tu Password y no Pierdas</span>{' '}
                        tus pacientes
                    </h1>
                </div>

                {/* Columna del formulario */}
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    {/* Mostrar alerta si hay un mensaje */}
                    {alerta.message && <Alerta alerta={alerta} />}

                    {/* Si el token es valido, mostrar el formulario */}
                    {tokenValido && (

                        <>
                            <form onSubmit={handleSubmit} className="w-100 mb-4">
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold ">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ingresa tu Nueva Contraseña"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Restablecer Contraseña
                                </button>
                            </form>

                            {/* retornar a inicio, si el password es modificado */}
                            {passworsModificado && <Link to="/" className="mt-4 mt-lg-0 d-inline-block text-decoration-none text-small">
                                Iniciar sesión
                            </Link>}

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
