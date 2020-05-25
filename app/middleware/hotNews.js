'use strict';

const url = require('url');

// 24小时热闻
module.exports = (options, app) => {
  return async function init(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;
    // 排除不需要做杼判断的页面
    const pathnameArray = pathname.split('/');
    if (pathname === '/') {
      const res = await ctx.service.article.hotnews();
      app.locals.hotnews = res;
      await next();
    } else if (pathnameArray[1] === 'category') {
      const res = await ctx.service.article.hotnews(pathnameArray[2]);
      app.locals.hotnews = res;
      await next();
    } else {
      await next();
    }
  };
};
