'use strict';

const Controller = require('../../core/base_controller');

class ArticleController extends Controller {

  /**
   * 查看文章
   *
   * @memberof ArticleController
   */
  async Read() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      // 校验参数
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      ctx.helper.fuil();
    }
    const id = ctx.params.id;
    const res = await ctx.service.article.article(id);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.fuil();
    }
  }

  /**
   * 新增文章
   *
   * @memberof ArticleController
   */
  async Create() {

  }

  /**
   * 修改文章
   *
   * @memberof ArticleController
   */
  async Update() {

  }

  /**
   * 删除文章
   *
   * @memberof ArticleController
   */
  async Delete() {

  }
}

module.exports = ArticleController;
