'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shop', [
            { name: '良品铺子', created_at: new Date(), updated_at: new Date() },
            { name: '来伊份', created_at: new Date(), updated_at: new Date() },
            { name: '三只松鼠', created_at: new Date(), updated_at: new Date() },
            { name: '百草味', created_at: new Date(), updated_at: new Date() },
          ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shop', null, {});
  }
};
