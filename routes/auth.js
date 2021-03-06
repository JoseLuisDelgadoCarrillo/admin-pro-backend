/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controladores/auth');
const { validarCampos } = require('../middlewares/validar-caompos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/',
    [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos

    ],
    login

);

router.post('/google',
    [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos

    ],
    googleSignIn

);

router.get('/renew',
    validarJWT,
    renewToken
);




module.exports = router;