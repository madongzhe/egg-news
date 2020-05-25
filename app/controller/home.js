'use strict';

const Controller = require('../core/base_controller');

class HomeController extends Controller {

  /**
   * 首页
   *
   * @memberof HomeController
   */
  async index() {
    const { ctx } = this;
    const res = await ctx.service.article.articleList(1, 30);
    const link = await ctx.service.admin.link.list();
    await ctx.render('index.html', { res: JSON.stringify(res), link });
  }
}

module.exports = HomeController;
