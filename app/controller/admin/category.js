'use strict';

const Controller = require('../../core/admin_base_controller');

class CategoryController extends Controller {

  /**
   * 文章分类列表页
   *
   * @memberof CategoryController
   */
  async list() {
    const { ctx } = this;
    const res = await ctx.service.admin.category.findall();
    await ctx.render('admin/category/category_list.html', { res: JSON.stringify(res) });
  }

  /**
   * 添加分类
   *
   * @memberof CategoryController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      name: 'string',
      englishName: 'string',
    };
    ctx.validate(createRule);
    const { name, englishName } = ctx.request.body;
    const res = await ctx.service.admin.category.add(name, englishName);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 修改分类
   *
   * @memberof CategoryController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
      name: 'string',
      englishName: 'string',
    };
    ctx.validate(createRule);
    const { id, name, englishName } = ctx.request.body;
    const res = await ctx.service.admin.category.edit(id, name, englishName);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }
}
module.exports = CategoryController;
