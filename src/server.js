// src/server.js
const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initMiddlewares = require('./middlewares');
const initControllers = require('./controllers');
const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');
const mouldsDir = resolve('src/moulds');
async function bootstrap() {
  server.use(await initMiddlewares())
  server.use(express.static(publicDir));
    // moulds 校验
  server.use('/moulds', express.static(mouldsDir));
    
  server.use(await initControllers());
  server.use(errorHandler);
  await promisify(server.listen.bind(server, port))();
  console.log(`> Started on port ${port}`);
  
}
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });
bootstrap();

function errorHandler(err,req,res,next){
  if(res.headersSent){
    return next(err);
  }
  console.error(err);
  res.redirect('/500.html')
}