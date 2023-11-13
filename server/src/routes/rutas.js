const {Router} = require('express')
const {
    registro, 
    ingreso, 
    cerrarSesion, 
    editarUsuario
} = require('../controllers/modulos_controladores')
const {validationMiddleware} = require('../middlewares/validation-middleware')
const { registerValidation, loginValidation} = require('../validadores/validador')
const {userAuth} = require('../middlewares/auth-middleware')
const router = Router()

//GET
router.get('/cerrar-sesion', cerrarSesion)
//POST
router.post('/registro', registerValidation, validationMiddleware, registro)
router.post('/ingreso', loginValidation, validationMiddleware, ingreso)
router.post('/editar-usuario', userAuth, editarUsuario)
//DELETE

module.exports = router;