import { useEffect, useState } from "react";
import { Alerta } from '../components/Alerta';
import usePacientes from "../hooks/usePacientes";

export const Formulario = () => {

    // Estado del formulario
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setid] = useState(null);

    // mensaje alerta 
    const [alerta, setAlerta] = useState({});

    //provider retorna un objeto
    const { pacienteObj, handleGuardaPaciente } = usePacientes();



    useEffect(() => {

        if (pacienteObj?.nombre) {
            setNombre(pacienteObj.nombre);
            setPropietario(pacienteObj.propietario);
            setEmail(pacienteObj.email);
            setFechaAlta(pacienteObj.fechaAlta);
            setSintomas(pacienteObj.sintomas);
            setid(pacienteObj._id);
        }

    }, [pacienteObj]);



    // validar formulario 
    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
            setAlerta({
                message: 'Todos los campos son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 2500);
            return;
        }


        handleGuardaPaciente({ nombre, propietario, email, fechaAlta, sintomas, id });

        // Limpiar formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFechaAlta('');
        setSintomas('');
        setid(null);
    }








    // extraer 
    const { message } = alerta;



    return (
        <>


            {/* mostrar alerta  */}
            {message && <Alerta alerta={alerta} />}


            <form
                onSubmit={handleSubmit}

                className="mt-2  p-3 bg-body rounded"
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
                        className="btn btn-primary px-2"
                        value={id ? 'Guardar Cambios' : 'Agregar paciente'}
                        type="submit"
                    />

                </div>
            </form>
        </>
    )
}
