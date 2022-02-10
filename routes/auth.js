/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require('../controladores/auth');
const { validarCampos } = require('../middlewares/validar-caompos');


const router = Router();

router.post('/',
    [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos

    ],
    login

)




module.exports = router;