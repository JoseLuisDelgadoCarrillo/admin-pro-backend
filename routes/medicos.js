/*
    Medicos
    ruta '/api/medico'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } =  require('../middlewares/validar-caompos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico} = require('../controladores/medico')

const router = Router();

router.get( '/', getMedicos  );

router.post( '/', [
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe de ser valido').isMongoId(),
    validarCampos
] , crearMedico  );

router.put( '/:id',[
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El hospital id debe de ser valido').isMongoId(),
    validarCampos
    ],
    actualizarMedico );

router.delete( '/:id', validarJWT, borrarMedico );




module.exports = router;