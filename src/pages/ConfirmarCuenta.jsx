import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alerta } from "../components/Alerta";
import clienteAxios from "../../config/axios";


export const ConfirmarCuenta = () => {

    // extraer token de la url 
    const params = useParams();
    const { id } = params;


    // Estados 
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});



    useEffect(() => {

        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`

                const { data } = await clienteAxios(url);
                setCuentaConfirmada(true);

                setAlerta({
                    message: data.message,
                    error: true
                });
            } catch (error) {
                setAlerta({ message: error.response.data.msg, error: true })
            }

            setCargando(false);
        }

        confirmarCuenta();

    }, [id])


    return (
        <main className="container">
            <div className="row d-flex align-align-items-center vh-100">
                <div className="col-12 col-lg-6 d-flex align-items-center p-2 ">
                    <h1 className="fw-bold display-4 text-start">
                        <span className="text-primary">Confirma tu cuenta y comienza a administrar</span>{' '}
                        tus pacientes
                    </h1>
                </div>

                {/* token  */}
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center  ">
                    <div className="w-100 text-center p-3 ">
                        {!cargando && <Alerta alerta={alerta} />}


                        {cuentaConfirmada && (
                            <Link to="/" className="mt-5 mt-lg-0 d-inline-block text-decoration-none text-small bg-primary text-white w-100 p-2 rounded">
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>

        </main>
    )
}
