'use strict';

const utils = require('utility');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      email: 'belovedyogurt@gmail.com',
      password: utils.md5('000000'),
      username: 'Yugo',
      weixin: 'xxxxx',
      weibo: 'xxxxx',
      receive_remote: 0,
      email_verifyed: 1,
      avatar: 'xxxxx.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
