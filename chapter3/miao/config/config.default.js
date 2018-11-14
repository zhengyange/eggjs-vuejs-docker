'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541769828118_4734';
  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    database: 'miao',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'root',
  };

  config.validator = {
    open: 'zh-CN',
    languages: {
      'zh-CN': {
        required: '必须填 %s 字段',
      },
    },
    async formatter(ctx, error) {
      console.log(error)
      // info('[egg-y-validator] -> %s', JSON.stringify(error, ' '));
      // throw new Error(error[0].message)
    }
  }

  return config;
};
