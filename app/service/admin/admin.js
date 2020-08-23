'use strict';

const Service = require('egg').Service;
class AdminService extends Service {

  /**
   * 添加管理员
   *
   * @param {*} username 用户名
   * @param {*} password 密码
   * @return {*} /
   * @memberof AdminService
   */
  async create(username, password) {
    const user = await this.findOne(username);
    if (!user) {
      const res = await this.ctx.model.Admin.create({
        username,
        password,
      });
      if (!res) {
        this.ctx.throw(404, 'site not found');
      }
      return res;
    }
    return false;
  }

  /**
   * 修改管理员
   *
   * @param {*} id 管理员id
   * @param {*} password 管理员密码
   * @return {*} /
   * @memberof AdminService
   */
  async edit(id, password) {
    const res = await this.ctx.model.Admin.update({
      password,
    }, {
      where: {
        id,
      },
    });
    return res[0];
  }
  /**
   * 查找用户
   *
   * @param {*} username 用户名
   * @return {*} /
   * @memberof AdminService
   */
  async findOne(username) {
    const user = await this.ctx.model.Admin.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  /**
   * 用户列表
   *
   * @memberof AdminService
   */
  async list() {
    return await this.ctx.model.Admin.findAndCountAll({
      attributes: [ 'id', 'username', 'createdAt', 'active' ],
    });
  }

  /**
   * 修改管理员状态
   *
   * @param {*} id // id
   * @param {*} active 状态
   * @return {*} 、
   * @memberof AdminService
   */
  async isactive(id, active) {
    return await this.ctx.model.Admin.update({
      active,
    }, {
      where: {
        id,
      },
    });
  }
}
module.exports = AdminService;
