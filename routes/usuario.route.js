const express = require('express');
const router = express.Router();

const usuario_controller = require('../controllers/usuario.controller');

const funcion = require('../functions/helper');

router.get('',funcion.validar_ingreso_admin, usuario_controller.listar);

router.get('/agregar',funcion.validar_ingreso_admin, usuario_controller.form_agregar_usuario);

router.post('/agregar',funcion.validar_ingreso_admin, usuario_controller.usuario_agregar);

router.get('/:id/editar',funcion.validar_ingreso_admin, usuario_controller.form_editar_usuario);

router.post('/:id/editar',funcion.validar_ingreso_admin, usuario_controller.usuario_editar);

router.get('/:id/borrar',funcion.validar_ingreso_admin, usuario_controller.form_borrar_usuario);

router.post('/:id/borrar',funcion.validar_ingreso_admin, usuario_controller.usuario_borrar);

module.exports = router;