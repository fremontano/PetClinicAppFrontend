import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">


                <div className='d-flex'>
                    <Link to="/admin/perfil" className="nav-link fw-bold text-dark mx-0">
                        Ir a Perfil
                    </Link>
                    <Link to="/admin/cambiar-password" className="nav-link fw-bold text-dark mx-3">
                        Cambiar Contraseña
                    </Link>
                </div>
            </div>
        </nav>
    );
};
