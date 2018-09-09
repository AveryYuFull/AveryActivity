/**
 * author: caominjie@tuhu.cn
 * date: 2017/11/20
 * docs:
 * eg:
    <a href="#" v-customer-care>唤出客服</a>
 */
// 客服参数接口
// const GET_CUSTOMER_SERVERICE_PARAM = 'https://wx.tuhu.cn/Home/Get_NTKF_PARAM'

// // 客服脚本地址
// const CUSTOMER_SCRIPT_URL = 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9739'

// const customerCare = () => {
//   // tuhu.fetch(GET_CUSTOMER_SERVERICE_PARAM, {
//   //   credentials: 'include' // 支持cookie
//   // }).then(() => {
//   //   if (window.NTKF) {
//   //     window.NTKF.im_openInPageChat('kf_9739_1468912096836')
//   //   } else {
//   //     tuhu.script(CUSTOMER_SCRIPT_URL).then(() => {
//   //       window.NTKF.im_openInPageChat('kf_9739_1468912096836')
//   //     })
//   //   }
//   // })

//   tuhu.navigateTo({url: '/pages/_customer/index'})
// }

// const lockFn = tuhu.util.lockFn()
const dictory = {
  /** 轮胎 */
  0: {
    h5: 'kf_9739_1449821124813',
    ios: 'kf_9739_1427361102492',
    android: 'kf_9739_1427361102492'
  },
  /** 保养 */
  1: {
    h5: 'kf_9739_1468912096836',
    ios: 'kf_9739_1468912258275',
    android: 'kf_9739_1468912258275'
  },
  /** 车品 */
  2: {
    h5: 'kf_9739_1469519005478',
    ios: 'kf_9739_1469518978190',
    android: 'kf_9739_1469518978190'
  },
  /** 蓄电池 */
  3: {
    h5: 'kf_9739_1483689907449',
    ios: 'kf_9739_1482974194375',
    android: 'kf_9739_1482974194375'
  },
  /** 镭射眼 */
  4: {
    h5: 'kf_9739_1468912096836',
    ios: 'kf_9739_1468913556620',
    android: 'kf_9739_1468913556620'
  },
  /** 轮毂 */
  5: {
    h5: 'kf_9739_1468914778973',
    ios: 'kf_9739_1468914714722',
    android: 'kf_9739_1468914714722'
  },
  /** 汽车改装 */
  6: {
    h5: 'kf_9739_1483690103056',
    ios: 'kf_9739_1483690103056',
    android: 'kf_9739_1483690103056'
  },
  /** 钣金喷漆 */
  7: {
    h5: 'kf_9739_1483690389556',
    ios: 'kf_9739_1483690389556',
    android: 'kf_9739_1483690389556'
  },
  /** 保险 */
  8: {
    h5: 'kf_9739_1479883503802',
    ios: 'kf_9739_1479883503802',
    android: 'kf_9739_1479883503802'
  },
  /** 找客服 轮胎 */
  9: {
    h5: 'kf_9739_1427361102492',
    ios: 'kf_9739_1427361102492',
    android: 'kf_9739_1427361102492'
  },
  /** 找客服 保养 */
  10: {
    h5: 'kf_9739_1468912258275',
    ios: 'kf_9739_1468912258275',
    android: 'kf_9739_1468912258275'
  },
  /** 找客服 车品 */
  11: {
    h5: 'kf_9739_1469518978190',
    ios: 'kf_9739_1469518978190',
    android: 'kf_9739_1469518978190'
  },
  /** 找客服 轮毂 */
  12: {
    h5: 'kf_9739_1468914714722',
    ios: 'kf_9739_1468914714722',
    android: 'kf_9739_1468914714722'
  },
  /** 找客服 喷漆 */
  13: {
    h5: 'kf_9739_1482974397518',
    ios: 'kf_9739_1482974397518',
    android: 'kf_9739_1482974397518'
  },
  /** 找客服 车险 */
  14: {
    h5: 'kf_9739_1479883433142',
    ios: 'kf_9739_1479883433142',
    android: 'kf_9739_1479883433142'
  }
}

// 配置api地址
const GET_CUSTOMER_SERVERICE_PARAM = 'http://api.tuhu.cn/User/SelectKeFuGroupId'

class CustomerCare {
  constructor(config) {
    if (typeof config === 'number') {
      return this.ByDictory(config)
    }

    return tuhu.getDefaultCar(2, false).then((res) => {
      const vehicleId = res ? res.ProductID : ''

      this.config = Object.assign({
        source: 0,
        businessSource: 0,
        channel: this.channel(),
        Pid: '',
        vehicleId,
        orderId: ''
      }, config)
      return this.init()
    })
  }

  channel() {
    if (tuhu.device.tuhuAndroid) {
      return 'Android'
    } else if (tuhu.device.tuhuIos) {
      return 'Ios'
    } else {
      return 'H5'
    }
  }

  async init() {
    const res = await tuhu.fetch(GET_CUSTOMER_SERVERICE_PARAM, {
    }, {
      query: this.config
    })
    return res.Id
  }

  async ByDictory(config) {
    const res = dictory[config]
    if (tuhu.device.tuhuAndroid) {
      return res.android
    }
    if (tuhu.device.tuhuIos) {
      return res.ios
    }
    return res.h5
  }
}

Vue.directive('customer-care', {
  inserted: (el, arg) => {
    $(el).on('click', () => {
      const config = arg.value || 0

      new CustomerCare(config).then((res) => {
        tuhu.navigateTo(
          {
            url: '/pages/_customer/index',
            query: {
              type: res
            }
          }
        )
      })
    })
  }
})
