// 洗车下单接口
const CLEAN_CAR_URL = 'https://wx.tuhu.cn/Order/CreateShopOrder'
// 加油卡下单接口
const OILING_URL = 'https://api.tuhu.cn/FuelCard/CreateFuelCardOrder'
// 道路救援下单接口
const ROADSERVICE_URL = 'https://api.tuhu.cn/Order/CreateOrder'
// 车品url
const CHEPIN_URL = '/pages/order/cporder'
// 轮胎url
const TIRE_URL = '/pages/order/tireorder'
// 保养url
const BAOYANG_URL = '/pages/order/byorder'
// 蓄电池url
const BATTERY_URL = '/pages/order/batteryorder'
/**
 * params: 接口参数
 * type: 下单类型 // 1轮胎 2保养 3美容 4车品 5蓄电池 6加油卡 7道路救援
 */

let instance = null

class Pay {
  static toPay = (params = {}, type = Number) => {
    if (!instance) {
      instance = new Pay()
    }

    if (typeof type !== 'number' || !(type > 0 && type < 8)) {
      throw new Error('无效type')
    }

    return instance._payRouter(params, type)
  }

  static payError = (e) => {
    // TODO
    tuhu.toast(e.message || '订单提交失败，请稍后再试', 2000)
  }

  static paySuccess = (id) => {
    if (tuhu.channel === 'huawei') {
      tuhu.router.goPayRouter()
    }

    setTimeout(() => {
      tuhu.openBank({
        PayInfo: {
          OrderNO: 'TH' + id
        }
      })
    })
  }

  constructor() {
    this.fetch = (url, data) => {
      return tuhu.fetch(url + (tuhu.isLightApp ? `?_channel=${tuhu.channel}` : ''), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }, { session: true, status: false })
    }
  }

  // 支付路由
  _payRouter(params, type) {
    if (!params) {
      throw new Error('传递的数据无效')
    }

    switch (type) {
      // 轮胎
      case 1:
        tuhu.navigateTo({
          url: TIRE_URL,
          data: {
            tireData: params.submitData,
            shopId: params.shopId,
            isBook: params.Stockout
          }
        })
        break
      // 保养
      case 2:
        tuhu.navigateTo({
          url: BAOYANG_URL,
          data: {
            byData: params
          }
        })
        break
      // 洗车
      case 3:
        return instance._cleanCarPay(params)
      // 车品
      case 4:
        tuhu.navigateTo({
          url: CHEPIN_URL,
          data: {
            cpData: params.cpData,
            clearShopList: params.clearShopList
          }
        })
        break
      // 蓄电池
      case 5:
        tuhu.navigateTo({
          url: BATTERY_URL,
          data: {
            batteryData: params
          }
        })
        break
      // 加油卡
      case 6:
        return instance._oilingPay(params)
      // 道路救援
      case 7:
        return instance._roadServicePay(params)
    }
  }

  // 洗车支付
  async _cleanCarPay(params) {
    try {
      const data = {
        jsonStr: JSON.stringify(params)
      }

      const user = await tuhu.getUserInfo({
        force: true
      })

      if (!user.islogin) {
        return
      }

      const res = await this.fetch(CLEAN_CAR_URL, data)

      // error
      if (res.Code - 0 !== 1) {
        throw new Error(res.Msg || res.Message || res.message || res.Messages)
      }

      // success
      if (res.Data && res.Data.Url !== '') {
        Pay.paySuccess(res.Data.OrderID)
      } else {
        // TODO 第三方
      }
    } catch (e) {
      // TODO
      Pay.payError(e)
    }
  }

  // 加油卡支付
  async _oilingPay(params) {
    try {
      const user = await tuhu.getUserInfo({
        force: true
      })

      if (!user.islogin) {
        return
      }

      const res = await this.fetch(OILING_URL, params)

      // error
      if (res.Code - 0 === 0) {
        throw new Error(res.Msg || res.Message || res.message || res.Messages)
      } else if (res.Code - 0 === 3) {
        throw new Error('您当月的充值额度2000元已满，感谢您对我们的厚爱，请下个月再来~')
      // success
      } else {
        Pay.paySuccess(res.PayInfo.OrderId)
      }
    } catch (e) {
      Pay.payError(e)
    }
  }

  // 道路救援支付
  async _roadServicePay(params) {
    try {
      const data = {
        jsonStr: JSON.stringify(params)
      }

      const user = await tuhu.getUserInfo({
        force: true
      })

      if (!user.islogin) {
        return
      }

      const res = await this.fetch(ROADSERVICE_URL, data)

      // error
      if (res.Code - 0 !== 1) {
        throw new Error(res.Msg || res.Message || res.message || res.Messages)
      }

      // success
      if (res.Data && res.Data.Url !== '') {
        Pay.paySuccess(res.Data.OrderID)
      } else {
        // TODO 第三方
      }
    } catch (e) {
      // TODO
      Pay.payError(e)
    }
  }
}

export default Pay
