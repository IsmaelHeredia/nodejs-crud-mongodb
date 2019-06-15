const express = require('express');
const router = express.Router();

const proveedor_controller = require('../controllers/proveedor.controller');

const funcion = require('../functions/helper');

router.get('',funcion.validar_ingreso, proveedor_controller.listar);

router.get('/agregar',funcion.validar_ingreso, proveedor_controller.form_agregar_proveedor);

router.post('/agregar',funcion.validar_ingreso, proveedor_controller.proveedor_agregar);

router.get('/:id/editar',funcion.validar_ingreso, proveedor_controller.form_editar_proveedor);

router.post('/:id/editar',funcion.validar_ingreso, proveedor_controller.proveedor_editar);

router.get('/:id/borrar',funcion.validar_ingreso, proveedor_controller.form_borrar_proveedor);

router.post('/:id/borrar',funcion.validar_ingreso, proveedor_controller.proveedor_borrar);

module.exports = router;