const express = require('express');
const router = express.Router();

const administracion_controller = require('../controllers/administracion.controller');

const funcion = require('../functions/helper');

router.get('', funcion.validar_ingreso, administracion_controller.index);
router.get('/salir', funcion.validar_ingreso, administracion_controller.salir);

module.exports = router;