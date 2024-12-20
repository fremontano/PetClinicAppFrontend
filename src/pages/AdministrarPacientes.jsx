import { useState } from "react";
import { Formulario } from "../components/Formulario";
import { ListadoPacientes } from "../components/ListadoPacientes";

export const AdministrarPacientes = () => {
    // Estado para mostrar/ocultar el formulario en pantallas pequeñas
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (
        <div className="container py-5">
            <div className="row">
                {/* Formulario y Listado de pacientes */}
                <div className="col-12 col-lg-5">
                    {/* Boton para mostrar formulario, visible solo en pantallas pequeñas */}
                    <div className="d-lg-none mb-3">
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => setMostrarFormulario(!mostrarFormulario)}
                        >
                            {mostrarFormulario ? "Ocultar formulario" : "Mostrar formulario"}
                        </button>
                    </div>

                    {/* Formulario */}
                    <div
                        className={`${mostrarFormulario ? 'd-block' : 'd-none'} d-lg-block`}
                    >
                        <Formulario />
                    </div>
                </div>

                {/* Listado de pacientes */}
                <div className="col-12 col-lg-7">
                    <ListadoPacientes />
                </div>
            </div>
        </div>
    );
};