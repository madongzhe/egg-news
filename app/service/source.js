'use strict';

const Service = require('egg').Service;
const { literal } = require('sequelize');

class SourceService extends Service {

  /**
   * 关注媒体
   * @param {*} id //媒体id
   * @param {*} userid //用户id
   * @return {*} //
   * @memberof SourceService
   */
  async sourceAdd(id, userid) {
    const t = await this.ctx.model.transaction();
    try {
      await this.ctx.model.Source.update({
        fans: literal('fans + 1'),
      },
      {
        where: {
          id,
        },
      },
      {
        transaction: t,
      });
      await this.ctx.model.Subscribe.create({
        sourceid: id,
        userid,
      },
      {
        transaction: t,
      });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  }
  /**
   * 取消关注媒体
   * @param {*} id //媒体id
   * @param {*} userid //用户id
   * @return {*} //
   * @memberof SourceService
   */
  async sourceDel(id, userid) {
    const t = await this.ctx.model.transaction();
    try {
      await this.ctx.model.Source.update({
        fans: literal('fans - 1 '),
      },
      {
        where: {
          id,
        },
      },
      {
        transaction: t,
      });
      await this.ctx.model.Subscribe.update({
        active: 0,
      },
      {
        where: {
          sourceid: id,
          userid,
          active: 1,
        },
      },
      {
        transaction: t,
      });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  }

  /**
   * 查找是否关注
   *
   * @param {*} sourceid 媒体id
   * @param {*} userid 用户id
   * @return {*} 、
   * @memberof SourceService
   */
  async isSubscribe(sourceid, userid) {
    const res = await this.ctx.model.Subscribe.findOne({
      where: {
        userid,
        sourceid,
        active: 1,
      },
    });
    if (res) {
      return true;
    }
    return false;
  }
}

module.exports = SourceService;
