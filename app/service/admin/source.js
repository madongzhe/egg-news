'use strict';

const Service = require('egg').Service;
const { transaction } = require('sequelize');

class SourceService extends Service {

  /**
   * 按照id查询
   *
   * @param {int} id 、
   * @return {*} 结果
   * @memberof SourceService
   */
  async selone(id) {
    const res = await this.ctx.model.Source.findOne({
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
   * 分页查询媒体来源
   *
   * @param {number} [page=1] 第几页
   * @param {number} [size=10] 每页条数
   * @return {*} 结果
   * @memberof SourceService
   */
  async selpage(page = 1, size = 10) {
    const List = await this.ctx.model.Source.findAndCountAll({
      order: [[ 'createdAt', 'DESC' ]],
      offset: size * (page - 1),
      limit: size,
    });
    if (!List) {
      this.ctx.throw(404, 'site not found');
    }
    return List;
  }

  /**
   * 添加来源媒体
   *
   * @param {string} name 媒体名称
   * @param {string} userId 用户id
   * @return {*} 结果
   * @memberof SourceService
   */
  async add(name, userId) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const source = await this.app.model.Source.create({
        sourceName: name,
        userId,
      }, { transaction });
      await this.ctx.model.Users.update({
        sourceId: source.id,
      }, {
        where: {
          id: userId,
        },
      }, { transaction });
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      return false;
    }
  }

  /**
   * 修改来源媒体
   *
   * @param {int} id 表id
   * @param {string} name 媒体名称
   * @param {string} userId 用户ID
   * @return {*} 结果
   * @memberof SourceService
   */
  async edit(id, name, userId) {
    const res = await this.app.model.Source.update({
      sourceName: name,
      userId,
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
   * 删除媒体来源名称
   *
   * @param {int} id 删除字段id
   * @return {*} 结果
   * @memberof SourceService
   */
  async del(id) {
    const res = await this.app.model.Source.destroy({
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

module.exports = SourceService;
