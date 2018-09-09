/**
 * author: caozhongping@tuhu.cn
 * date: 2017/8/21
 * desc: 用户信息
 * demo:
 * User.getUserInfo({
 *  force: false //没有登录时是否跳转登录页 默认false
 * })
 * 返回，注意事项
 * 1 IOS,Android,H5返回的数据结构一致
 * 2 用户是否登录根据 islogin字段判断
 *
 * {
 *  islogin: true,
 *  userid: "115d52a7-cb3e-4070-811f-64c8d6aa135c",
 *  phone: "13921745521",
 *  name: "wahaha",
 *  usersession: "206eb5e212cd4136bb711fdc9b1c08df"
 * }
 */

/** 接口配置 */
// const IS_LOGIN_URL = 'https://wx.tuhu.cn/Activity/IsLogin'
const USER_INFO_URL = 'https://wx.tuhu.cn/Activity/GetUserInfo'

const GET_USER_HEADIMG = 'https://api.tuhu.cn/user/GetMemberMallUserInfo'

const DEFAULT_HEADIMG = require('./../imgs/defaultuserheat.png') // 默认头像

const TONGDUN_APPNAME = 'tuhu_yidongzhan'

const USER_STORAGE_KEY = '_tuhu_user_key'

let userInfoPromise = null

function resetData(data) {
  const result = {}
  const userid = (data.UserID || data.userid || data.userID || '').replace(/[{}]/g, '')

  if (!userid) {
    result.islogin = false
  } else {
    result.islogin = true
  }

  result.userid = userid
  result.phone = data.phone || data.MobileNumber || data.TelNumber || ''
  result.name = data.name || data.username || data.RealName || ''
  result.usersession = data.usersession || (data.userinfo && data.userinfo.usersession) || ''

  // result.blackbox = data.blackbox || ''
  // result.city = data.userCity || data.city || ''
  // result.district = data.userDistrict || data.district || ''
  // result.latitude = data.latitude || data.lat || ''
  // result.longitude = data.longitude || data.lng || ''
  // result.name = data.name || data.RealName || data.username || data.MobileNumber || ''
  // result.phone = data.phone || data.MobileNumber || ''
  // result.province = data.userProvince || data.province || ''
  // result.usersession = data.usersession || ''
  // result.uuid = data.uuid || data.deviceid || ''
  // result.version = data.version || ''

  return result
}

const uuid = (function() {
  const key = '_login_uuid'
  let uuid = ''

  return function () {
    if (!uuid) {
      uuid = tuhu.localStorage.getItem(key)
    }

    if (uuid) {
      return uuid
    }

    let d = new Date().getTime()
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })

    tuhu.localStorage.setItem(key, uuid)
    return uuid
  }
})()

const setBlackBox = (function() {
  let loaded = false

  return function() {
    if (loaded) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      window._fmOpt = {
        partner: 'tuhu',
        appName: 'tuhu_yidongzhan',
        token: uuid()
      }

      const cimg = new Image(1, 1)
      cimg.onload = function() {
        _fmOpt.imgLoaded = true
      }
      cimg.src = `https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=tuhu&appName=${TONGDUN_APPNAME}&tokenId=` + _fmOpt.token

      const fm = document.createElement('script')
      fm.type = 'text/javascript'
      fm.async = true
      fm.src = 'https://static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0)
      fm.onload = function() {
        loaded = true
        resolve()
      }
      fm.onerror = function() {
        reject(new Error('js not loaded'))
      }
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(fm, s)
    })
  }
})()

class User {
  static uuid = uuid

  static setBlackBox = setBlackBox

  static getUserInfo(options = {}) {
    options = Object.assign({
      direct: false,
      force: false
    }, options)

    return new User(options).getUserInfo()
  }

  static setUserInfo(data) {
    if (!data) {
      userInfoPromise = null
      tuhu.localStorage.removeItem(USER_STORAGE_KEY)

      tuhu.store && tuhu.store.commit('setUserInfo', {
        userInfo: {
          islogin: false
        }
      })

      tuhu.localStorage.clear()

      return tuhu.fetch('https://wx.tuhu.cn/user/LogoutCookie', {
        credentials: 'include'
      })
    }

    const result = resetData(data)
    tuhu.store && tuhu.store.commit('setUserInfo', {
      userInfo: result
    })
    userInfoPromise = Promise.resolve(result)

    try {
      tuhu.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result))
    } catch (e) {

    }

    return userInfoPromise
  }

  constructor(options) {
    this.options = options
  }

  async _getH5Promise() {
    if (process.env.NODE_ENV === 'development') {
      let result = {}

      try {
        result = JSON.parse(tuhu.localStorage.getItem(USER_STORAGE_KEY))
      } catch (e) {

      }
      return result || {}
    }

    return tuhu.fetch(USER_INFO_URL, {
      credentials: 'include'
    }, {
      status: false
    }).catch((e) => {
      return {
        islogin: false
      }
    })
  }

  async _getAppPromise() {
    return tuhu.actionWithNative('getUserInfo')
  }

  getUserInfo(options) {
    if (!userInfoPromise) {
      if (tuhu.device.isApp) {
        /**
         * ios
         * {userID: "115d52a7-cb3e-4070-811f-64c8d6aa135c", phone: "13921745521", name: "wahaha", usersession: "206eb5e212cd4136bb711fdc9b1c08df"}
         * android
         * {"AddrStr":"中国上海市闵行区万源路18号-1","Province":"上海市","RealName":"曹忠平","channel":"_huawei","city":"上海市","district":"闵行区","isNewUser":false,"lat":"31.135887","lng":"121.40308","phone":"13761117808","userCity":"上海市","userDistrict":"上海市","userProvince":"上海市","userid":"{f44906e9-7ce9-48ea-bedb-80cec47039d7}","username":"曹先生","usersession":"da4f275312174463949ceac4e7170ce2","uuid":"35e46291-7bab-3005-9954-f24103d106dc","version":"5.1.0"}
         */
        userInfoPromise = this._getAppPromise()
      } else {
        /**
         * h5: {UserID: "f44906e9-7ce9-48ea-bedb-80cec47039d7", MobileNumber: "13761117808", name: "曹忠平"}
         */
        userInfoPromise = this._getH5Promise()
      }

      userInfoPromise = userInfoPromise
      .then(resetData)
      .catch((e) => {
        console.error(e)
        userInfoPromise = null

        return {
          islogin: false
        }
      })
    }

    userInfoPromise = userInfoPromise
    .then((userInfo) => {
      tuhu.store && tuhu.store.commit('setUserInfo', {
        userInfo: userInfo
      })
      return userInfo
    })
    .then((result) => {
      if (!result.islogin) {
        if (!tuhu.device.isApp && process.env.NODE_ENV !== 'development') {
          tuhu.localStorage.removeItem(USER_STORAGE_KEY)
        }

        if (this.options.force) {
          if (tuhu.device.isApp) {
            return tuhu.actionWithNative('forceLogin').then(resetData).then((data) => {
              // userInfoPromise = Promise.resolve(data)
              return data
            })
          } else {
            return new Promise((resolve, reject) => {
              tuhu.navigateTo({
                url: '/pages/_login/index',
                query: {
                  direct: this.options.direct ? 1 : ''
                },
                data: {
                  resolve: resolve
                }
              })
            })
          }
        }
      }

      return result
    })
    .then(async (result) => {
      if (!result.headUrl) {
        const userImg = await tuhu.fetch(GET_USER_HEADIMG, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            UserID: result.userid
          })
        }, {timeout: 3})
          .then(data => {
            if (data.Code - 1 === 0) {
              return data.UserInfo.HeadUrl ? data.UserInfo.HeadUrl : DEFAULT_HEADIMG
            }
            return DEFAULT_HEADIMG
          })
          .catch((e) => {
            return DEFAULT_HEADIMG
          })
        result.headUrl = userImg
        tuhu.store && tuhu.store.commit('setUserInfo', {
          userInfo: result
        })
      }
      return result
    })
    return userInfoPromise
  }
}

export default User
