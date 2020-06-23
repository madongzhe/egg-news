'use strict';

const url = require('url');

// 判断后台用户是否登录
module.exports = (options, app) => {
  return async function init(ctx, next) {
    const admininfo = ctx.session.admin;
    app.locals.admininfo = admininfo;
    const pathname = url.parse(ctx.request.url).pathname;
    if (admininfo) {
      await next();
    } else {
      // 排除不需要做杼判断的页面    admin/verify?mt=0.7755167188853835
      if (pathname === '/admin/login' || pathname === '/admin/post_login' || pathname === '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
};
