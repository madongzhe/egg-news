'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  /**
   * 登录
   *
   * @param {string} name 用户名
   * @param {string} pwd 密码
   * @return
   * @memberof LoginService
   */
  async login(name, pwd) {
    const user = await this.ctx.model.Admin.findOne({
      username: name,
    });
    if (user && user.password === pwd) {
      this.ctx.session.user = user.dataValues;
      return true;
    }
    return false;
  }
}
module.exports = LoginService;
