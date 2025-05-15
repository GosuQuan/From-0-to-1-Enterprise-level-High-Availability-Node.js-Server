'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('session', {
            sid: {
              type: DataTypes.STRING(36),
            },
            expires: {
              type: DataTypes.DATE,
            },
            data: {
              type: DataTypes.TEXT,
            },
      
            created_at: {
              allowNull: false,
              type: Sequelize.DATE,
            },
            updated_at: {
              allowNull: false,
              type: Sequelize.DATE,
            },
          });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('session');
  }
};
