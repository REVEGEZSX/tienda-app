import React from 'react';
import { useSelector } from 'react-redux';
import BarraComprador from './barra_navegacion_comprador'
import BarraVendedor from './barra_navegacion_vendedor'
import '../styles/components-styles/diseno_base.css'

const disenoBase = ({children})=>{ 
    const userRole = useSelector(state => state.auth.userRole);
    return(
        <section className='contenedor-de-paginas'>
            {userRole === 2 ? <BarraVendedor /> : <BarraComprador />}
            {children}
        </section>
    )
}
export default disenoBase