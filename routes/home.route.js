const express = require('express');
const router = express.Router();

const { base64encode, base64decode } = require('nodejs-base64');

const Usuario = require('../models/usuario.model');

const home_controller = require('../controllers/home.controller');

const funcion = require('../functions/helper');

router.get('', funcion.validar_home, home_controller.index);

module.exports = router;