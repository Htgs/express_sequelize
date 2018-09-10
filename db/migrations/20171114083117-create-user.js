'use strict';
// sequelize model:generate --name Project --attributes name:string
// sequelize db:migrate
module.exports = {
  up: (queryInterface, Sequelize) => {
    // 用户表
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, // '主键'
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING(50),// '用户名'
      },
      password: {
        type: Sequelize.STRING(255),// '密码'
      },
      realname: {
        type: Sequelize.STRING(50),// '真实姓名'
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female'],// 'male代表男，female代表女'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255), // '电子邮箱'
      },
      phone: {
        type: Sequelize.STRING(50), // '电话'
      },
      birth_date: {
        type: Sequelize.DATEONLY,// '出生日期'
      },
      avatar: {
        type: Sequelize.STRING(255), // '头像'
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};