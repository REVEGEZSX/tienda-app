import { useState } from 'react'
import { onRegistration } from '../api/axios'
import DisenoBase from '../components/diseno_base'
import '../styles/pages-styles/registro.css'

const Registro = () => {
  const [values, setValues] = useState({
    nombre_usuario:'',
    apellido_usuario:'',
    correo_usuario: '',
    contrasena_usuario: '',
    telefono_usuario:'',
    id_roles_usuario:''
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({
        nombre_usuario:'', 
        apellido_usuario:'', 
        correo_usuario: '', 
        contrasena_usuario: '',
        telefono_usuario:'',
        id_roles_usuario:''
      })
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <DisenoBase>
        <form onSubmit={(e) => onSubmit(e)} className='form-register'>
        <h1 className='form-title'>REGISTRO</h1>
        <input
          onChange={(e) => onChange(e)}
          type='text'
          className='form-control'
          id='nombre_usuario'
          name='nombre_usuario'
          value={values.nombre_usuario}
          placeholder='NOMBRE'
          required
        />
        <input
          onChange={(e) => onChange(e)}
          type='text'
          className='form-control'
          id='apellido_usuario'
          name='apellido_usuario'
          value={values.apellido_usuario}
          placeholder='APELLIDO'
          required
        />
        <input
          onChange={(e) => onChange(e)}
          type='email'
          className='form-control'
          id='correo_usuario'
          name='correo_usuario'
          value={values.correo_usuario}
          placeholder='CORREO'
          required
        />
        <input
          onChange={(e) => onChange(e)}
          type='password'
          value={values.contrasena_usuario}
          className='form-control'
          id='contrasena_usuario'
          name='contrasena_usuario'
          placeholder='CONTRASEÑA'
          required
        />
        <input
          onChange={(e) => onChange(e)}
          type='number'
          className='form-control'
          id='telefono_usuario'
          name='telefono_usuario'
          value={values.telefono_usuario}
          placeholder='TELEFONO'
          required
        />
      <button type='submit' className='btn-success'>
        REGISTRARSE
      </button>
        <input
          disabled
          onChange={(e) => onChange(e)}
          type='number'
          className='form-control'
          id='id_roles_usuario'
          name='id_roles_usuario'
          value={values.id_roles_usuario=3}
          placeholder='Cliente'
          defaultValue={3}
          required
        />
        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
      </form>
    </DisenoBase>
  )
}
export default Registro