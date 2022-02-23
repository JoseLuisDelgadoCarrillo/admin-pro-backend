/* 
    Ruta: /api/todo/:busqueda
*/

const { Router } = require('express');
const { getBusqueda, getDocumentosColeccion } = require('../controladores/busqueda')


const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busqueda',validarJWT,getBusqueda  );

router.get( '/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion  );



module.exports = router;