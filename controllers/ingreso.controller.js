const funcion = require('../functions/helper');

const Usuario = require('../models/usuario.model');

const md5 = require('md5');
const { base64encode, base64decode } = require('nodejs-base64');

exports.index = function (req, res) {
  var mensaje_exito = req.session.mensaje_exito;
  var mensaje_error = req.session.mensaje_error;
  req.session.mensaje_exito = null;
  req.session.mensaje_error = null;
  res.render('ingreso/form_login', {
    titulo: 'Ingreso',
    mensaje_exito: mensaje_exito,
    mensaje_error: mensaje_error
  });
};

exports.ingreso = function (req, res) {

  var nombre = req.body.usuario;
  var clave = req.body.clave;

  data = {
  	nombre : nombre,
  	clave : md5(clave)
  };

  Usuario.findOne(data, function(err, usuario) {
  	if(usuario) {
  		var contenido = base64encode(nombre + '@' + md5(clave));
  		req.session.ingreso = contenido;
  		res.redirect('/administracion');
  	} else {
      req.session.mensaje_error = 'El nombre de usuario o contraseña son inválidos';
  		res.redirect('/ingreso');
  	}
  });
};