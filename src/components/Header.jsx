import { Link } from "react-router-dom"; // Importa desde react-router-dom
import useAuth from "../hooks/useAuth";

export const Header = () => {
    const { cerrarSesion } = useAuth();

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <a className="navbar-brand text-center text-white fw-bold" href="#">
                        Administrador de Pacientes de <span>Veterinaria</span>
                    </a>

                    {/* Botón de navegación */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu */}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            <li className="nav-item">
                                <a className="nav-link text-center text-white" href="#">Paciente</a>
                            </li>
                            <li className="nav-item">
                                <Link to='/admin/perfil/' className="nav-link text-center text-white">Perfil</Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-link text-center text-white fw-bold"
                                    onClick={cerrarSesion}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
