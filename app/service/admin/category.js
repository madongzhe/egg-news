'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {

  /**
   * 文章分类列表
   *
   * @return {*} //返回列表
   * @memberof CategoryService
   */
  async list() {
    const res = this.ctx.model.Category.findAll();
    return res;
  }

  /**
   * 返回全部分类
   *
   * @return {*} //
   * @memberof CategoryService
   */
  async findall() {
    const res = this.ctx.model.Category.findAll({
      attributes: [ 'id', 'name', 'englishName', 'active' ],
    });
    return res;
  }

  /**
   * 添加分类
   *
   * @param {string} name 分类名称
   * @param {string} englishName 英文名称
   * @return {*} 结果
   * @memberof CategoryService
   */
  async add(name, englishName) {
    const res = this.ctx.model.Category.create({
      name,
      englishName,
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 编辑分类
   *
   * @param {int} id 主键id
   * @param {string} name 名称
   * @param {string} englishName 英文名称
   * @return {*} 结果
   * @memberof CategoryService
   */
  async edit(id, name, englishName) {
    const res = this.ctx.model.Category.update({
      name,
      englishName,
    }, {
      where: {
        id,
      },
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }

  /**
   * 修改状态
   *
   * @param {*} id id
   * @param {*} active 状态
   * @memberof CategoryService
   */
  async active(id, active) {
    const res = this.ctx.model.Category.update({
      active,
    }, {
      where: {
        id,
      },
    });
    if (!res) {
      this.ctx.throw(404, 'site not found');
    }
    return res;
  }
}
module.exports = CategoryService;
