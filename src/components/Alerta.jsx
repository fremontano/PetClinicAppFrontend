import PropTypes from 'prop-types';

export const Alerta = ({ alerta }) => {
    return (
        <div
            className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} text-white p-2 w-100 rounded text-center`}
        >
            {alerta.message}
        </div>
    );
};


Alerta.propTypes = {
    alerta: PropTypes.shape({
        message: PropTypes.string.isRequired,
        error: PropTypes.bool.isRequired,
    }).isRequired,
};
