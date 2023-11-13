import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../styles/components-styles/barra_navegacion'
import Cerrar_sesion from './cerrar_sesion'
const BarraComprador = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return(
        <nav className='barra-navegacion'>
            {isAuth ?(
                <div className='barra-navegacion-opciones'>
                    <NavLink to='/inicio' className='botones-barra-navegacion'>
                        <span>INICIO</span>
                    </NavLink>
                    <NavLink className='botones-barra-navegacion'>
                        <Cerrar_sesion/>
                    </NavLink>
                </div>
            ):(
                <div className='barra-navegacion-opciones'>
                    <NavLink to='/home' className='botones-barra-navegacion'>
                        <span>INICIO</span>
                    </NavLink>                            
                    <NavLink to='/login' className='botones-barra-navegacion'>
                        <span>INGRESO</span>
                    </NavLink>                                         
                    <NavLink to='/register' className='botones-barra-navegacion'>
                        <span>REGISTRO</span>
                    </NavLink>                                                             
                </div>
            )}                
        </nav>          
    )
}
export default BarraComprador