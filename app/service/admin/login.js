'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  /**
   * 登录
   *
   * @param {string} name 用户名
   * @param {string} pwd 密码
   * @return {*} 结果
   * @memberof LoginService
   */
  async login(name, pwd) {
    const admin = await this.ctx.model.Admin.findOne({
      username: name,
    });
    if (admin && admin.password === pwd) {
      this.ctx.session.admin = admin;
      return true;
    }
    return false;
  }
}
module.exports = LoginService;
