// src/server.js
const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initMiddlewares = require('./middlewares');
const initControllers = require('./controllers');
const db = require('./models');
const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');
const mouldsDir = resolve('src/moulds');

async function bootstrap() {
  try {
    // 同步数据库模型
    console.log('正在同步数据库模型...');
    
    // 强制同步数据库模型，确保表结构正确创建
    // 注意：在生产环境中应谨慎使用 force: true，因为它会删除现有表并重新创建
    const syncOptions = process.env.NODE_ENV === 'production' ? {} : { force: true };
    await db.sequelize.sync(syncOptions);
    console.log('数据库模型同步完成');
    
    // 初始化中间件
    console.log('初始化中间件...');
    const middlewares = await initMiddlewares();
    server.use(middlewares);
    
    // 静态文件服务
    server.use(express.static(publicDir));
    // moulds 校验
    server.use('/moulds', express.static(mouldsDir));
    
    // 初始化控制器
    console.log('初始化控制器...');
    server.use(await initControllers());
    
    // 错误处理
    server.use(errorHandler);
    
    // 启动服务器
    await promisify(server.listen.bind(server, port))();
    console.log(`> 服务器已启动，监听端口 ${port}`);
    console.log(`> 环境: ${process.env.NODE_ENV || 'development'}`); 
    console.log(`> 容器环境: ${process.env.CONTAINER_ENV ? '是' : '否'}`);
  } catch (error) {
    console.error('启动服务器时出错:', error);
    console.error('错误详情:', error.stack);
    process.exit(1);
  }
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