const express = require('express');
const router = express.Router();

const estadisticas_controller = require('../controllers/estadisticas.controller');

const funcion = require('../functions/helper');

router.get('',funcion.validar_ingreso, estadisticas_controller.index);

module.exports = router;