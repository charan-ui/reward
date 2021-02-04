//import packages
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

//custom imports
const addPointsRoute = require('./routes/addPointsRoutes');
const deductPointsroute = require('./routes/deductPointsRoute');


//app
const app = express();
const compression = require('compression');
const bodyParser =require('body-parser');

//context-path
const appContextPath = '/api'
//app port
const appPort = '1337';

//Morgan
app.use(morgan('tiny'));

app.set('view engine','html');
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true , parameterLimit:5000}));
app.use(helmet());
app.use(helmet.noCache());//set Cache-control header
app.use(compression());
app.use(function (err,req,res,next){
  return res.status(500);
});

//routes
app.use(appContextPath , addPointsRoute);
app.use(appContextPath,  deductPointsroute );

//starting server
const server = app.listen(appPort,function(){
  const port = server.address().port;
  console.log('Express server listening on port ',port);
});

module.exports = app;