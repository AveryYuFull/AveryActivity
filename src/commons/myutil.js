/* eslint-disable */
class MyUtil {
  showPoint(param) {
    const money = (param / 100).toString()
    let showM = ''
    if (money.indexOf('.') <= -1) {
      showM = money + '.00'
      return showM
    }
    if (money.split('.')[1].length < 2) {
      showM = money + '0'
      return showM
    }
    return money
  }
  wxBridge(data, orderno) {
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': data.appId, // 公众号名称，由商户传入
        'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
        'nonceStr': data.nonceStr, // 随机串
        'package': data.package,
        'signType': data.signType, // 微信签名方式：
        'paySign': data.paySign // 微信签名
      }, function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // location.href = 'https://wx.tuhu.cn/order/SuccessOrderRedirect?i=' + orderno
          const url = tuhu.localStorage.getItem('returnurl') || 'https://wx.tuhu.cn/order/SuccessOrderRedirect?i=' + orderno + '&channel=wx'
          location.href = url
          localStorage.setItem('returnurl', '')
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      }
    )
  }
  onBridgeReady(datas) {
    const data = datas.extField
    const orderno = datas.outBizNo

    if (window.WeixinJSBridge) {
      this.wxBridge(data, orderno)
    } else {
      setTimeout(() => {
        this.wxBridge(data, orderno)
      }, 1000)
    }
  }
  toError() {
    tuhu.redirectTo({
      url: '/pages/cashier/error'
    })
  }
  catchError(e) {
    let msg = ''
    if (e.message === '接口异常 状态码:403') {
      msg = '系统异常，请返回重试或联系客服人员'
    } else {
      msg = '网络异常，请检查网络后重试'
    }
    tuhu.alert(msg, () => {
      this.toError()
    })
  }
  toPay(data) {
    // const channel = tuhu.getParam('channel') || ''
    const payway = data.data.payWay
    const appParams = data.data.extField
    let payModel = {
      payWay: payway
    }
    if (payway === 'WX_APP') {
      payModel.params = appParams
    } else if (payway === 'WX_OPEN') {
      const datas = data.data
      if (typeof window.WeixinJSBridge === 'undefined') {
        if (window.document.addEventListener) {
          window.document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(datas), false)
        } else if (window.document.attachEvent) {
          window.document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(datas))
          window.document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(datas))
        }
      } else {
        this.onBridgeReady(datas)
      }
    } else if (payway === 'ALIPAY_APP' || payway === 'ALIPAY_HUABEI' || payway === 'BESTPAY_APP' || payway === 'UNION_APP' || payway === 'APPLE_PAY') {
      payModel.params = appParams.orderString
    } else if (payway === 'ALIPAY_WAP') {
      const contents = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui"></head><body>${data.data.form}<script>document.forms['punchout_form'].acceptCharset = "UTF-8";document.forms['punchout_form'].submit();</script><body></html>`
      document.write(contents)
      return
    } else if (payway === 'BAIFUBAO_WAP_DIRECT' || payway === 'BESTPAY_WAP' || payway === 'WX_WAP') {
      const url = data.data.extField.redirect_url
      location.href = url
      return
    } else if (payway === 'CHINAPAY_WAP') {
      payModel.params = data.data.form
      const contents = `<html><body>${data.data.form}<script>document.forms['punchout_form'].acceptCharset = "UTF-8";document.forms['punchout_form'].submit();</script><body></html>`
      document.write(contents)
      return
    } else if (payway === 'UNION_PC' || payway === 'UNION_WAP') {
      const contents = `<html><body>${data.data.form}<script>document.forms['punchout_form'].acceptCharset = "UTF-8";document.forms['punchout_form'].submit();</script><body></html>`
      document.write(contents)
      return
    } else if (payway === 'ALIPAY_DIRECT') {
      const contents = `<html><body>${data.data.form}<script>document.forms['paysubmit'].acceptCharset = "UTF-8";document.forms['paysubmit'].submit();</script><body></html>`
      document.write(contents)
      return
    } else if (payway === 'ALIPAY_BARCODE' || payway === 'WX_BARCODE' || payway === 'BESTPAY_BARCODE' || payway === 'CASHPAY') {
      let params = {
        payWay: payway
      }
      if (data.data.paymentStatus === 'SUCCESS') {
        params.resultCode = 1
      } else {
        params.resultCode = 0
      }
      window.thp_scan_result(params)
      return
    } else {
      payModel.params = appParams.orderString
    }
    if (tuhu.device.ios) {
      window.webkit.messageHandlers.thp_pay.postMessage(payModel)
    } else {
      this.exeAndroid('thp_pay', payModel)
    }
  }
  encodeParams(params) {
    return encodeURIComponent(JSON.stringify(params))
  }
  exeAndroid(type, args = {}) {
    const callback = args.callback
    if (callback) {
      delete args.callback
    }
    return window.WebViewJavascriptBridge.callHandler(type, encodeURIComponent(this.encodeParams(args)), callback)
  }
}

export default new MyUtil()
