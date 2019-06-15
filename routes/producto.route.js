const express = require('express');
const router = express.Router();

const producto_controller = require('../controllers/producto.controller');

const funcion = require('../functions/helper');

router.get('',funcion.validar_ingreso, producto_controller.listar);

router.get('/agregar',funcion.validar_ingreso, producto_controller.form_agregar_producto);

router.post('/agregar',funcion.validar_ingreso, producto_controller.producto_agregar);

router.get('/:id/editar',funcion.validar_ingreso, producto_controller.form_editar_producto);

router.post('/:id/editar',funcion.validar_ingreso, producto_controller.producto_editar);

router.get('/:id/borrar',funcion.validar_ingreso, producto_controller.form_borrar_producto);

router.post('/:id/borrar',funcion.validar_ingreso, producto_controller.producto_borrar);

module.exports = router;