'use strict';

const bcrypt = require('bcrypt');


module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;
  const User = app.model.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    email: {
      type: STRING(40)
    },
    password: STRING,
    username: STRING(40),
    weibo: STRING(40),
    weixin: STRING(40),
    team_id: INTEGER,
    receive_remote: TINYINT(1),
    email_verifyed: TINYINT(1),
    avatar: STRING(40),
    created_at: {
      allowNull: false,
      type: DATE
    },
    updated_at: {
      allowNull: false,
      type: DATE
    }
  }, {});
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  /**
   *
   *
   * @param {*} user
   * @returns
   */
  async function hashPwd(user) {
    if (user.changed('password')) {
      return;
    }
    user.password = await bcrypt.hash(user.password, 10);
  }

  User.beforeSave(hashPwd);

  /**
   * * 用户登录方法
   * @param {string} email 邮箱
   * @param {string} password 密码
   * @return {(User|boolean)} 登录成功的用户
   */
  User.Auth = async function (email, password) {
    const user = await this.findOne({
      where: {
        email
      }
    })
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  }

  return User;
};