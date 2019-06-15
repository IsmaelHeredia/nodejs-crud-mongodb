// app.js

// npm install --save express pug body-parser mongoose

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const home = require('./routes/home.route');

const instalar = require('./routes/instalar.route');

const ingreso = require('./routes/ingreso.route');
const administracion = require('./routes/administracion.route');

const producto = require('./routes/producto.route');
const proveedor = require('./routes/proveedor.route');
const usuario = require('./routes/usuario.route');

const cuenta = require('./routes/cuenta.route');

const estadisticas = require('./routes/estadisticas.route');

// initialize our express app
const app = express();
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/sistema",{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(function (req, res, next) {
  if (!req.session.ingreso) {
    req.session.ingreso = '';
  }
  if(!req.session.mensaje_exito) {
  	req.session.mensaje_exito = '';
  }
  if(!req.session.mensaje_error) {
    req.session.mensaje_error = '';
  }
  next()
});

app.use('/', home);
app.use('/instalar', instalar);
app.use('/ingreso', ingreso);
app.use('/administracion', administracion);
app.use('/administracion/productos', producto);
app.use('/administracion/proveedores', proveedor);
app.use('/administracion/usuarios', usuario);
app.use('/administracion/cuenta', cuenta);
app.use('/administracion/estadisticas', estadisticas);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});