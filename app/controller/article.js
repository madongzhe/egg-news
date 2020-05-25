'use strict';

const Controller = require('../core/base_controller');

class ArticleController extends Controller {

  /**
   * 文章
   *
   * @memberof ArticleController
   */
  async article() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      // 校验参数
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      this.ctx.throw(404, 'site not found');
    }
    const id = ctx.params.id;
    const res = await ctx.service.article.article(id);
    await ctx.render('article.html', { article: res });
  }
}

module.exports = ArticleController;
