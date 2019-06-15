const express = require('express');
const router = express.Router();

const cuenta_controller = require('../controllers/cuenta.controller');

const funcion = require('../functions/helper');

router.get('/cambiarusuario',funcion.validar_ingreso, cuenta_controller.form_cambiar_usuario);

router.post('/:id/cambiarusuario',funcion.validar_ingreso, cuenta_controller.cambiar_usuario);

router.get('/cambiarclave',funcion.validar_ingreso, cuenta_controller.form_cambiar_clave);

router.post('/:id/cambiarclave',funcion.validar_ingreso, cuenta_controller.cambiar_clave);

module.exports = router;