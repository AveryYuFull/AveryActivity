/**
 * author: guiyuxuan@tuhu.cn
 * date: 2017/8/21
 * desc: 获取用户位置信息
 * 调用方式: Locate.getLocate({
 *  refresh: false //是否实时获取 默认为false
 * })
 * 正常返回 (ios,android,h5)保持一致
 *{
    city: "上海市"
    district: "闵行区"
    info: "上海市闵行区万源路18号-1"
    latitude: "31.1359024047852"
    longitude: "121.402229309082"
    province: "上海市"
 }
 *异常返回 null
 */
// import jsonp from 'fetch-jsonp'
// import WxConfig from './wxconfig'

// const MAP_URL = 'https://webapi.amap.com/maps?v=1.3&key=e8496e8ac4b0f01100b98da5bde96597'
// const CALL_URL = 'https://wx.tuhu.cn/home/GetWxJsApiParams'
// const WX_URL = 'https://res.tuhu.org/react/lib/jweixin.1.2.0.min.js'
// const BAIDU_MAP = 'https://api.map.baidu.com/getscript?v=2.0&ak=w742K60CZ4fOaGEQ3n6HeB05'
import WxConfig from './wxconfig'

const SELECT_MAP = 'https://wx.tuhu.cn/user/SelectMap'

const CONVER_BAIDU = 'https://wx.tuhu.cn/user/SelectConvertToBaidu'

let lastOptions = {}

let allowed = false

const SELECT_KEY = '_locate_user_selected'

let locatePromise = null

let curLocatePromise = null

function nativeMap(data) {
  if (tuhu.isLightApp) {
    return tuhu.toast('暂不支持')
  }

  const buttons1 = [
    {
      text: '高德地图',
      bold: true,
      onClick: () => {
        tuhu.fetchJsonp(`https://apis.map.qq.com/ws/coord/v1/translate?locations=${data.lat},${data.lng}&type=3&output=jsonp&key=FQBBZ-RC5K4-E4CU3-XMZ43-4QEHZ-EZB5X`)
        .then(res => res.json())
        .then((res) => {
          const data = res.locations[0]
          if (tuhu.device.android) {
            location.href = `androidamap://navi?sourceApplication=途虎养车&lat=${data.lat}&lon=${data.lng}&dev=1&style=2`
          } else {
            location.href = `iosamap://navi?sourceApplication=途虎养车&lat=${data.lat}&lon=${data.lng}&dev=1&style=2`
          }
        })
      }
    },
    {
      text: '百度地图',
      onClick: () => {
        tuhu.getLocate().then(function(from) {
          location.href = 'baidumap://map/direction?origin=' + from.latitude + ',' + from.longitude + '&destination=' + data.lat + ',' + data.lng + '&mode=driving&region=' + from.city
        })
      }
    }
  ]
  const buttons2 = [
    {
      text: '取消'
    }
  ]
  const groups = [buttons1, buttons2]
  tuhu.actions(groups)
}

function locateTo(data = {}) {
  if (tuhu.device.isWeixin) {
    return WxConfig.share()
    .then(() => {
      return tuhu.fetchJsonp(`https://apis.map.qq.com/ws/coord/v1/translate?locations=${data.lat},${data.lng}&type=3&output=jsonp&key=FQBBZ-RC5K4-E4CU3-XMZ43-4QEHZ-EZB5X`).then(res => res.json())
    }).then((res) => {
      const coverData = res.locations[0]
      window.wx.openLocation({
        latitude: coverData.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: coverData.lng, // 经度，浮点数，范围为180 ~ -180。
        name: data.name, // 位置名
        address: data.address, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }).catch((e) => {
      tuhu.navigateTo({
        url: '/pages/_locate/index',
        query: data
      })
    })
  }

  tuhu.navigateTo({
    url: '/pages/_locate/index',
    query: data
  })
}

function getSelectedCity() {
  let result = null

  try {
    result = JSON.parse(tuhu.localStorage.getItem(SELECT_KEY))
  } catch (e) {

  }

  return result
}

class Locate {
  static getIpLocate(options) {
    const instance = new Locate(options)

    return instance.getH5Location()
  }
  static getCurLocate() {
    const instance = new Locate()

    return instance.getCurLocation()
  }
  static selectCity(selectedInfo) {
    tuhu.navigateBack()
    const city = selectedInfo.city || selectedInfo.City
    const district = selectedInfo.district || selectedInfo.District || ''

    tuhu.getLocate().then((locationInfo) => {
      const allSaveLocate = {
        latitude: locationInfo.latitude || '',
        longitude: locationInfo.longitude || '',
        currentProvince: locationInfo.currentProvince,
        currentCity: locationInfo.currentCity,
        currentDistrict: locationInfo.currentDistrict,
        province: selectedInfo.province || selectedInfo.Province,
        city: city,
        district: city === district ? '' : district,
        info: locationInfo.info || ''
      }

      tuhu.store && tuhu.store.commit('setLocationInfo', {
        locationInfo: allSaveLocate
      })

      tuhu.localStorage.setItem(SELECT_KEY, JSON.stringify({
        province: allSaveLocate.province,
        city: allSaveLocate.city,
        district: allSaveLocate.district,
        latitude: locationInfo.latitude || '',
        longitude: locationInfo.longitude || ''
      }))
    })
  }

  static getLocate(options) {
    const instance = new Locate(options)

    return instance.getLocate()
  }

  static nativeMap = nativeMap

  static locateTo = locateTo

  constructor(options = {}) {
    this.options = Object.assign({
      ipLocation: true,
      checkLocation: false,
      commit: true,
      refresh: false,
      updateStore: false
    }, options)

    if (!allowed && !options.ipLocation && lastOptions.ipLocation) {
      locatePromise = null
    }

    if (options.refresh) {
      locatePromise = null
    }
  }

  // _detailData(res, resolve) {
  //   const formData = new FormData()
  //   formData.append('longitude', res.longitude)
  //   formData.append('latitude', res.latitude)

  //   tuhu.fetch(CONVER_BAIDU, {
  //     method: 'POST',
  //     body: formData
  //   }, {
  //     status: false
  //   }).then((data) => {
  //     return data.result[0]
  //   }).then((data) => {
  //     return this._detailData(data).then((data) => {
  //       resolve(data)
  //     })
  //   })
  // }

  async _detailInfo(lng, lat) {
    let formData = new FormData()
    formData.append('longitude', lng)
    formData.append('latitude', lat)

    const data = await tuhu.fetch(CONVER_BAIDU, {
      method: 'POST',
      body: formData
    }, {
      status: false
    }).then((data) => {
      return data.result[0]
    })

    formData = new FormData()
    formData.append('longitude', data.x)
    formData.append('latitude', data.y)

    return tuhu.fetch(SELECT_MAP, {
      method: 'POST',
      body: formData
    }, {
      status: false
    }).then((data) => {
      const ret = data.result

      return {
        latitude: ret.location.lat,
        longitude: ret.location.lng,
        province: ret.address_component.province,
        city: ret.address_component.city,
        district: ret.address_component.district,
        info: (ret.formatted_addresses && ret.formatted_addresses.recommend) || ret.formatted_addresses
      }
    })
  }

  // _getWxLocation() {
  //   return WxConfig.share(['getLocation', 'openLocation']).then(() => {
  //     return new Promise((resolve, reject) => {
  //       window.wx.getLocation({
  //         type: 'wgs84',
  //         success: (res) => {
  //           this._detailData(res, resolve)
  //         },
  //         fail: function (e) {
  //           console.error('微信获取位置失败', e)
  //           resolve(null)
  //         },
  //         cancel: function (e) {
  //           console.error('微信获取位置取消', e)
  //           resolve(null)
  //         }
  //       })
  //     })
  //   }).catch((e) => {
  //     return Promise.resolve(null)
  //   })
  // }

  // _getGaode() {
  //   return new Promise((resolve, reject) => {
  //     const map = new window.AMap.Map('map')

  //     function onComplete(data) {
  //       try {
  //         const locationInfo = {}

  //         locationInfo.province = data.addressComponent.province
  //         locationInfo.city = data.addressComponent.city || data.addressComponent.province
  //         locationInfo.district = data.addressComponent.district
  //         locationInfo.info = data.formattedAddress
  //         locationInfo.latitude = data.position.lat
  //         locationInfo.longitude = data.position.lng

  //         resolve(locationInfo)
  //       } catch (e) {
  //         reject(e)
  //       }
  //     }

  //     function onError(data) {
  //       reject(data)
  //     }

  //     map.plugin('AMap.Geolocation', () => {
  //       const geolocation = new window.AMap.Geolocation({
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //         maximumAge: 0,
  //         convert: true,
  //         showButton: true,
  //         buttonPosition: 'LB',
  //         buttonOffset: new window.AMap.Pixel(10, 20),
  //         showMarker: true,
  //         showCircle: true,
  //         panToLocation: true,
  //         zoomToAccuracy: true
  //       })

  //       map.addControl(geolocation)
  //       window.AMap.event.addListener(geolocation, 'complete', onComplete)
  //       window.AMap.event.addListener(geolocation, 'error', onError)

  //       geolocation.getCurrentPosition()
  //     })
  //   })
  // }

  // _getH5Location() {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this._detailData(position.coords, resolve)
  //     }, (e) => {
  //       console.error('调用h5 navigator.geolocation 失败：', e)
  //       resolve(null)
  //     })
  //   })
  // }

  async getH5Location() {
    // debugger
    // return jsonp('https://api.map.baidu.com/location/ip?ak=w742K60CZ4fOaGEQ3n6HeB05&coor=bd09ll')
    // .then(res => res.json())
    // .then((data) => {
    //   debugger
    //   return this._detailInfo(data.content.point)
    // })
    // await tuhu.script(BAIDU_MAP)

    // const data = await new Promise((resolve, reject) => {
    //   const geolocation = new window.BMap.Geolocation()
    //   geolocation.getCurrentPosition(function(r) {
    //     if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
    //       resolve(r)
    //     } else {
    //       reject(this.getStatus())
    //     }
    //   }, {
    //     enableHighAccuracy: true
    //   })
    // })
    let src = '/static/locate.html'
    if (location.host === 'wx.tuhu.cn') {
      src = 'https://wx.tuhu.cn/vue/locate.html'
    } else if (location.host === 'wxdev.tuhu.work') {
      src = 'https://wxdev.tuhu.work/vue/locate.html'
    } else if (location.host === 'wx.dev.tuhu.work') {
      src = 'http://wx.dev.tuhu.work/vue/locate.html'
    }

    const iframe = $(`<iframe style="display:none;" src="${src}"></iframe>`)
    $(document.body).append(iframe)

    return new Promise((resolve, reject) => {
      window._locateIframePromise = {
        resolve: resolve,
        reject: reject
      }
    }).then((ret) => {
      iframe.remove()
      if (!ret.address.district && !this.options.ipLocation) {
        return null
      }

      allowed = !!ret.address.district

      return {
        latitude: ret.latitude,
        longitude: ret.longitude,
        province: ret.address.province,
        city: ret.address.city,
        district: ret.address.district,
        info: ret.address.city + ret.address.district + ret.address.street + ret.address.street_number
      }
      // return this._detailInfo(ret.point)
    }).catch((e) => {
      iframe.remove()
      return null
    })
    // return this._detailInfo(data.point)

    // jsonp('https://api.map.baidu.com/highacciploc/v1' + tuhu.util.query2Str({
    //   ak: 'w742K60CZ4fOaGEQ3n6HeB05',
    //   coor: 'bd09ll',
    //   qterm: 'mb',
    //   callback_type: 'jsonp',
    //   extensions: 1
    // }))
    // .then(res => res.json())
    // .then((data) => {
    //   debugger
    // })

    // if (tuhu.device.isWeixin) {
    //   return this._getWxLocation()
    // } else {
    //   if (window.AMap === undefined) {
    //     return tuhu.script(MAP_URL).then(() => {
    //       return this._getGaode().catch((e) => {
    //         console.error('调用高德API失败：', e)
    //         return this._getH5Location()
    //       })
    //     })
    //   } else {
    //     return this._getGaode().catch((e) => {
    //       console.error('调用高德API失败：', e)
    //       return this._getH5Location()
    //     })
    //   }
    // }
  }

  getAppLocation() {
    return tuhu.actionWithNative('locate')
  }

  getAppCurLocation() {
    if (tuhu.device.tuhuAndroid) {
      return tuhu.actionWithNative('getUserInfo')
    } else {
      return tuhu.actionWithNative('deviceDetail')
    }
  }

  getH5CurLocation() {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(tuhu.localStorage.getItem(SELECT_KEY)))
      } catch (e) {
        resolve(null)
      }
    })
  }

  getCurLocation() {
    if (!curLocatePromise) {
      if (tuhu.device.isApp) {
        const isTuhuAndroid = tuhu.device.tuhuAndroid
        curLocatePromise = Promise.all([this.getAppCurLocation(), this.getAppLocation()]).then((data) => {
          const curLocation = isTuhuAndroid ? data[0] : data[0].raw
          const isSameCity = data[1] && ((isTuhuAndroid ? curLocation.userCity : curLocation.city) === data[1].city)
          if (isSameCity) {
            return data[1]
          } else {
            if (isTuhuAndroid) {
              curLocation.city = curLocation.userCity
              curLocation.province = curLocation.userProvince
              curLocation.district = curLocation.userDistrict
              curLocation.latitude = curLocation.lat
              curLocation.longitude = curLocation.lng
            } else {
              const [latitude, longitude] = curLocation.location.split(',')
              curLocation.latitude = latitude
              curLocation.longitude = longitude
            }
            return curLocation
          }
        })
      } else {
        curLocatePromise = Promise.all([this.getH5CurLocation(), this.getH5Location()]).then((data) => {
          if (data[0]) {
            if (data[0].city === data[1].city) {
              return data[1]
            } else {
              return data[0]
            }
          } else {
            return data[1]
          }
        })
      }
    }

    return curLocatePromise.catch((e) => {
      console.error(e)
      curLocatePromise = null
      return null
    })
  }

  getLocate() {
    if (!locatePromise) {
      const lng = tuhu.getParam('_longitude')

      if (lng) {
        locatePromise = this._detailInfo(lng, tuhu.getParam('_latitude'))
      } else if (tuhu.device.isApp) {
        locatePromise = this.getAppLocation()
      } else {
        locatePromise = this.getH5Location()
      }
    }

    return locatePromise.then((locationInfo) => {
      let promise = Promise.resolve()
      const selectedInfo = getSelectedCity()

      const currentLocate = locationInfo && {
        currentProvince: locationInfo.province || '',
        currentCity: locationInfo.city || '',
        currentDistrict: locationInfo.district || ''
      }

      if (selectedInfo && this.options.commit) {
        if (this.options.checkLocation && locationInfo && locationInfo.district && locationInfo.city !== selectedInfo.city) {
          promise = new Promise((resolve, reject) => {
            tuhu.confirm(`你当前城市是${locationInfo.city}，是否切换到当前位置`, '温馨提示', () => {
              tuhu.localStorage.removeItem(SELECT_KEY)

              resolve()
            }, () => {
              locationInfo = {
                latitude: (locationInfo && locationInfo.latitude) || '',
                longitude: (locationInfo && locationInfo.longitude) || '',
                province: selectedInfo.province,
                city: selectedInfo.city,
                district: selectedInfo.city === selectedInfo.district ? '' : selectedInfo.district,
                info: locationInfo.info
              }
              resolve()
            })
          })
        } else {
          locationInfo = {
            latitude: (locationInfo && locationInfo.latitude) || '',
            longitude: (locationInfo && locationInfo.longitude) || '',
            province: selectedInfo.province,
            city: selectedInfo.city,
            district: selectedInfo.city === selectedInfo.district ? '' : selectedInfo.district,
            info: locationInfo.info
          }
        }
      }

      return promise.then(() => {
        if (currentLocate) {
          locationInfo = Object.assign(locationInfo, currentLocate)
        }

        if (this.options.commit && tuhu.getCurrentPages().length < 1) {
          this.options.updateStore = true
        }

        this.options.commit && tuhu.store && tuhu.store.commit('setLocationInfo', {
          locationInfo: locationInfo,
          force: this.options.updateStore
        })
        return locationInfo
      })
    }).catch((e) => {
      console.error(e)
      locatePromise = null
      return null
    })
  }
}
export default Locate
