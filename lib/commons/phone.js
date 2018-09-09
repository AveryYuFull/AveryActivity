/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/26
 * desc: 所有和原生交互相关
 */
// const TWICE_SEND_TIME = 1000
const REQUEST_SEP = 300

const getCallBackName = (function () {
  let id = 0

  return function () {
    return '_native_callback_' + (id++)
  }
})()

const allResults = {}

function encodeParams(params) {
  return encodeURIComponent(JSON.stringify(params))
}

function actionWithIos(type, args = {}) {
  if (args.callback) {
    const callBackName = getCallBackName()
    window[callBackName] = args.callback
    args.callback = callBackName
  }

  window.webkit.messageHandlers[type].postMessage(args)
}

const device = (function () {
  const appVersion = navigator.userAgent.match(/tuhu.+?(\d+\.\d+\.\d+)/)
  const browserVersion = navigator.userAgent.match(/version\/(.+?)\s/i)

  const tuhuIos = navigator.userAgent.indexOf('tuhuIOS') > -1

  const tuhuAndroid = navigator.userAgent.indexOf('tuhuAndroid') > -1

  return $.extend({}, $.device, {
    tuhuIos: tuhuIos,
    tuhuAndroid: tuhuAndroid,
    appVersion: appVersion ? appVersion[1] : '',
    browserVersion: browserVersion ? browserVersion[1] - 0 : '',
    isApp: tuhuIos || tuhuAndroid
  })
})()

function actionWidthAndroid(type, args = {}) {
  const callback = args.callback
  if (callback) {
    delete args.callback
  }

  /** if ($.isEmptyObject(args)) {
    return window.WebViewJavascriptBridge.callHandler(type, {
      param: ''
    }, callback)
  } */

  return window.WebViewJavascriptBridge.callHandler(type, encodeURIComponent(encodeParams(args)), callback)
}

function deviceDetail() {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      return actionWidthAndroid('getDeviceID', {
        callback(data) {
          try {
            const main = JSON.parse(data)
            const detail = JSON.parse(main.track)
            delete main.track

            return resolve(Object.assign({}, detail, main))
          } catch (e) {

          }

          resolve({})
        }
      })
    } else {
      return actionWithIos('getDeviceInfo', {
        callback(data) {
          resolve(data)
        }
      })
    }
  }).then((data) => {
    /**
     * ios: {\"district\":\"\",\"city\":\"上海市\",\"is_gps_enabled\":true,\"screen_resolution\":\"375*667\",\"is_notify_enabled\":true,\"blackBox\":\"eyJ0b2tlbklkIjoiQmUxTDVjSVZyNGxXXC9lZlVheHpjUmY0RU9wTEtoV29GTXRSR0JPcFNTaUN4QjExTjgxdk4rSUoxdFZkT1FyUTFKNnJEcE9tSlBzdlBHNWxcL2N0cW8xUT09Iiwib3MiOiJpT1MiLCJwcm9maWxlVGltZSI6MzEwLCJ2ZXJzaW9uIjoiMy4wLjYifQ==\",\"os_name\":\"iOS\",\"lang\":\"zh\",\"network_status\":\"wifi\",\"model\":\"iPhone 6s\",\"province\":\"上海市\",\"device_model\":\"iPhone\",\"latitude\":31.1359252929688,\"device_type\":\"桂宇轩滴6s\",\"location\":\"31.1359252929688,121.402191162109\",\"device_carrier\":\"中国电信\",\"os_version\":\"10.3.3\",\"version\":\"5.1.0\",\"UDID\":\"D740AEED-7C44-45F9-BBA6-1E16FAB9E1A7\",\"longitude\":121.402191162109,\"country\":\"US\"}
     * android: {"blackBox":"eyJvcyI6ImFuZHJvaWQiLCJ2ZXJzaW9uIjoiMy4xLjEiLCJwYWNrYWdlcyI6ImNuLlR1SHUuYW5kcm9pZF81LjEuMCIsInByb2ZpbGVfdGltZSI6MTAyNjMsImludGVydmFsX3RpbWUiOjg0NzA1OTUsInRva2VuX2lkIjoic2hhYkd3YVJvYXFpZXdtWk5kUXFwNmlJZkNrS09GM1pHcHRYbmpCVTBzd242YzBodVNqOEZiSU9rRWVMbldzNFFabmRLWDRcL1p3OGp2bkl2R0xmWVNBPT0ifQ==","deviceId":"35e46291-7bab-3005-9954-f24103d106dc","deviceModel":"_huawei","deviceType":"HWVIE","deviceCarrier":"中国移动","isGpsEnabled":true,"isNotifyEnabled":"","lang":"zh","model":"VIE-AL10","osName":"HUAWEI","osVersion":"7.0","version":"5.1.0","netWork":"wifi","raw":{"device_type":"HWVIE","is_notify_enabled":false,"city":"上海市","client_time":1509003111,"event_type":"get_info","app_id":"android_app","screen_resolution":"1794x1080","app_name":"途虎养车","network":"wifi","is_gps_enabled":true,"device_carrier":"中国移动","app_version":"5.1.0","country":"CN","event_action":"get_info","device_id":"35e46291-7bab-3005-9954-f24103d106dc","imei":"482eeb98e36e800252e45fa498747f17","location":"31.138903,121.409357","lang":"zh","device_model":"VIE-AL10","os_version":"7.0","metadata":"{\"Source\":\"_huawei\"}","level":"info","user_id":"{92acaaaf-07be-54d4-c741-4d6b306a4a3b}","os_name":"HUAWEI","deviceid":"35e46291-7bab-3005-9954-f24103d106dc","blackbox":"eyJvcyI6ImFuZHJvaWQiLCJ2ZXJzaW9uIjoiMy4xLjEiLCJwYWNrYWdlcyI6ImNuLlR1SHUuYW5kcm9pZF81LjEuMCIsInByb2ZpbGVfdGltZSI6MTAyNjMsImludGVydmFsX3RpbWUiOjg0NzA1OTUsInRva2VuX2lkIjoic2hhYkd3YVJvYXFpZXdtWk5kUXFwNmlJZkNrS09GM1pHcHRYbmpCVTBzd242YzBodVNqOEZiSU9rRWVMbldzNFFabmRLWDRcL1p3OGp2bkl2R0xmWVNBPT0ifQ==","channel":"_huawei"}}
     */
    const result = {}

    result.blackBox = data.blackBox || data.blackbox || ''
    result.deviceId = data.deviceid || data.UDID || ''
    result.deviceModel = data.channel || data.device_model || ''
    result.deviceType = data.device_type || ''
    result.deviceCarrier = data.device_carrier || ''
    result.isGpsEnabled = data.is_gps_enabled || ''
    result.isNotifyEnabled = data.is_notify_enabled || ''
    result.lang = data.lang || ''
    /** result.country = data.country || ''
    result.province = data.province || ''
    result.city = data.city || ''
    result.district = data.district || ''
    result.latitude = data.latitude || ''
    result.longitude = data.longitude || '' */
    result.model = data.model || data.device_model || ''
    result.osName = data.os_name || ''
    result.osVersion = data.os_version || ''
    result.version = data.version || data.app_version || ''
    result.netWork = data.network || data.network_status || ''
    result.raw = data

    return result
  })
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      actionWidthAndroid('loginBridge', {
        callback: (res) => {
          let data = null

          try {
            data = JSON.parse(res)
          } catch (e) {

          }
          resolve(data)
        }
      })
    } else {
      actionWithIos('getUserInfo', {
        callback(data) {
          resolve(data)
        }
      })
    }
  })
}

function forceLogin() {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      window.androidLoginSuccessFuc = function (data) {
        if (!data) {
          resolve(data)
        } else {
          return getUserInfo().then((data) => {
            resolve(data)
          })
        }
      }
      actionWidthAndroid('actityBridgeNotRefresh')
    } else {
      actionWithIos('getUserInfo', {
        'callback': function (data) {
          resolve(data)
        },
        'force': true
      })
    }
  })
}

function locate() {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      window.onLocationOK = (locationInfo) => {
        try {
          const data = JSON.parse(locationInfo)
          if (data.code === 1) {
            delete data.code
            resolve(data)
          } else {
            resolve(null)
          }
        } catch (e) {
          resolve(null)
        }
      }

      return actionWidthAndroid('Location')
    }

    return actionWithIos('refreshLocation', {
      callback(data) {
        resolve(data || null)
      }
    })
  })
  // window.webkit.messageHandlers.refreshLocation.postMessage({'callback': 'refreshLocationCallback'})
}

function selectCar(args) {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      return actionWidthAndroid('ChangeCarFromH5', args)
    }
    // args.callback = function(data) {
    //   resolve(data)
    // }
    return actionWithIos('selectCar', {
      callback(data) {
        resolve(data)
      }
    })
  })
}

function carChange(item) {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      const params = {
        Brand: item.Brand,
        CarBrand: item.BrandType,
        CarName: item.CarName,
        SalesName: item.SalesName || '',
        Nian: item.Nian || '',
        PKID: item.CarID || '',
        PaiLiang: item.Pailiang || '',
        PropertyList: (item.PropertyList && item.PropertyList.length > 0 && JSON.stringify(item.PropertyList)) || '',
        TID: item.TID || '',
        TireSize: item.TireSize || '',
        TireSizeForSingle: item.TireSizeForSingle || '',
        VehicleID: item.ProductID || '',
        VehicleLogin: item.ImageUrl || '',
        VehicleName: item.Vehicle || '',
        IsDefaultCar: true,
        IsDelete: false,
        CarNumber: item.CarNumber || '',
        Registrationtime: item.Registrationtime || ''
      }
      params.callback = function (data) {
        resolve(data)
      }

      return actionWidthAndroid('carToNative', params)
    } else {
      // Brand: data.Brand,
      // BrandType: data.BrandType || data.CarBrand,
      // CarID: data.CarID || data.PKID || '',
      // CarName: data.CarName,
      // ImageUrl: data.ImageUrl || data.VehicleLogin,
      // IsDefaultCar: data.IsDefaultCar || true,
      // Nian: data.Nian || '',
      // Pailiang: data.Pailiang || data.PaiLiang,
      // ProductID: data.ProductID || data.VehicleID,
      // PropertyList: propertyList,
      // SalesName: data.SalesName || data.LiYangName || '',
      // TID: data.TID || '',
      // SpecialTireSize: data.SpecialTireSize || data.TireSizeForSingle || '',
      // TireSize: data.TireSize || data.Tires || '',
      // Vehicle: data.Vehicle || data.VehicleName || '',
      // raw: data
      const params = {
        car: {
          Brand: item.Brand,
          BrandType: item.BrandType,
          CarName: item.CarName,
          ProductID: item.ProductID,
          CarID: item.CarID,
          ImageUrl: item.ImageUrl,
          IsDefaultCar: item.IsDefaultCar,
          PropertyList: item.PropertyList || [],
          Nian: item.Nian || '',
          Pailiang: item.Pailiang || '',
          SalesName: item.SalesName || '',
          TID: item.TID || '',
          TireSize: item.TireSize || '',
          TireSizeForSingle: item.TireSizeForSingle || '',
          Vehicle: item.Vehicle,
          CarNumber: item.CarNumber || '',
          Registrationtime: item.Registrationtime || ''
        },
        callback(data) {

        }
      }

      return actionWithIos('saveCar', params)
    }
  })
}

function share(params) {
  if (device.tuhuAndroid) {
    return Promise.resolve(actionWidthAndroid('initH5Sharedata', params))
  }

  return Promise.resolve(actionWithIos('setShare', params))
}
// 分享埋点信息
function handleTaShareChannel(value) {
  if (tuhu.device.tuhuIos) {
    switch (value) {
      case 1:
        return {
          eventID: 'ClickWXHY',
          platform: '微信好友'
        }

      case 2:
        return {
          eventID: 'ClickPYQ',
          platform: '微信朋友圈'
        }

      case 4:
        return {
          eventID: 'ClickWEIBO',
          platform: '新浪微博'
        }

      case 8:
        return {
          eventID: 'ClickQQ',
          platform: 'QQ'
        }

      case 16:
        return {
          eventID: 'ClickQQKJ',
          platform: 'QQ空间'
        }

      case 64:
        return {
          eventID: 'ClickMSM',
          platform: '短信'
        }
    }
  } else if (tuhu.device.tuhuAndroid) {
    switch (JSON.parse(value).platform) {
      case 'WEIXIN_CIRCLE':
        return {
          eventID: 'ClickPYQ',
          platform: '微信朋友圈'
        }

      case 'WEIXIN':
        return {
          eventID: 'ClickWXHY',
          platform: '微信好友'
        }

      case 'QQ':
        return {
          eventID: 'ClickQQ',
          platform: 'QQ'
        }

      case 'QZONE':
        return {
          eventID: 'ClickQQKJ',
          platform: 'QQ空间'
        }

      case 'SINA':
        return {
          eventID: 'ClickWEIBO',
          platform: '新浪微博'
        }
    }
  }
}
function sharePanel(params) {
  // 唤起分享 埋点
  Ta.ta('event', 'home_click_share', {
    'channel': tuhu.device.tuhuAndroid ? 'Android' : 'IOS'
  })
  return new Promise((resolve, reject) => {
    params.callback = function (data) {
      // 分享回调埋点
      Ta.ta('event', `home_click_${handleTaShareChannel(data).eventID}`, {
        'platform': handleTaShareChannel(data).platform
      })
      resolve({
        'success': true,
        'platform': handleTaShareChannel(data).platform,
        'channel': tuhu.device.tuhuAndroid ? 'Android' : 'IOS'
      })
    }

    if (tuhu.device.tuhuAndroid) {
      return actionWidthAndroid('toShareMediaNew', params)
    }

    return actionWithIos('newShare', params)
  })
}

function getCar(params = {}) {
  return new Promise((resolve, reject) => {
    if (device.tuhuAndroid) {
      params.callback = function (data) {
        resolve(data)
      }

      Object.assign(params, {
        carLevel: 0,
        isNeedCar: 0
      })
      return actionWidthAndroid('getCar', params)
    }

    window.getCar = function (data) {
      resolve(data)
    }

    return actionWithIos('getDefaultCar')
  })
}

function toWeiZhang() {
  // if (tuhu.device.tuhuAndroid) {
  //   location.href = 'tuhu:///carProfile/trafficViolation/edit'
  // } else {
  //   location.href = 'tuhu:/carProfile/trafficViolation/result'
  // }

  location.href = 'tuhu:/carProfile/trafficViolation/result'

  return Promise.resolve(null)
}

function openBank(res) {
  if (tuhu.device.tuhuAndroid) {
    // Utils.link(BaseConfig.SEND_TO_IOS + "THOrderCashiersVC#" + encodeURIComponent(JSON.stringify({
    //   casgiersData: res,
    //   orderNumber: res.PayInfo.OrderNO
    // })))
    actionWidthAndroid('toActityBridge', {
      'FunctionID': 'cn.TuHu.Activity.OrderSubmit.PayOrderConfirm',
      // 'SerialNumbers': res.PayInfo.SerialNumbers || '',
      // 'PayAmount': res.PayInfo.Price || '',
      // 'subject': res.PayInfo.Title || '',
      // 'body': res.PayInfo.Body || '',
      'OrderNO': res.PayInfo.OrderNO,
      'CallBackUrl': res.PayInfo.CallBackUrl || ''
    })
  } else {
    location.href = 'tuhuaction://segue#THOrderCashiersVC#' + encodeURIComponent(JSON.stringify({
      casgiersData: res,
      orderNumber: res.PayInfo.OrderNO,
      CallBackUrl: res.PayInfo.CallBackUrl || ''
    }))
  }

  return Promise.resolve(null)
}

function closeWebview() {
  if (device.tuhuAndroid) {
    actionWidthAndroid('Close', {
      callback: () => {}
    })
  } else {
    actionWithIos('close')
  }
}

function toCoupons() {
  location.href = 'tuhu:/coupons'

  return Promise.resolve(null)
}
// 去保养页面
async function toMaintenance() {
  const isApp = tuhu.device.isApp
  const isAndroid = tuhu.device.tuhuAndroid
  const useMessage = await tuhu.getDefaultCar(5, false)
  const androidParams = {
    'baoyangType': '',
    'activityID': '',
    'isTuHuRecommend': 0,
    'baoyangcar': {
      'Brand': useMessage.Brand,
      'LIYANGID': useMessage.LiYangID,
      'Nian': useMessage.Nian,
      'Pailiang': useMessage.Pailiang,
      'TID': useMessage.TID,
      'TireSize': useMessage.TireSize,
      'Vehicle': useMessage.Vehicle,
      'ProductID': useMessage.ProductID,
      'ImageUrl': useMessage.ImageUrl,
      'PropertyList': useMessage.PropertyList
    }
  }
  const iosParams = {
    'carID': useMessage.carID,
    'productID': useMessage.vehicleID,
    'brandImage': useMessage.brandImg,
    'brand': useMessage.brand,
    'vehicle': useMessage.vehicle,
    'displacement': useMessage.pailiang,
    'year': useMessage.nian,
    'engineType': useMessage.salesname,
    'TID': useMessage.tid,
    'carNewProprtyArray': useMessage.property
  }
  if (isApp) {
    if (isAndroid) {
      actionWidthAndroid('toBaoYang', androidParams)
    } else {
      location.href = 'tuhuaction://segue#Tuhu.THCarMaintainVC#' + encodeURIComponent(JSON.stringify(iosParams))
      // Utils.link(Config.SEND_TO_IOS + 'Tuhu.THCarMaintainVC#' + Utils.encodeParams(iosParams))
    }
  }
}
// 去订单成功页面
function toOrderResult(args) {
  const {OrderId} = args
  tuhu.router.goPayRouter(true)

  if (tuhu.device.tuhuAndroid) {
    const param = {
      'FunctionID': 'cn.TuHu.Activity.OrderSubmit.OrderInfoSuccess',
      'OrderNO': OrderId,
      'OrderTypeIndex': 2
    }
    actionWidthAndroid('toActityBridge', param)
  } else if (tuhu.device.tuhuIos) {
    const param = {
      finishOrderID: OrderId + '',
      orderType: 2,
      segueType: 1
    }
    location.href = 'tuhuaction://segue#Tuhu.THFinishOrderVC#' + encodeURIComponent(JSON.stringify(param))
  }
}
// 去选择门店列表
function toShop(args) {
  const {pids} = args
  if (tuhu.device.tuhuAndroid) {
    const param = {
      'androidKey': 'tuhu:///placeOrder/selectShop?ShowType=1&serviceType=2&pids=' + pids + '&ShowType=1',
      'androidValue': '',
      'callback': window.shopCallBack
    }
    actionWidthAndroid('toGetOrderShopNew', param)
  } else if (tuhu.device.tuhuIos) {
    window.currentObj = {
      shopCallBack: window.shopCallBack
    }

    location.href = 'tuhuaction://selectShop#' + pids + '##window.shopCallBack'
  }
}
// 跳文章评论
function toArticleComment(args) {
  const {id} = args
  if (tuhu.device.tuhuIos) {
    window.location.href = 'tuhu:/explore/article/comment?pkid=' + id
  } else if (tuhu.device.tuhuAndroid) {
    window.location.href = 'tuhu:/explore/article/comment?id=' + id
  }
}
// 跳转商品详情
function toProduct(args) {
  const {pid} = args
  let flag = pid.substring(0, 2)
  let arr = pid.split('|')
  if (flag === 'TR') {
    location.href = `tuhu:/tire/item?pid=${arr[0]}&vid=${arr[1]}`
  } else if (flag === 'LG') {
    location.href = `tuhu:/wheelRim/item?pid=${arr[0]}&vid=${arr[1]}`
  } else {
    location.href = `tuhu:/accessory/item?pid=${arr[0]}&vid=${arr[1]}`
  }
}
function actionWithNative(name, args = {}) {
  if (!tuhu.device.isApp || location.href.indexOf('resource.html') > -1) {
    return Promise.resolve(null)
  }

  // let count = 0
  const key = name + JSON.stringify(args)
  if (allResults[key]) {
    if (+new Date() - allResults[key].time < REQUEST_SEP) {
      return allResults[key].result
    }

    delete allResults[key]
  }

  return (function _actionWithNative() {
    let result = Promise.resolve(null)
    switch (name) {
      case 'getUserInfo':
        result = getUserInfo()
        break
      case 'forceLogin':
        result = forceLogin()
        break
      case 'deviceDetail':
        result = deviceDetail()
        break
      case 'locate':
        result = locate()
        break
      case 'selectCar':
        result = selectCar(args)
        break
      case 'carChange':
        result = carChange(args)
        break
      case 'getCar':
        result = getCar(args)
        break
      case 'share':
        result = share(args)
        break
      case 'sharePanel':
        result = sharePanel(args)
        break
      case 'toWeiZhang':
        result = toWeiZhang()
        break
      case 'openBank':
        result = openBank(args)
        break
      case 'closeWebview':
        result = closeWebview()
        break
      case 'toCoupons':
        result = toCoupons()
        break
      case 'toMaintenance':
        result = toMaintenance()
        break
      case 'toOrderResult':
        result = toOrderResult(args)
        break
      case 'toShop':
        result = toShop(args)
        break
      case 'toArticleComment':
        result = toArticleComment(args)
        break
      case 'toProduct':
        result = toProduct(args)
        break
    }

    // const timeout = setTimeout(function () {
    //   /* if (['selectCar', 'forceLogin', 'getCar', 'carChange', 'sharePanel', 'toWeiZhang', 'openBank', 'closeWebview'].indexOf(name) < 0 && count++ < 1) {
    //     _actionWithNative()
    //   } */
    //   if (['getUserInfo', 'deviceDetail', 'locate'].indexOf(name) > -1 && count++ < 1) {
    //     _actionWithNative()
    //   }
    // }, TWICE_SEND_TIME)

    const ret = result.then((data) => {
      // clearTimeout(timeout)

      return data
    })

    allResults[key] = {
      result: ret,
      time: +new Date()
    }

    return ret
  })()
}

function actionWithAll(name, args = {}) {
  if (!tuhu.device.isApp || location.href.indexOf('resource.html') > -1) {
    // h5 环境下
    if (name === 'toMaintenance') {
      tuhu.navigateTo({
        url: '/pages/maintenance/index'
      })
    } else if (name === 'toOrderResult') {
      tuhu.router.goPayRouter(true)

      tuhu.navigateTo({
        url: '/pages/order/orderResult',
        query: {
          i: args.OrderId,
          orderType: 1
        }
      })
    } else if (name === 'toShop') {
      return tuhu.changeShop({
        serviceType: args.serviceType, // 门店类型 1 轮胎 2 保养 4 服务
        pids: args.pids, // pids
        activityId: '', // 活动id
        shopId: args.shopId // 默认门店id
      })
    }
    // if (name === 'openBank') {
    //   let url = 'https://wx.tuhu.cn/order/PayWay?i=' + args.OrderNO.replace(/^TH/, '')
    //   location.replace(url)
    // }
  } else {
    // 在原生环境下
    actionWithNative(name, args)
  }
}
export default {
  actionWithNative: actionWithNative,
  device: device,
  actionWithAll: actionWithAll,
  getDeviceDetail() {
    return actionWithNative('deviceDetail')
  },
  newWebView(url) {
    if (this.device.tuhuIos) {
      location.href = 'tuhu:/webView?url=' + encodeURIComponent(url)
    } else if (this.device.tuhuAndroid) {
      location.href = 'tuhu:/webView?url=' + encodeURIComponent(encodeURIComponent(url))
    }
  }
}
