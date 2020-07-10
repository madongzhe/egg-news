'use strict';

const Controller = require('../../core/base_controller');

class ArticleListController extends Controller {

  /**
   * 文章列表
   *
   * @memberof ArticleListController
   */
  async ReadList() {
    const { ctx } = this;
    const createRule = {
      page: 'int',
    };
    // 校验参数
    ctx.validate(createRule, ctx.params);
    const { page } = ctx.params;
    const res = await ctx.service.article.articleList(page);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.error();
    }
  }

  /**
   * post 请求分类文章分页列表
   *
   * @memberof ArticleListController
   */
  async ReadCategoryList() {
    const { ctx } = this;
    const createRule = {
      englishName: 'string',
      page: 'int',
    };
    // 校验参数
    ctx.validate(createRule, ctx.params);
    const { page } = ctx.params;
    const res = await ctx.service.article.list(page);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.error();
    }
  }
}

module.exports = ArticleListController;
