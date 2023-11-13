const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {SECRET} = require('../constantes')
// inicio acciones de usuario
    //entrada
    exports.ingreso = async(req,res)=>{
        let usuario = req.usuario
        payload = {
            id_usuario: usuario.id_usuario,
            correo_usuario: usuario.correo_usuario,
            id_roles_usuario: usuario.id_roles_usuario
        }
        try {
            const token = await sign(payload, SECRET)
            return res.status(200).cookie('token', token, {httpOnly:true}).json({
                success: true,
                message: 'Ingresado con exito',
                userRole: usuario.id_roles_usuario
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
            error: error.message
            })        
        }
    }
    //registro
    exports.registro = async (req,res) => {
        const {
            nombre_usuario, 
            apellido_usuario, 
            correo_usuario, 
            contrasena_usuario, 
            telefono_usuario, 
            id_roles_usuario} = req.body
        try {
            const Hashedcontrasena_usuario = await hash(contrasena_usuario, 10)
            await db.query(
            `insert into usuarios(
                nombre_usuario, 
                apellido_usuario, 
                correo_usuario, 
                contrasena_usuario,
                telefono_usuario,
                id_roles_usuario)
                    values(
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6
            )`,[nombre_usuario, 
                apellido_usuario, 
                correo_usuario, 
                Hashedcontrasena_usuario, 
                telefono_usuario, 
                id_roles_usuario])
            return res.status(201).json({
                sucess: 'true',
                message: 'Se Registro con exito'
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                error: error.message
            })
        }
    }
    //salida
    exports.cerrarSesion = async (req, res) => {
        try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'sesion terminada con exito',
        })
        } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
        }
    }
    //editar usuario
    exports.editarUsuario = async (req, res) => {
        const { nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario } = req.body;
        try {
            const usuario = await db.query(
                `SELECT 
                    nombre_usuario, 
                    apellido_usuario, 
                    correo_usuario,
                    telefono_usuario
                    contrasena_usuario 
                    FROM usuarios WHERE id_usuario = $1`, [req.user.id_usuario]);
            if (!usuario) {
                return res.status(404).json({
                    success: 'false',
                    message: 'Usuario no encontrado'
                });
            }
            const contrasena_usuario_cifrada = await hash(contrasena_usuario, 10);
            await db.query(
                `UPDATE usuarios SET 
                    nombre_usuario = $1, 
                    apellido_usuario = $2, 
                    correo_usuario = $3, 
                    telefono_usuario = $4,
                    contrasena_usuario = $5
                WHERE id_usuario = $6`, 
                [nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario_cifrada, req.user.id_usuario]
            );
            return res.status(200).json({
                success: 'true',
                message: 'Información de usuario actualizada con éxito'
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                error: error.message
            });
        }
    };
// fin acciones de usuario