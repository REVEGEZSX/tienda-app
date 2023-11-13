import { useDispatch } from 'react-redux'
import { onLogout } from '../api/axios'
import { unauthenticateUser } from '../redux/slices/authSlice'
import '../styles/components-styles/cerrar_sesion.css'

const Closesession = () => {
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await onLogout()
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      localStorage.removeItem('userRole')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <span onClick={() => logout()}>
      CERRAR SESION
    </span>
  )
}

export default Closesession