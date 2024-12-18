
import PropTypes from 'prop-types';
import usePacientes from '../hooks/usePacientes';

//  componente paciente para mostrar en la lista
export const Paciente = ({ paciente }) => {

    const { setEditar, eliminarPaciente } = usePacientes();


    const { _id, nombre, propietario, email, sintomas, fechaDeAlta } = paciente;


    // formatear fecha para mostrar al usuario, no muta el objeto
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        // Verificar si la fecha es válida
        if (isNaN(nuevaFecha)) {
            return 'Fecha inválida';
        }
        return new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(nuevaFecha);
    }


    return (
        <div className="bg-body shadow mx-3 my-4 p-3 rounded">
            <p className="fw-bold text-black-50">
                Nombre : {' '}
                <span className="fw-normal mx-2">{nombre}</span>
            </p>
            <p className="fw-bold text-black-50">
                Propietario : {' '}
                <span className="fw-normal mx-2">{propietario}</span>
            </p>
            <p className="fw-bold text-black-50">
                Correo Electronico : {' '}
                <span className="fw-normal mx-2">{email}</span>
            </p>
            <p className="fw-bold text-black-50">
                Fecha de Alta : {' '}
                <span className="fw-normal mx-2">{formatearFecha(fechaDeAlta)}</span>
            </p>
            <p className="fw-bold text-black-50">
                Sintomas : {' '}
                <span className="fw-normal mx-2">{sintomas}</span>
            </p>

            <div className=" w-75 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-primary py-1 px-3  text-white text-uppercase fw-bold text-small"
                    onClick={() => setEditar(paciente)}

                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-danger py-1 px-3 text-white text-uppercase fw-bold text-small"
                    onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>

            </div>
        </div >
    )
}

// Agregar validación de los props
Paciente.propTypes = {
    paciente: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        propietario: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        sintomas: PropTypes.string.isRequired,
        fechaDeAlta: PropTypes.string.isRequired,
    }).isRequired,
};