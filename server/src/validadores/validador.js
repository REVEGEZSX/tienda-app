const {check} = require('express-validator')
const {compare} = require('bcryptjs')
const db = require('../db')

const nombre_usuario = check('nombre_usuario').not().isEmpty().withMessage('Debe escribir el nombre')
const apellido_usuario = check('apellido_usuario').not().isEmpty().withMessage('Debe escribir el apellido')
const telefono_usuario = check('telefono_usuario').isNumeric().withMessage('debe ser de entrada numerica')
const id_roles_usuario = check('id_roles_usuario').not().isEmpty().withMessage('Debe definir su rol')

//contrasena_usuario
const contrasena_usuario = check('contrasena_usuario').isLength({min:6, max:15}).withMessage('Ingrese Una Contraseña con caracteres entre 6 y 15')
//correo_usuario
const correo_usuario = check('correo_usuario').isEmail().withMessage('Debe ingresar un correo valido')

//revisa si existe el correo_usuario
const correo_usuario_existe = check('correo_usuario').custom(async (value) =>{
    const {rows} = await db.query('SELECT * from usuarios WHERE correo_usuario = $1',[value])

    if(rows.isLength){
        throw new Error('El correo ya esta registrado')
    }
})
//validacion del inicio de sesion
const loginFieldsCheck = check('correo_usuario').custom(async(value, {req}) =>{
    const usuario = await db.query('select * from usuarios where correo_usuario = $1', [value])
    if (!usuario.rows.length) {
        throw new Error('DATOS ERRADOS.');
    }else {
        const validPassword = await compare(req.body.contrasena_usuario, usuario.rows[0].contrasena_usuario)
        if (!validPassword) {
            throw new Error('DATOS ERRADOS');
        }
    }
    req.usuario = usuario.rows[0]
})


module.exports = {
    registerValidation:[
        correo_usuario, 
        contrasena_usuario, 
        correo_usuario_existe, 
        nombre_usuario, 
        apellido_usuario, 
        telefono_usuario, 
        id_roles_usuario
    ],
    loginValidation:[loginFieldsCheck]
}