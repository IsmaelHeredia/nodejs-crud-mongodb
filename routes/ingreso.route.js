const express = require('express');
const router = express.Router();

const ingreso_controller = require('../controllers/ingreso.controller');

const funcion = require('../functions/helper');

router.get('', funcion.validar_home, ingreso_controller.index);
router.post('', funcion.validar_home, ingreso_controller.ingreso);

module.exports = router;