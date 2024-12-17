import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { Login } from './pages/Login';
import { Registrar } from './pages/Registrar';
import { OlvidePassword } from './pages/OlvidePassword';
import { ConfirmarCuenta } from './pages/ConfirmarCuenta';
import { NuevoPassword } from './pages/NuevoPassword';
import { RutaProtegida } from './layout/RutaProtegida';
import { AdministrarPacientes } from './pages/AdministrarPacientes';



import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';



function App() {



  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas publicas  */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            {/* Rutas privadas  */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
