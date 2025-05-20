'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      // 定义关联
    }
  }
  
  Session.init({
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'session',
    underscored: true,
  });
  
  return Session;
};
