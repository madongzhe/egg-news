'use strict';

const url = require('url');

// 菜单数据传给页面
module.exports = (options, app) => {
  return async function init(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;
    // 排除不需要做杼判断的页面
    if (pathname === '/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify') {
      await next();
    } else {
      const site = await ctx.service.admin.site.index();
      app.locals.site = site;
      await next();
    }
  };
};
