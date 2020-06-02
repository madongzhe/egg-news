'use strict';

const Controller = require('../../core/base_controller');

class RegisterController extends Controller {

  /**
   * 注册页
   *
   * @memberof RegisterController
   */
  async index() {
    const { ctx } = this;
    ctx.render('user_register.html');
  }
}
module.exports = RegisterController;
