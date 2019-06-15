const funcion = require('../functions/helper');

exports.index = function (req, res) {
  var mensaje_exito = req.session.mensaje_exito;
  var mensaje_error = req.session.mensaje_error;
  req.session.mensaje_exito = null;
  req.session.mensaje_error = null;
  res.render('administracion/bienvenida', {
    titulo: 'Administración',
    mensaje_exito: mensaje_exito,
    mensaje_error: mensaje_error,
    usuario_logeado: funcion.recibirUsuario(req)
  });
};

exports.salir = function (req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
};

