import DisenoBase from '../components/diseno_base';
import { useState } from 'react';
import { editarUsuario } from '../api/axios';
import '../styles/pages-styles/editar_perfil.css';

const Editprofile = () => {
  const [usuarioData, setUsuarioData] = useState({
    nombre_usuario: '',
    apellido_usuario: '',
    correo_usuario: '',
    telefono_usuario: '',
    contrasena_usuario: ''
  });

  const handleChange = (e) => {
    setUsuarioData({
      ...usuarioData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await editarUsuario(usuarioData);
    console.log(response);
    // Restablecer el estado de usuarioData a su estado inicial
    setUsuarioData({
      nombre_usuario: '',
      apellido_usuario: '',
      correo_usuario: '',
      telefono_usuario: '',
      contrasena_usuario: ''
    });
  };

  return (
    <DisenoBase>
<form onSubmit={handleSubmit} className='form-register' autocomplete="off">
  <h1 className='form-title'>EDITAR PERFIL</h1>
  <input type="text" name="nombre_usuario" className='form-control' value={usuarioData.nombre_usuario} onChange={handleChange} placeholder="Nombre" required />
  <input type="text" name="apellido_usuario" className='form-control' value={usuarioData.apellido_usuario} onChange={handleChange} placeholder="Apellido" required />
  <input type="email" name="correo_usuario" className='form-control' value={usuarioData.correo_usuario} onChange={handleChange} placeholder="Correo electrónico" required />
  <input type="tel" name="telefono_usuario" className='form-control' value={usuarioData.telefono_usuario} onChange={handleChange} placeholder="Teléfono" required />
  <input type="password" name="contrasena_usuario" className='form-control' value={usuarioData.contrasena_usuario} onChange={handleChange} placeholder="Contraseña" required />
  <button type="submit" className='btn-success'>Editar perfil</button>
</form>
    </DisenoBase>
  );
};

export default Editprofile;
