import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Inicio from './pages/inicio'
import Ingreso from './pages/ingreso'
import Registro from './pages/registro'
import Editar_perfil from './pages/editar_perfil'
import { useSelector } from 'react-redux'
const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/ingreso' />}</>
}
const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/inicio' element={<Inicio />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/editar-perfil' element={<Editar_perfil/>} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/registro' element={<Registro/>} />
          <Route path='/ingreso' element={<Ingreso/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App