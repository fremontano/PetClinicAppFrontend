import usePacientes from "../hooks/usePacientes";
import { Paciente } from "./Paciente";


export const ListadoPacientes = () => {


    const { pacientes } = usePacientes();



    return (
        <div className="bg-white rounded border p-4" >

            {pacientes.length ? (
                <>
                    <h2 className="fw-bolder text-primary text-center ">Lista de Pacientes </h2>
                    <p className=" text-center fw-bold mb-3">Administra tus <span className="text-primary">Pacientes y Citas</span></p>
                    {/* Mostrar pacientes */}
                    {
                        pacientes.map(paciente => (
                            <Paciente
                                key={paciente._id}
                                // para extraer informacion en el componente paciente,  mostrar los datos
                                paciente={paciente}
                            />
                        )
                        )
                    }
                </>
            ) : (
                <>
                    <h2 className="fw-bold text-center">Aún no hay pacientes registrados</h2>
                    <p className="text-small text-center text-primary fw-bold">
                        Actualmente no tienes pacientes en el sistema.
                        Empieza a agregar nuevos pacientes.
                    </p>
                </>
            )}

        </div>
    )
}
