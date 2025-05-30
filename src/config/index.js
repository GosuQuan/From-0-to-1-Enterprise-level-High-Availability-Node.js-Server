// src/config/index.js
const merge = require('lodash.merge');

const config = {
  // 默认配置
  default: {
    sessionCookieSecret: '842d918ced1888c65a650f993077c3d36b8f114d',
    sessionCookieMaxAge: 7 * 24 * 60 * 60 * 1000,

    homepagePath: '/',
    loginPath: '/login.html',
    loginWhiteList: {
      '/500.html': ['get'],
      '/api/health': ['get'],
      '/api/csrf/script': ['get'],
      '/api/login': ['post'],
      '/api/login/github': ['get'],
      '/api/login/github/callback': ['get'],
    },

    githubStrategyOptions: {
      clientID: 'b8ada004c6d682426cfb',
      clientSecret: '0b13f2ab5651f33f879a535fc2b316c6c731a041',
      callbackURL: 'http://localhost:9000/api/login/github/callback',
    },

    db: {
      // 在容器环境中使用内存存储代替 SQLite
      dialect: process.env.CONTAINER_ENV ? 'memory' : 'sqlite',
      storage: process.env.CONTAINER_ENV ? null : ':memory:',
      // 自动同步数据库模型，创建表结构
      sync: { force: true },
      // 禁用日志输出
      logging: false,
      define: {
        underscored: true,
      },
      migrationStorageTableName: 'sequelize_meta',
    },
  },

  // 本地配置
  development: {
    db: {
      storage: 'database/dev.db',
    },
  },

  // 测试配置
  test: {
    db: {
      logging: false,
    },
  },

  // 部署配置
  production: {
    sessionCookieMaxAge: 3 * 24 * 60 * 60 * 1000,

    db: {
      storage: 'database/prod.db',
    },
  },
};

module.exports = merge(
  {},
  config.default,
  config[process.env.NODE_ENV || 'development']
);