const express = require('express');
const router = express.Router();

const instalar_controller = require('../controllers/instalar.controller');

router.get('', instalar_controller.index);

module.exports = router;