/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } =  require('../middlewares/validar-caompos')


const { getUsuarios, crearUsuario , actualizarUsuario, borrarUsuario } = require('../controladores/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT,getUsuarios  );

router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos

] , crearUsuario  );

router.put( '/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario 
);

router.delete( '/:id',
    [
        validarJWT,
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    borrarUsuario 
);






module.exports = router;