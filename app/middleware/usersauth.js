'use strict';

const url = require('url');

// 判断客户端用户是否登录
module.exports = (options, app) => {
  return async function init(ctx, next) {
    const userinfo = ctx.session.users;
    app.locals.userinfo = userinfo;
    const pathname = url.parse(ctx.request.url).pathname;
    if (userinfo) {
      if (pathname.split('/')[1] === 'user' && !userinfo.sourceId) {
        ctx.redirect('/auth');
      } else if (pathname.split('/')[1] === 'auth' && userinfo.sourceId) {
        ctx.redirect('/user');
      }
      await next();
    } else {
      // 排除不需要做杼判断的页面
      if (pathname.split('/')[1] !== 'user' && pathname.split('/')[1] !== 'auth' && pathname !== '/feedback') {
        await next();
      } else {
        ctx.redirect('/login');
      }
    }
  };
};
