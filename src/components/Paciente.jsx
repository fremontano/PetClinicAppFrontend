import PropTypes from 'prop-types';
import usePacientes from '../hooks/usePacientes';

export const Paciente = ({ paciente }) => {



    const { handleEditarPaciente, handleEliminarPaciente } = usePacientes();


    const { nombre, propietario, email, sintomas, fechaDeAlta, _id } = paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        if (isNaN(nuevaFecha)) return 'Fecha inválida';
        return nuevaFecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Santiago',
        });
    };


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
                Correo Electrónico : {' '}
                <span className="fw-normal mx-2">{email ? email : 'No registrado'}</span>
            </p>
            <p className="fw-bold text-black-50">
                Fecha de Alta : {' '}
                <span className="fw-normal mx-2">{formatearFecha(fechaDeAlta)}</span>
            </p>
            <p className="fw-bold text-black-50">
                Síntomas : {' '}
                <span className="fw-normal mx-2">{sintomas ? sintomas : 'Sin descripción'}</span>
            </p>

            {/* button  */}
            <div className=" w-75 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-primary py-1 px-3  text-white text-uppercase fw-bold text-small"
                    onClick={() => handleEditarPaciente(paciente)}


                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-danger py-1 px-3 text-white text-uppercase fw-bold text-small"
                    onClick={() => handleEliminarPaciente(_id)}

                >
                    Eliminar
                </button>

            </div>
        </div>
    );
};

Paciente.propTypes = {
    paciente: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        propietario: PropTypes.string.isRequired,
        email: PropTypes.string,
        sintomas: PropTypes.string,
        fechaDeAlta: PropTypes.string.isRequired,
    }).isRequired,
};
