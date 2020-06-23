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
}
module.exports = UsersController;
