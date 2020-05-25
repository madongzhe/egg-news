'use strict';

const Controller = require('../core/base_controller');

class ArticleListController extends Controller {

  /**
   * 文章列表
   *
   * @memberof ArticleListController
   */
  async post_articleList() {
    const { ctx } = this;
    const createRule = {
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
  /**
   * 分类文章列表
   *
   * @memberof ArticleController
   */
  async categorylist() {
    const { ctx } = this;
    const createRule = {
      englishName: 'string',
      page: 'int?',
    };

    ctx.validate(createRule, ctx.params);
    const { englishName, page } = ctx.params;
    let res = await ctx.service.article.articleCategoryList(englishName, page, 30);
    res = Object.assign(res, { maxp: Math.ceil(res.count / 30) }, { page });
    await ctx.render('article_list.html', { res });
  }

  /**
   * post 请求分类文章分页列表
   *
   * @memberof ArticleListController
   */
  async post_categoryList() {
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
