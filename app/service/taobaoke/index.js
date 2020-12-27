'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const appkey = '31271329';
const appsecret = '57c15b30e3e93d3e759ef18efa321ab4';
const adzone_id = '24762299' // mm_xxx_xxx_12345678三段式的最后一段数字
class TaobaokeService extends Service {

  /**
   * 公共方法
   * @param {*} [paramet={}]
   * @return
   * @memberof TaobaokeService
   */
  async common(paramet = {}) {
    const data = {
      app_key: appkey,
      appsecret: appsecret,
      timestamp: await this.ctx.helper.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      format: 'json',
      v: '2.0',
      sign_method: 'md5',
      ...paramet
    }
    const sign = crypto.createHash('md5').update(appsecret + await this.ctx.helper.sort_ascii(data) + appsecret).digest('hex');
    data.sign = sign.toUpperCase();
    return await this.ctx.curl('http://gw.api.taobao.com/router/rest', { method: 'POST', data, dataType: 'json' });
  }

  /**
   * 淘宝客-推广者-店铺搜索
   * @param {string} data 搜索关键字
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkShopGet(data) {
    const paramet = {
      method: 'taobao.tbk.shop.get',
      fields: 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
      ...data,
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   *  淘宝客-公用-淘宝客商品详情查询(简版)
   *
   * @param {string} num_iids  商品ID串，用,分割，最大40个
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkItemInfoGet(num_iids) {
    const paramet = {
      method: 'taobao.tbk.item.info.get',
      num_iids,
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   * 淘宝客-公用-店铺关联推荐
   *
   * @param {*} user_id 卖家Id
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkShopRecommendGet(user_id) {
    const paramet = {
      method: 'taobao.tbk.shop.recommend.get',
      fields: 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
      user_id
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   * 淘宝客-公用-链接解析出商品id
   *
   * @param {string} click_url 长链接或短链接
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkItemClickExtract(click_url) {
    const paramet = {
      method: 'taobao.tbk.item.click.extract',
      click_url
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   * 淘宝客-公用-阿里妈妈推广券详情查询
   *
   * @param {int} item_id 商品ID(非必填)
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkCouponGet(item_id) {
    const paramet = {
      method: 'taobao.tbk.coupon.get',
      item_id
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   * 淘宝客-公用-淘口令生成
   *
   * @param {String} text 口令弹框内容
   * @param {String} url 口令跳转目标页
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkTpwdCreate(text, url) {
    const paramet = {
      method: 'taobao.tbk.tpwd.create',
      text,
      url,
    }
    const res = await this.common(paramet)
    if (res.res.status == 200) {
      return res.data.tbk_shop_get_response.results
    }
    return '请求数据失败'
  }

  /**
   * 淘宝客-推广者-物料搜索
   *
   * @param {json} data
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkDgMaterialOptional(data) {
    const paramet = {
      method: 'taobao.tbk.dg.material.optional',
      adzone_id,
      ...data,
    };
    const res = await this.common(paramet);
    if (res.res.status === 200) {
      if (res.data.tbk_dg_material_optional_response) {
        return res.data.tbk_dg_material_optional_response.result_list;
      } else {
        return res.data
      }
    }
    return '请求数据失败';
  }

  /**
   * 淘宝客-推广者-物料精选
   *
   * @param {*} material_id
   * @param {*} par
   * @return
   * @memberof TaobaokeService
   */
  async taobaoTbkDgOptimusMaterial(material_id, par) {
    const paramet = {
      method: 'taobao.tbk.dg.optimus.material',
      adzone_id,
      material_id,
      ...par,
    };
    const res = await this.common(paramet);
    if (res.res.status === 200) {
      return res.data.tbk_shop_get_response.results;
    }
    return '请求数据失败';
  }
}
module.exports = TaobaokeService;
