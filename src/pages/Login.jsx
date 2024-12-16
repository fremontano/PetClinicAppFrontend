import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alerta } from '../components/Alerta';
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";

export const Login = () => {

    // mis estados 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();



    // Funcion navegar al usuario 
    const navigate = useNavigate();






    const handleSubmit = async (e) => {
        e.preventDefault();

        //validar
        if ([email, password].includes('')) {
            setAlerta({
                message: 'Todos los campos son obligatorio',
                error: true
            });
            //para que no ejecute las siguientes lineas
            return;
        }

        //peticion a la url
        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });

            // guardar el token 
            localStorage.setItem('token', data.token);

            setAuth(data);
            //si los datos estan ok, navegar
            navigate('/admin')

        } catch (error) {
            setAlerta({
                message: error.response.data.msg,
                error: true
            })

            console.log(error)
        }


    }





    const { message } = alerta;

    return (

        <>
            <main className="d-flex align-items-center justify-content-center vh-100">
                <div className="main-container row w-100 mx-auto shadow-lg rounded overflow-hidden">

                    <div className="col-12 col-lg-6 d-none d-lg-flex flex-column justify-content-end align-items-center p-4 background-image">
                        <h1 className="display-5 fw-bold text-white text-center">Inicia Sesión</h1>
                        <h3 className="fs-6 fw-bold text-white text-center">Y administra tus pacientes</h3>
                    </div>

                    {/* Formulario  */}
                    <div className="col-12 col-lg-6 bg-light d-flex flex-column justify-content-center align-items-center p-4">

                        {/* si existe mensaje  */}
                        {message && <Alerta alerta={alerta} />}


                        <form
                            onSubmit={handleSubmit}
                            className="w-100"
                        >
                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Dirección de email</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ingresa Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Contraseña */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Ingresa Contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Enviar</button>
                        </form>


                        {/* Registrar  */}
                        <nav className="d-flex  flex-column text-center justify-content-evenly align-items-start w-75 mt-5 py-2 ">
                            <Link to="/registrar" className="mt-4 mt-lg-0 d-inline-block text-decoration-none text-small ">¿No tienes una cuenta? Regístrate</Link>
                            <Link to="/olvide-password" className="mt-3  d-inline-block text-decoration-none text-small ">Olvidé mi contraseña</Link>
                        </nav>

                    </div>
                </div>
            </main>


        </>
    )
}
