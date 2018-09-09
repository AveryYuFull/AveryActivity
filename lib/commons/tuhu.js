/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/9
 * desc: 核心方法
 * 注意：
 * 1 query: {} 参数不用encodeURIComponent 已经统一处理过了
 * 2 getParam 新增参数 指定返回类型
 * 3 config 注入全局命名空间
 * 4 新增页面堆栈相关
 */
/** 项目核心配置 根据项目配置 */
import './polyfills'

import Config from '../configs/config'

import User from './user'

import Locate from './locate'

import Share from './share'

import TuhuFetch from './fetch'

import Util from './util'

import Car from './car'

import Page from './page'

import Phone from './phone'

import TwiceShare from './twiceshare'

import SharePanel from './sharepanel'

import Router from './router'

import fetchJsonp from 'fetch-jsonp'

import Storage from './storage'

import Script from './script'

import Pay from './pay'

const BANK_ROUTER = '/pages/cashier/index'
const GET_TOKEN_API = 'https://wx.tuhu.cn/order/PayWayGetToken'

// import Channel from './channel'
window.tuhu = {
  config: Config,
  isLightApp: Util.isLightApp,
  channel: Util.channel(),
  router: Router,
//   channel: Channel,
  /**
   * 正常跳转
   * params {
   *  url: '',
   *  query: {}
   * }
   */
  navigateTo(obj, other) {
    if (obj.webview && tuhu.device.isApp) {
      location.href = tuhu.util.getWebviewUrl(obj)
    } else {
      return Router.loadPage(obj, Object.assign({
        direct: false
      }, other))
    }
  },

  /**
   * replace跳转
   * params {
   *  url: '',
   *  query: {}
   * }
   */

  redirectTo(obj, other) {
    return Router.loadPage(obj, Object.assign({
      direct: true
    }, other))
  },

  /**
   * 后退
   * params {
   *  delta: 1 //返回的页面数目
   * }
   */
  navigateBack: Router.navigateBack,

  loadModule: Router.loadModule,

  loadFirstPage: Router.loadFirstPage,

  /**
   * 回到指定的tab页
   * parmas: {
   *  url: '/pages/step2/step2'
   *}
   */
  switchTab: Router.switchTab,
  /**
  {
      android:false
      androidChrome:false
      appVersion:""
      browserVersion:9
      ios:true
      ipad:false
      iphone:true
      isWeixin:false
      minimalUi:false
      os:"ios"
      osVersion:"9.1"
      pixelRatio:2
      statusBar:false
      tuhuAndroid:false
      tuhuIos:false
      webView:null
  }
   */
  device: Phone.device,

  getDeviceDetail: Phone.getDeviceDetail.bind(Phone),
  /**
   * // arg1 > arg2, return 1; arg1 == arg2, return 0; arg1 < arg2, return -1
      tuhu.compareVersion('8.0', '7.1.1')
      // return 1
      tuhu.compareVersion('4.2', $.device.osVersion)
      // return -1
      tuhu.compareVersion('5.0', '5.0')
      // return 0
   */
  compareVersion: $.compareVersion,

  /**
   * 我们需要调用以下任一一种App方法来打开Alert modal ：
   * tuhu.alert(text, [title, callbackOk])
      或者
      tuhu.alert(text, [callbackOk])

      text - string. Alert文本
      title - string. Optional. Alert modal 标题
      callbackOk - function. Optional.在Alert modal下，当用户点击“Ok”按钮时，回调函数将被执行。

   * tuhu.alert('Here goes alert text')
   * tuhu.alert('Here goes alert text', 'Custom Title!')
   * tuhu.alert('Here goes alert text', 'Custom Title!', function () {
          $.alert('Button clicked!')
      })
   * tuhu.alert('Here goes alert text', function () {
          $.alert('Button clicked!')
      })
   */
  alert: $.alert,
    /**
   * author: 李婧雯@tuhu.cn
   * date: 2017/11/8
   * desc: showdialog
   * tuhu.showDialog({
        text: `<div class='mycontent'>opendialog1</div>`,
        onClose: function(e) {
        }
      })
   */
  showDialog(args) {
    args = Object.assign({
      'text': '',
      'onClose': () => {
      }
    }, args)
    tuhu.modal({
      'text': args.text,
      'extraClass': 'dialogwrap',
      'buttons': [
        {
          text: '<div>关闭</div>',
          onClose: false,
          onClick: function(e) {
            args.onClose(e)
            tuhu.closeModal(e.selector[0])
          }
        }
      ]
    })
  },
  /**
   * Confirm modal 经常在需要确认一些行为时被使用. 打开Alert modal同样也需要调用以下任一一种App方法：$.confirm(text, [title, callbackOk, callbackCancel])
      或者
      $.confirm(text, [callbackOk, callbackCancel])

      text - string. Confirm 文本
      title - string. Optional. Confirm modal 标题
      callbackOk - function. Optional. 在 Confirm modal下，当用户点击“Ok”按钮时，回调函数将被执行。(当用户确认操作）
      callbackCancel - function. Optional. 在 Confirm modal下，当用户点击“Cancel”按钮时，回调函数将被执行。(当用户不想进行操作)

      tuhu.confirm('Are you sure?', function () {
          tuhu.alert('You clicked Ok button')
      })

      tuhu.confirm('Are you sure?',
              function () {
                  tuhu.alert('You clicked Ok button')
              },
              function () {
                  tuhu.alert('You clicked Cancel button')
              }
      )

      tuhu.confirm('Are you sure?', 'Custom Title', function () {
          tuhu.alert('You clicked Ok button')
      })

      $.confirm('Are you sure?', 'Custom Title',
          function () {
              tuhu.alert('You clicked Ok button')
          },
          function () {
              tuhu.alert('You clicked Cancel button')
          }
      )
   */
  confirm: $.confirm,

  /**
   * Prompt modal 经常在需要从用户那里得到一些数据/答案时使用。打开 Prompt modal同样也需要调用以下任一一种App方法：$.prompt(text, [title, callbackOk, callbackCancel])
      或者
      $.prompt(text, [callbackOk, callbackCancel])

      text - string. Prompt 文本/问题
      title - string. Optional. Prompt modal 标题
      callbackOk - function. Optional. 在 Prompt modal下，当用户点击“Ok”按钮时，回调函数将被执行。回调函数的参数是输入框的值
      callbackCancel - function. Optional. 在 Prompt modal下，当用户点击“Cancel”按钮时，回调函数将被执行。回调函数的参数是输入框的值

      tuhu.prompt('What is your name?', function (value) {
          tuhu.alert('Your name is "' + value + '". You clicked Ok button')
      })

      tuhu.prompt('What is your name?',
          function (value) {
              tuhu.alert('Your name is "' + value + '". You clicked Ok button')
          },
          function (value) {
              tuhu.alert('Your name is "' + value + '". You clicked Cancel button')
          }
      )

      tuhu.prompt('What is your name?', 'Custom Title', function (value) {
        tuhu.alert('Your name is "' + value + '". You clicked Ok button')
      })

      tuhu.prompt('What is your name?', 'Custom Title',
          function (value) {
              tuhu.alert('Your name is "' + value + '". You clicked Ok button')
          },
          function (value) {
              tuhu.alert('Your name is "' + value + '". You clicked Cancel button')
          }
      )
   */
  prompt: $.prompt,

  /**
   * 自定义Modals
      Ok, 所有的预定义modals都只是一些适用于特定的场景的方法. 让我们看看如何创建自定义的 modals:

      $.modal(parameters) - 显示 custom modal

      parameters - object. Modal 的 parameters/options对象
      该方法返回动态创建的modal的HTML元素。

      这里有 Modal 的参数列表:

      参数  类型  默认值 描述
      title 字符串 可选. Modal 标题 (可以是html字符串)
      text  字符串 可选. Modal 文本 (可以是html字符串)
      afterText 字符串 可选. 将被放在"text"后的文本 (可以是html字符串)
      buttons 数组  可选. 按钮数组. 每个按钮应该被表示为带按钮参数的对象 (看下面)
      extraClass  字符串 可选. 给modal的根节点.modal附加1或多个自定义class(如'bg-red','bg-blue share-type')，方便按需定制不同的modal样式。
      verticalButtons boolean  false Optional. Set to true to enable vertical buttons layout
      onClick 函数  可选. 回调函数将在用户点击任何Modal按钮后被触发执行. 它接收 modal (Modal的 HTML元素) 和 index作为参数 (被点击按钮的索引号)
      让我们一起来看看按钮参数:

      参数  类型  默认值 描述
      text  字符串 按钮文本 (可以是 HTML 字符串)
      bold  布尔值 false  可选. 设置为true会加粗按钮文本
      close 布尔值  true  可选. 如果是“true”，点击这个按钮后modal会被关闭
      onClick 函数  可选. 用户点击这个按钮后，回调函数会被执行

       tuhu.modal({
          title:  'Modal with 3 buttons',
          text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
          buttons: [
              {
                  text: 'B1',
                  onClick() {
                      tuhu.alert('You clicked first button!')
                  }
              },
              {
                  text: 'B2',
                  onClick() {
                      tuhu.alert('You clicked second button!')
                  }
              },
              {
                  text: 'B3',
                  bold: true,
                  onClick() {
                      tuhu.alert('You clicked third button!')
                  }
              },
          ]
      })

      tuhu.modal({
          title: 'Awesome Photos?',
          text: 'What do you think about my photos?',
          afterText:  '<div class="swiper-container" style="width: auto; margin:5px -15px -15px">'+
                          '<div class="swiper-pagination"></div>'+
                          '<div class="swiper-wrapper">'+
                          '<div class="swiper-slide"><img src="..." height="150" style="display:block"></div>' +
                          '<div class="swiper-slide"><img src="..." height="150" style="display:block"></div>'+
                          '</div>'+
                      '</div>',
          buttons: [
              {
                  text: 'Bad :('
              },
              {
                  text: 'Awesome!',
                  bold: true,
                  onClick () {
                      tuhu.alert('Thanks! I know you like it!')
                  }
              },
          ]
      })

      tuhu.modal({
          title:  '<div class="buttons-row">'+
                      '<a href="#tab1" class="button active tab-link">Tab 1</a>'+
                      '<a href="#tab2" class="button tab-link">Tab 2</a>'+
                  '</div>',
          text: '<div class="tabs">'+
                  '<div class="tab active" id="tab1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis nunc non dolor euismod feugiat. Sed at sapien nisl. Ut et tincidunt metus. Suspendisse nec risus vel sapien placerat tincidunt. Nunc pulvinar urna tortor.</div>'+
                  '<div class="tab" id="tab2">Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</div>'+
                  '</div>',
          buttons: [
              {
                  text: 'Ok, got it',
                  bold: true
              },
          ]
      })

      tuhu.modal({
          title:  'Vertical Buttons Layout',
          text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
          verticalButtons: true,
          buttons: [
              {
                  text: 'Button 1',
                  onClick() {
                      tuhu.alert('You clicked first button!')
                  }
              },
              {
                  text: 'Button 2',
                  onClick() {
                      tuhu.alert('You clicked second button!')
                  }
              },
              {
                  text: 'Button 3',
                  onClick() {
                      tuhu.alert('You clicked third button!')
                  }
              },
          ]
      })
   */
  modal: $.modal,

  /**
   *  - 关闭任意 modal
   *  updated by wanglin @2017-10-18
      modal - HTMLElement or string ( CSS 选择器). 可选，关闭指定的modal. 除了指定的modal，任何被打开modal都将被关闭。不传或者没有找到则关闭所有modal
   */
  closeModal: $.closeModal,

  /**
   * 预加载 Modal 用来提示一些后台活动（像Ajax请求）和阻止在这个活动期间的任何用户操作。 打开预加载 modal 我们也需要调用适当的App方法: $.show预加载([title])- 显示 预加载 modal
      title - string. Optional. 预加载 modal 标题. 默认（没有指定）的时候，它等同于 "Loading...". 你可以在App初始化时通过 modal预加载Title 参数改变默认的 预加载 标题
   */
  showPreloader: $.showPreloader,

  /** 关闭加载器 */
  hidePreloader: $.hidePreloader,

  /** 如果你不需要用像预加载Modal这样如此大的modal 窗口去指示活动, 你可以使用简单并且小的指示器modal */
  showIndicator: $.showIndicator,

  /** 隐藏/关闭指示器 modal. 因为指示器modal没有任何按钮, 它需要用JavaScript来关闭 */
  hideIndicator: $.hideIndicator,

  /**
   * toast是一种轻量的提示，在页面中间显示，并且会在2秒(默认值，可修改)之后自动消失。
      可以用来显示一些不会打断用户操作的提示。
      * msg{string}: toast内容
      * duration{number}：toast显示时间,默认2000
      * extraclass{string}：给toast根节点附加class，高度自定义属性，方便用户自行控制不同场景的样式。
      * 如果使用了第三个参数，请自行在业务css里添加extraclass对应的样式

      $.toast("操作失败")
      $.toast('操作成功，正在跳转...', 2345, 'success top')
   */
  toast: Util.toast.bind(Util),

  /**
   * 操作表可以让用户从多个可选的操作中选择一个
      $.actions(buttons) - 创建并弹出一个操作表
      buttons - 显示的几个按钮，你也可以把按钮分组
      你可以通过 color: "danger" 来指定按钮的文案为红色
      或者通过 bg: "danger" 来指定按钮的背景为红色

      eg:const buttons1 = [
          {
              text: '请选择',
              label: true
          },
          {
              text: '卖出',
              bold: true,
              color: 'danger',
              onClick() {
                  $.alert("你选择了“卖出“")
              }
          },
          {
              text: '买入',
              onClick() {
                  $.alert("你选择了“买入“")
              }
          }
      ]
      const buttons2 = [
          {
              text: '取消',
              bg: 'danger'
          }
      ]
      const groups = [buttons1, buttons2]
      tuhu.actions(groups)
   */
  actions: $.actions,

  /** 动态加载脚本 */
  script: Script.load,

  /** 获取地理位置 */
  locate: Locate,
  getLocate: Locate.getLocate,

  /** 获取用户信息 */
  getUserInfo: User.getUserInfo,

  /** 设置用户信息 内部调用 */
  _setUserInfo: User.setUserInfo,

  /** 唤起 app头部分享 */
  appShare: Share.share,

  /** 获取路由path */
  getPath: Util.getPath,

  getFullPath: Util.getFullPath,

  /** 获取所有参数 */
  getParams: Util.getParams,

  /** 获取指定参数 */
  getParam: Util.getParam,

  /** 兼容无痕模式下sessionStorage */
  sessionStorage: Storage.sessionStorage,

  /** 兼容无痕模式下localStorage */
  localStorage: Storage.localStorage,

  /** 工具方法 */
  util: Util,

  car: Car,

  /** 选车 */
  selectCar: Car.selectCar,

  /** 获取默认车型 */
  getDefaultCar: Car.getDefaultCar,

  /**
   * 更新车型信息
   * tuhu.updateCar({
   *  CarNumber: '',
   *  Registrationtime: ''
   * })
   * */
  updateCar: Car.updateCar,

  /** 新增页面堆栈 内部调用 */
  _setCurrentPage: Page._setCurrentPage,

  /** 新增页面堆栈 内部调用 */
  _popPage: Page._popPage,

  /** 获取所有页面堆栈 */
  getCurrentPages: Page.getCurrentPages,

  /** 获取当前页面堆栈 */
  getCurrentPage: Page.getCurrentPage,

  delPage: Page.delPage,

  fetch: TuhuFetch.fetch,

  /**
   * 原生交互
   */
  actionWithNative: Phone.actionWithNative,

  actionWithAll: Phone.actionWithAll,

  /**
   * 查违章
   */
  toWeiZhang() {
    return this.actionWithNative('toWeiZhang')
  },

  /**
   * 唤起收银台 参看首页使用
   * channel在内部判断
   */
  openBank(res = {}, channel = this.channel) {
    if (tuhu.device.isApp) {
      tuhu.actionWithNative('openBank', res)
    } else {
      tuhu.fetch(GET_TOKEN_API, {}, {
        session: true,
        query: {
          i: res.PayInfo.OrderNO.replace(/^TH/, ''),
          channel
        }
      }).then((data) => {
        if (data.token) {
          tuhu.redirectTo({
            url: BANK_ROUTER,
            query: {
              channel,
              token: data.token
            }
          })
        }
      }).catch((e) => {
        tuhu.alert('获取token异常')
      })
    }
  },

  /**
   * params type standalone|popup 默认 standalone
  tuhu.photoBrowser({
      photos : [
          '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
          '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
          '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
      ]
  })
  * 有标题
  tuhu.photoBrowser({
      photos : [
          {
              url: '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
              caption: 'Caption 1 Text'
          },
          {
              url: '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
              caption: 'Second Caption Text'
          },
          // 这个没有标题
          {
              url: '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
          },
      ],
      type: 'popup'
  })
  * 有视频
  tuhu.photoBrowser({
      photos : [
          {
              html: '<iframe src="//www.youtube.com/embed/lmc21V-zBq0?list=PLpj0FBQgLGEr3mtZ5BTwtmSwF1dkPrPRM" frameborder="0" allowfullscreen></iframe>',
              caption: 'Woodkid - Run Boy Run (Official HD Video)'
          },
          {
              url: 'http://lorempixel.com/1024/1024/sports/2/',
              caption: 'Second Caption Text'
          },
          {
              url: 'http://lorempixel.com/1024/1024/sports/3/',
          },
      ],
      type: 'standalone'
  })
   */
  photoBrowser(args = {}, other = {}) {
    other = Object.assign({
      index: 0,
      showPage: true
    }, other)

    this.navigateTo({
      url: '/pages/_photo/index',
      data: {
        photos: args.photos,
        other: other
      }
    }, {
      animation: false
    })
  },

  /** 二次分享 */
  twiceShare: TwiceShare.share,

  /** 弹出分享面板 */
  sharePanel: SharePanel.share,

  detachInfiniteScroll: $.detachInfiniteScroll,

  /**
   * @param {*} data {
      lat: 31.1364283468,
      lng: 121.3640087132,
      name: "途虎养车工场店（罗秀路店）",
      address: "上海市徐汇区罗秀路105号（近平福路路口）"
      }
   */
  locateTo: Locate.locateTo,

  /**
   * 新开webview
   * @param String {*} url
   */
  newWebView: Phone.newWebView.bind(Phone),

  /** jsonp请求 */
  fetchJsonp: fetchJsonp,

  /**
   * 唤起原生高德百度地图
   * @param {*} data {
      lat: 31.1364283468,
      lng: 121.3640087132
      }
   */
  nativeMap: Locate.nativeMap,

  /**
   * 调整门店列表
   */
  selectShop() {
    this.navigateTo({
      url: '/pages/_shops/index'
    })
  },
  /**
   * 更改选择的默认门店
   * author :lijignwen@tuhu.cn
   * date: 2017.12.5 pids 必须
   * tuhu.changeShop({
        serviceType: 2, // 门店类型 1 轮胎 2 保养 4 服务
        pids: '', // pids
        activityId: '', // 活动id
        shopId: 60, // 默认门店id
      })
        .then((shopDetail)=>{
        })
   */
  changeShop(data) {
    let sResolve
    const shopPromise = new Promise((resolve) => {
      sResolve = resolve
    })
    .catch((e) => {})
    this.navigateTo({
      url: '/pages/_shops/selectShopList',
      data: {
        callBack(shopDetal) {
          sResolve(shopDetal)
        },
        shopData: data
      }
    })
    return shopPromise
  },
  // 支付
  Pay: (params, type) => {
    return Pay.toPay(params, type)
  }
}

require('../directives/lazy')
require('../directives/focus')
require('../directives/mlink')
require('../directives/selectcar')
require('../directives/navigateto')
require('../directives/upload')
require('../directives/call')
require('../directives/customerCare')
require('../directives/search')
require('../directives/commentsall')
require('../directives/coupons')
require('../directives/choose')
require('../directives/platenum')
require('../directives/video')
require('../directives/qrcode')
require('../directives/citypicker')

require('../filters/filter')

/** 系统页面 */

/** 车型库 */
tuhu.config.pages['/pages/_car/mycar'] = {
  title: '我的车型库',
  vue: require('../pages/_car/mycar.vue')
}

tuhu.config.pages['/pages/_car/list'] = {
  title: '车型列表',
  vue: require('../pages/_car/list.vue')
}

tuhu.config.pages['/pages/_car/detail'] = {
  title: '车型信息',
  vue: require('../pages/_car/detail.vue')
}

tuhu.config.pages['/pages/_car/tiresize'] = {
  title: '轮胎规格',
  vue: require('../pages/_car/tiresize.vue')
}

tuhu.config.pages['/pages/_cart/index'] = {
  title: '购物车',
  forceLogin: true,
  vue: require('../pages/_cart/index.vue')
}
tuhu.config.pages['/pages/_car/choosesize'] = {
  title: '选择规格',
  vue: require('../pages/_car/choosesize.vue')
}

tuhu.config.pages['/pages/_car/chooseproperties'] = {
  title: '选择车型信息',
  vue: require('../pages/_car/chooseproperties.vue')
}

tuhu.config.pages['/pages/_login/index'] = {
  title: '用户登录',
  vue: require('../pages/_login/index.vue')
}

tuhu.config.pages['/pages/_login/agreement'] = {
  title: '用户协议',
  vue: require('../pages/_login/agreement.vue')
}

tuhu.config.pages['/pages/_emptypage/index'] = {
  title: '404',
  vue: require('../pages/_emptypage/index.vue')
}

tuhu.config.pages['/pages/_search/index'] = {
  title: '搜索',
  vue: require('../pages/_search/index.vue'),
  notForceLogin: true
}

tuhu.config.pages['/pages/_search/list'] = {
  title: '搜索列表',
  vue: require('../pages/_search/list.vue'),
  notForceCar: true,
  forceLocate: true
}

tuhu.config.pages['/pages/_comments/product'] = {
  title: '商品评价',
  vue: require('../pages/_comments/productAllComments.vue')
}

tuhu.config.pages['/pages/_comments/shop'] = {
  title: '店铺评价',
  vue: require('../pages/_comments/shopAllComments.vue')
}

tuhu.config.pages['/pages/_shops/selectShopList'] = {
  title: '门店列表',
  vue: require('../pages/_shops/selectShopList.vue'),
  forceLocate: true, // 是否需要强制获取地理位置
  forceLogin: false // 是否需要强制登录
}

tuhu.config.pages['/pages/_customer/index'] = {
  title: '客服',
  vue: require('../pages/_customer/index.vue')
}

tuhu.config.pages['/pages/_locate/index'] = {
  title: '导航',
  vue: require('../pages/_locate/index.vue')
}

tuhu.config.pages['/pages/_shops/index'] = {
  title: '门店',
  vue: require('../pages/_shops/index.vue')
}

tuhu.config.pages['/pages/_photo/index'] = {
  title: '图片浏览',
  vue: require('../pages/_photo/index.vue')
}
