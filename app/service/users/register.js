'use strict';

const Service = require('egg').Service;
class UserService extends Service {

  /**
   * 用户注册
   *
   * @param {*} phone 手机号
   * @param {*} passward 密码
   * @return {*} /
   * @memberof UserService
   */
  async registerUser(phone, passward) {
    const user = await this.ctx.service.users.user.findphone(phone);
    if (!user) {
      const res = await this.ctx.model.Users.create({
        phone,
        passward,
      });
      if (!res) {
        return false;
      }
      return true;
    }
    return false;
  }

}
module.exports = UserService;
