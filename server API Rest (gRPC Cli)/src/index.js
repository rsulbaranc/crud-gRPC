const express = require('express');
const app = express();
const morgan = require('morgan');

//settings 
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev')); //ver solicitudes que llegan del servidor
app.use(express.urlencoded({extended: false})); //soportar datos por url
app.use(express.json()); //soportar datos json

//Routes
app.use(require('./routes/index'));


// Strating the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});