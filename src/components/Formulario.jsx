import { useState } from "react";
import { Alerta } from '../components/Alerta';
import usePacientes from "../hooks/usePacientes";

export const Formulario = () => {

    // Estado para el formulario
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [sintomas, setSintomas] = useState('');


    // Estado para la alerta
    const [alerta, setAlerta] = useState({});

    //provider retorna un objeto
    const { pacientes, guardarPacientes } = usePacientes();





    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar formulario
        if ([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
            setAlerta({
                message: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }


        // Guardar a travez de un objeto los datos  
        guardarPacientes({ nombre, propietario, email, fechaAlta, sintomas });

        setAlerta({});
        // Limpiar formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFechaAlta(Date.now());
        setSintomas('');


    };


    // extraer 
    const { message } = alerta;


    return (
        <div className="bg-white p-4 shadow mb-3 rounded">
            <h2 className="fw-bolder  text-primary text-center ">Administrador de  Pacientes </h2>
            <p className="fw-bold text-center my-3">
                Añade tus pacientes y{' '}
                <span className="text-primary">Administralos</span>
            </p>

            {/* mostrar alerta  */}
            {message && <Alerta alerta={alerta} />}

            <form
                onSubmit={handleSubmit}
                className="mt-2  p-2"
            >
                {/* Nombre de la Mascota */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-bold text-dark">Nombre de la Mascota</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="form-control w-100 p-2 mt-2 bg-light"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                {/* Propietario */}
                <div className="mb-3">
                    <label htmlFor="propietario" className="form-label fw-bold text-dark">Propietario</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="form-control w-100 p-2 mt-2 bg-light"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                {/* Email Propietario */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold text-dark">Correo Electrónico </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Correo del propietario"
                        className="form-control w-100 p-2 mt-2 bg-light"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Fecha de Alta */}
                <div className="mb-3">
                    <label htmlFor="fechaAlta" className="form-label fw-bold text-dark">Fecha de Alta</label>
                    <input
                        id="fechaAlta"
                        type="date"
                        placeholder="dd/mm/aaaa"
                        className="form-control w-100 p-2 mt-2 bg-light"
                        value={fechaAlta}
                        onChange={e => setFechaAlta(e.target.value)}
                    />
                </div>
                {/* Sintomas */}
                <div className="mb-3">
                    <label htmlFor="fechaAlta" className="form-label fw-bold text-dark">Sintomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="form-control w-100 p-2 mt-2 bg-light"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                {/* Boton de Enviar */}
                <div className="text-center d-grid">
                    <input
                        value='Agregar paciente'
                        className="text-white btn btn-primary"
                        type="submit" />
                </div>
            </form>
        </div>
    )
}
