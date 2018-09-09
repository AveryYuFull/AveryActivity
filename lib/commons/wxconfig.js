/**
 * updateBy: duwei
 * updateTime: 2017-9-11
 * updateDesc: 支持传入调用方法
 *
 * WxConfig().share().then((status)=>{
 *   // status为true则配置成功
 * })
 *
 */
const CALL_URL = '//wx.tuhu.cn/home/GetWxJsApiParams'
const WX_URL = 'https://res.tuhu.org/react/lib/jweixin.1.2.0.min.js'

class WxConfig {
  static share() {
    if (!tuhu.device.isWeixin) {
      return
    }

    const share = new WxConfig()
    return share.config()
  }

  constructor() {
    this.param = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation', 'openLocation']

    this.sign = null
  }

  config() {
    return this.getSign().then(() => {
      if (window.wx) {
        return this.wxConfig()
      }

      return tuhu.script(WX_URL).then(() => {
        return this.wxConfig()
      })
    })
  }

  wxConfig() {
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: this.sign.appid, // 必填，公众号的唯一标识
      timestamp: this.sign.timestamp, // 必填，生成签名的时间戳
      nonceStr: this.sign.nonceStr, // 必填，生成签名的随机串
      signature: this.sign.signature, // 必填，签名，见附录1
      jsApiList: this.param // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })

    return new Promise((resolve, reject) => {
      window.wx.ready(() => {
        window.wx.checkJsApi({
          jsApiList: this.param,
          success: function (res) {
            resolve(true)
          }
        })
      })
    })
  }

  getSign() {
    return tuhu.fetch(CALL_URL + '?url=' + encodeURIComponent(location.href.split('#')[0]), {}, {
      status: false
    })
    .then((ret) => {
      this.sign = JSON.parse(ret)
    })
  }
}

export default WxConfig
