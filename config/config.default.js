/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_15862423414553_0336';
  // 短信接口配置
  config.sms = {
    accessKeyId: '',
    accessSecret: '',
  };
  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  // 数据库
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'geekscn',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      ignore: ctx => {
        if (ctx.request.url.indexOf('/API') != -1) {
          return true;
        } else {
          return false;
        }
      },
      // enable: false,
      // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
    domainWhiteList: [],
  };

  // add your middleware config here
  config.middleware = ['adminauth', 'menus', 'hotNews', 'site', 'gzip', 'usersauth'];
  config.adminauth = {
    match: '/admin',
  };
  config.menus = {
    ignore: '/admin',
  };
  config.hotNews = {
    ignore: '/admin',
  };
  // 参数验证
  config.validate = { // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };

  config.static = {
    prefix: '/public/',
    dir: ['app/public', 'app/upload'],
  };
  // 上传图片保存路径
  config.http_img = '';
  // add your user config here
  const userConfig = {
    myAppName: 'egg-taobaoke',
    app_key: '',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  return {
    ...config,
    ...userConfig,
  };
};
