'use strict';

const url = require('url');

// 菜单数据传给页面
module.exports = (options, app) => {
  return async function init(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;
    // 排除不需要做杼判断的页面
    if (pathname === '/admin/login' || pathname === '/admin/post_login'  || pathname === '/admin/verify') {
      await next();
    } else {
      const res = await ctx.service.menus.menus();
      app.locals.menus = res;
      app.locals.url = pathname;
      await next();
    }
  };
};
