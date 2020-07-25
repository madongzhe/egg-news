'use strict';

const Controller = require('../../core/admin_base_controller');
const crypto = require('crypto');

class AdminController extends Controller {

  /**
   * 管理员列表
   *
   * @memberof UsersController
   */
  async List() {
    const { ctx } = this;
    const res = await ctx.service.admin.admin.list();
    await ctx.render('admin/admin.html', { res: JSON.stringify(res) });
  }

  /**
   * 添加管理员
   *
   * @memberof AdminController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      username: 'string',
      password: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.fail(422);
      return;
    }
    const { username, password } = ctx.request.body;
    const res = await ctx.service.admin.admin.create(username, password);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail(500);
    }
  }

  /**
   * 修改管理员密码
   *
   * @memberof AdminController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
      password: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.fail(422);
      return;
    }
    const { id, password } = ctx.request.body;
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    const res = await ctx.service.admin.admin.edit(id, pwd);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail(500);
    }
  }
}
module.exports = AdminController;
