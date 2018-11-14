'use strict';

const uuid = require('uuid/v1');
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Invitation = app.model.define('Invitation', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING(40),
    user_id: INTEGER,
    use_user_id: INTEGER,
    use_user_name: STRING(40),
    created_at: {
      allowNull: false,
      type: DATE
    },
    updated_at: {
      allowNull: false,
      type: DATE
    }
  }, {});
  /**
   * * 检验邀请码是否有效
   * @param {string} code 邀请码
   * @return {Promise<boolean>} 是否有效
   * FIXME: 待优化
   */

 
  Invitation.exits = async code => {
    const instance = await Invitation.findOne({
      where: {
        code
      }
    })
  }

  // * 生成邀请码 Hook
  // ? FIXME: 待优化
  Invitation.beforeCreate(async (instance, options) => {
    const generatorCode = async code => {
      if (await Invitation.exits(code)) {
        return await generatorCode();
      }
      return code;
    }
    if (!instance.code) {
      instance.code = await generatorCode();
    }
  })

  return Invitation;
};

