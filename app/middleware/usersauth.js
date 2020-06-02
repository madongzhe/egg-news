'use strict';

const url = require('url');

// 判断客户端用户是否登录
module.exports = () => {
  return async function init(ctx, next) {
    const userinfo = ctx.session.users;
    const pathname = url.parse(ctx.request.url).pathname;
    if (userinfo) {
      await next();
    } else {
      // 排除不需要做杼判断的页面    admin/verify?mt=0.7755167188853835
      if (pathname === '/admin/login' || pathname === '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/login');
      }
    }
  };
};
