import User from './user'

let _id = 0

let _group = 0

const toast = (() => {
  let lock = false
  let lastToastArgs = null

  return function(...args) {
    console.log(lock, JSON.stringify(lastToastArgs) === JSON.stringify(args))
    if (lock && JSON.stringify(lastToastArgs) === JSON.stringify(args)) {
      return
    }

    setTimeout(() => {
      lock = false
    }, 1000)

    $.toast.apply($, args)

    lastToastArgs = args
    lock = true
  }
})()

export default {
  query2Str(obj, pre = '') {
    let strArr = []

    for (let i in obj) {
      strArr.push(`${pre}${i}=` + encodeURIComponent(obj[i]))
    }
    /** 判断 ? & */
    return strArr.length > 0 ? '?' + strArr.join('&') : ''
  },
  uuid: User.uuid,
  setBlackBox: User.setBlackBox,
  async getBlackBox() {
    await User.setBlackBox().catch((e) => {
      throw e
    })

    return this.getCookie('_fmdata')
  },
  getCookie(key) {
    const reg = new RegExp(key + '=(.+?)(?:;|$)')
    const match = document.cookie.match(reg)

    return (match && match[1]) || ''
  },
  isIphoneX() {
    return /iphone/i.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
  },
  lockFn() {
    let locked = false

    return function(fn) {
      if (locked) {
        return
      }

      locked = true

      fn()

      setTimeout(() => {
        locked = false
      }, 300)
    }
  },
  getPath(url = location.href) {
    const match = url.match(/\/pages\/[\w-]+\/[\w-]+/)

    return match ? match[0] : '/pages/home/index'
  },

  getFullPath(url) {
    const match = location.pathname.match(/\/pages.+?(?:\?|&|$)/)

    return match ? match[0] : '/pages/home/index'
  },

  /** 获取所有参数 */
  getParams(url = location.search) {
    const result = {}
    const decodeUrl = decodeURIComponent(url)
    const urlArr = decodeUrl.split('&')

    urlArr.forEach((item) => {
      const match = item.match(/([\w-]+)=(.*?)(?:&|\?|$)/)
      if (match) {
        result[match[1]] = match[2]
      }
    })

    return result
  },

  /** 获取指定参数 */
  getParam(key, type = 'string', src = location.search) {
    const reg = new RegExp('(?:^|\\?|&)' + key + '=(.*?)(?:&|\\?|$)')
    const match = decodeURIComponent(src).match(reg)
    if (match) {
      return type === 'number' ? match[1] - 0 : match[1]
    }

    return type === 'number' ? 0 : ''
  },

  getScrollId(pre = 'goTop') {
    return `${pre}_${_id++}`
  },

  getGroup() {
    return `group_${_group++}`
  },

  getDistance(lat1, lng1, lat2, lng2) {
    const radLat1 = lat1 * Math.PI / 180
    const radLat2 = lat2 * Math.PI / 180
    const a = radLat1 - radLat2
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000
    return s.toFixed(2)
  },

  objectEqual(obj1, obj2) {
    if (!obj1 || !obj2) {
      return false
    }

    const arr1 = Object.keys(obj1)
    const arr2 = Object.keys(obj2)
    if (arr1.length !== arr2.length) {
      return false
    }

    return arr1.every((key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return this.objectEqual(obj1[key], obj2[key])
      }

      if (obj1[key] === obj2[key]) {
        return true
      }

      return false
    })
  },

  toast: toast,
  // 获取跳转至 webview 的url
  getWebviewUrl(obj) {
    let url = null
    let params = Object.assign(tuhu.util.getParams(obj.url), obj.query) // 所有 query
    let navHidden = params.navHidden
    delete params.navHidden
    if (/^https?:\/\/.+/.test(obj.url)) {
      url = obj.url
    } else {
      // 相对路径
      url = `${location.origin + location.pathname.replace(/\/pages.+$/, '')}${obj.url}`
    }

    const paramStr = tuhu.util.param(params)
    url = `${url.match(/^(.+?)(\?.+)?$/)[1]}${'?newwebview=1' + (paramStr ? '&' + paramStr : '')}`
    if (navHidden) {
      url = `${url}&navHidden=${navHidden}`
    }

    if (tuhu.device.tuhuIos) {
      url = `tuhu:/webView?url=${encodeURIComponent(url)}`
    } else if (tuhu.device.tuhuAndroid) {
      url = `tuhu:/webView?url=${encodeURIComponent(encodeURIComponent(url))}`
    }
    return url
  },
  /** zepto static function */
  param: $.param,

  type: $.type,

  isEmptyObject: $.isEmptyObject,
  isLightApp: typeof system !== 'undefined',
  channel() {
    if (this.isLightApp) {
      return this.isMiApp() ? 'xiaomi' : 'huawei'
    } else {
      return 'wx'
    }
  },
  isMiApp() {
    return this.getParam('_channel') === 'xiaomi'
  },
  clearObj(obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] === undefined) {
        delete obj[i]
      }
    }
  }
}
