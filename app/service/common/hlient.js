'use strict';

const fs = require('fs');
const FormStream = require('formstream');
const Controller = require('egg').Controller;

const headers = [{
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
}, {
  'Content-Type': 'application/json; encoding=utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 UBrowser/4.0.3214.0 Safari/537.36',
}];

class HlientController extends Controller {

  /**
   * get请求数据
   *
   * @param {*} url 地址
   * @param {*} op 扩展对象
   * @memberof HlientController
   */
  async get(url, op = {}) {
    const ctx = this.ctx;
    const result = await ctx.curl(url, Object.assign({
      dataType: 'text',
      headers: headers[parseInt(Math.random() * 10)],
    }, op));
    return result;
  }

  async post(url, data) {
    const ctx = this.ctx;

    const result = await ctx.curl(url, {
      // 必须指定 method
      method: 'POST',
      // 通过 contentType 告诉 httpclient 以 JSON 格式发送
      contentType: 'json',
      data,
      // 明确告诉 httpclient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    return result;
  }


}

module.exports = HlientController;
