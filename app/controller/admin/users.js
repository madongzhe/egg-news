'use strict';

const Controller = require('../../core/admin_base_controller');

class UsersController extends Controller {

  /**
   * 用户列表
   *
   * @memberof UsersController
   */
  async usersList() {
    const { ctx } = this;
    const res = await ctx.service.admin.user.list();
    await ctx.render('admin/users/list.html', { res: JSON.stringify(res) });
  }

  /**
   * 是否禁用用户
   *
   * @memberof UsersController
   */
  async active() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
      active: 'int',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.fail(422);
      return;
    }
    const { id, active } = ctx.request.body;
    const res = ctx.service.admin.user.active(id, active);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }
}
module.exports = UsersController;
