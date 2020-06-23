'use strict';

const Controller = require('../core/base_controller');

class SearchController extends Controller {

  /**
   * 文章搜索
   *
   * @memberof ArticleListController
   */
  async index() {
    const { ctx } = this;
    const createRule = {
      key: 'string',
    };
    // 校验参数
    try {
      ctx.validate(createRule, ctx.query);
    } catch (error) {
      this.ctx.throw(404, 'site not found');
    }
    const { key } = ctx.query;
    const rows = await ctx.service.article.search(key);
    await ctx.render('search.html', { rows, key });
  }
}

module.exports = SearchController;
