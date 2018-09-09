/**
 * author: caozhongping@tuhu.cn
 * desc: 途虎路由
 * date: 2018/3/28 updated
 */

import util from './util'

/** 常量 */
const EVENTS = {
  // pageLoadStart: 'pageLoadStart', // ajax 开始加载新页面前
  // pageLoadCancel: 'pageLoadCancel', // 取消前一个 ajax 加载动作后
  // pageLoadError: 'pageLoadError', // ajax 加载页面失败后
  // pageLoadComplete: 'pageLoadComplete', // ajax 加载页面完成后（不论成功与否）
  // pageAnimationStart: 'pageAnimationStart', // 动画切换 page 前
  pageAnimationEnd: 'pageAnimationEnd' // 动画切换 page 结束后
  // beforePageRemove: 'beforePageRemove', // 移除旧 document 前（适用于非内联 page 切换）
  // pageRemoved: 'pageRemoved' // 移除旧 document 后（适用于非内联 page 切换）
  // beforePageSwitch: 'beforePageSwitch' // page 切换前，在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
  // pageInit: 'pageInitInternal' // 目前是定义为一个 page 加载完毕后（实际和 pageAnimationEnd 等同）
}

/** 常量 */
const ROUTER_CONFIG = {
  // sectionGroupClass: 'page-group',
  // 表示是当前 page 的 class
  curPageClass: 'page-current',
  // 用来辅助切换时表示 page 是 visible 的,
  // 之所以不用 curPageClass，是因为 page-current 已被赋予了「当前 page」这一含义而不仅仅是 display: block
  // 并且，别的地方已经使用了，所以不方便做变更，故新增一个
  // visiblePageClass: 'page-visible',
  // 表示是 page 的 class，注意，仅是标志 class，而不是所有的 class
  // pageClass: 'page',
  contentClass: '_content'
}

/** 常量 */
const SESSION_NAMES = {
  currentState: 'sm.router.currentState' + (+new Date()),
  maxStateId: 'sm.router.maxStateId' + (+new Date())
}

/** 常量 */
const DIRECTION = {
  leftToRight: 'from-left-to-right',
  rightToLeft: 'from-right-to-left'
}

/** 生成唯一id */
const _generateRandomId = (function () {
  const ids = {}

  return function() {
    if (!ids[tabIndex]) {
      ids[tabIndex] = 0
    }

    return ids[tabIndex]++
  }
})()

/** 返回链 */
let backPromise = Promise.resolve()

/** 后退锁 */
let lockBack = false

/** 模块缓存 */
const tabLoaded = {}

/** 当前tab index */
let tabIndex = util.getParam('_tab', 'number') || 0

/** 当前loadpage params */
let pageObj = null

/** 当前loadpage config */
let pageOther = null

/** 后退icon */
let backIcon = null

/** 默认标题 */
const defaultTitle = '途虎养车'

/** 一组路由跟随参数 */
const channel = util.getParam('_channel')

const uuid = util.getParam('_uuid')

const project = util.getParam('_project')

const longitude = util.getParam('_longitude')

const latitude = util.getParam('_latitude')

let myoptions = {}

const onPopState = function (event) {
  if (lockBack) {
    setTimeout(() => {
      lockBack = false
    }, 300)
    return
  }
  const state = event.state
  // if not a valid state, do nothing todo
  if (!state || !state.pageId) {
    tuhu.actionWithNative('closeWebview')
    return
  }

  let lastState = _getLastState()

  if (!lastState) {
    console.error && console.error('Missing last state when backward or forward')
    return
  }

  if (state.id === lastState.id) {
    return
  }

  if (state.pageId === lastState.pageId) {
    location.reload()
    return
  }

  if (state.id < lastState.id) {
    back(state, lastState)
  }
}

/** state 操作方法开始 */
const _getLastState = function () {
  let currentState = tuhu.sessionStorage.getItem(SESSION_NAMES.currentState)
  try {
    currentState = JSON.parse(currentState)
  } catch (e) {
    currentState = null
  }

  return currentState
}

function _getNextStateId () {
  const maxStateId = tuhu.sessionStorage.getItem(SESSION_NAMES.maxStateId) || 1

  return maxStateId - 0 + 1
}

function _saveAsCurrentState (state) {
  tuhu.sessionStorage.setItem(SESSION_NAMES.currentState, JSON.stringify(state))
}

function _incMaxStateId () {
  tuhu.sessionStorage.setItem(SESSION_NAMES.maxStateId, _getNextStateId())
}
/** state 操作方法结束 */

/** 显示隐藏tab */
let tabBar = null
function showTab(istab) {
  if (!tabBar) {
    tabBar = $('#tuhu-tabbar')
  }

  if (istab) {
    tabBar.addClass('show')
  } else {
    tabBar.removeClass('show')
  }
}

/** 设置标题 */
let titleDom = null
function setTitle(instance, title = defaultTitle) {
  if (!titleDom) {
    titleDom = $('#title .title')
  }

  if (instance && instance._setTitle) {
    instance._setTitle().then(pageTitle => {
      const realTitle = pageTitle && pageTitle !== 'undefined' ? pageTitle : title
      document.title = realTitle
      titleDom.html(realTitle)
    })
  } else {
    document.title = title
    titleDom.html(title)
  }
}

/** 当前tab下页面 */
function getFilterPages() {
  return tuhu.getCurrentPages().filter((item) => {
    return item.tab === tabIndex
  })
}

/** 页面动画 */
function _animateElement ($from, $to, direction) {
  if (typeof direction === 'undefined') {
    direction = DIRECTION.rightToLeft
  }

  const animPageClasses = [
    'page-from-center-to-left',
    'page-from-center-to-right',
    'page-from-right-to-center',
    'page-from-left-to-center'
  ].join(' ')

  let classForFrom, classForTo
  switch (direction) {
    case DIRECTION.rightToLeft:
      classForFrom = 'page-from-center-to-left'
      classForTo = 'page-from-right-to-center'
      break
    case DIRECTION.leftToRight:
      classForFrom = 'page-from-center-to-right'
      classForTo = 'page-from-left-to-center'
      break
    default:
      classForFrom = 'page-from-center-to-left'
      classForTo = 'page-from-right-to-center'
      break
  }

  $from.removeClass(animPageClasses).addClass(classForFrom)
  $to.removeClass(animPageClasses).addClass(classForTo)

  $from.animationEnd(function () {
    $from.removeClass(animPageClasses)
  })
  $to.animationEnd(function () {
    $to.removeClass(animPageClasses)
  })
}

/** 启动页面动画 */
function _animateSection($from, $to, direction, resolve) {
  // var toId = $to.attr('id')
  // $from.trigger(EVENTS.beforePageSwitch, [$from.attr('id'), $from])
  $from.removeClass(ROUTER_CONFIG.curPageClass)
  $to.addClass(ROUTER_CONFIG.curPageClass)
  // $to.trigger(EVENTS.pageAnimationStart, [toId, $to])
  _animateElement($from, $to, direction)
  $to.animationEnd(function () {
    $to.trigger(EVENTS.pageAnimationEnd)
    // 外层（init.js）中会绑定 pageInitInternal 事件，然后对页面进行初始化
    // $to.trigger(EVENTS.pageInit, [toId, $to])
    resolve && resolve()
  })
}

/** 当前模块 当前页面 */
function _getCurrentSection () {
  return $('.page-group').eq(tabIndex).find('.' + ROUTER_CONFIG.curPageClass)
}

/** 当前模块 所有页面 */
function _getPages() {
  return $('.page-group').eq(tabIndex).find('.page[id^="_page_"]')
}

function _back(state, fromState) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 300)

    $.closeModal()

    const $newPage = $('#' + state.pageId)
    if ($newPage.length) {
      const $currentPage = $('#' + fromState.pageId)
      showTab(state.istab)

      if (!fromState.animation) {
        setTimeout(() => {
          $currentPage.remove()
          if (getFilterPages().length < 2) {
            backIcon.hide()
          }

          resolve()
        })
      } else {
        _animateSection($currentPage, $newPage, DIRECTION.leftToRight)
      }

      $newPage.on(EVENTS.pageAnimationEnd, () => {
        $currentPage.remove()
        if (getFilterPages().length < 2) {
          backIcon.hide()
        }

        resolve()
      })
      _saveAsCurrentState(state)

      const currentPages = tuhu.getCurrentPages()
      let lastItem = null
      currentPages.some((citem, cindex) => {
        if (citem.pageId === fromState.pageId) {
          citem.instance && citem.instance.$destroy()
          citem.instance = null
          lastItem = citem
          // currentPages.splice(cindex, 1)
          tuhu.delPage(cindex)
          return true
        }

        return false
      })

      currentPages.some((citem, cindex) => {
        if (citem.pageId === state.pageId) {
          setTimeout(tuhu.hideIndicator)
          citem.instance.onPageBack && citem.instance.onPageBack(citem, lastItem)
          // setTitle(null, tuhu.config.pages[state.path].title)

          try {
            setTitle(null, tuhu.config.pages[state.path].title)
          } catch (e) {
            setTitle(null, state.title)
          }
          if (citem.instance.twiceShare) {
            citem.instance.twiceShare()
          }

          return true
        }
      })
    } else {
      console.error('页面堆栈有误', '#' + state.pageId, tabLoaded)
    }
  })
}

function checkCar(carInfo, level) {
  if (!carInfo) {
    return false
  }
  if (carInfo.noPailiang) {
    return true
  }
  if (level <= 5) {
    if (carInfo.currentType < level) {
      return false
    }
  } else if (level === 6) {
    if (!carInfo.TireSizeForSingle) {
      return false
    }
  } else if (level === 8) {
    if (!carInfo.lunguType) {
      return false
    }
  }

  return true
}

function back(state, fromState) {
  backPromise = backPromise.then(() => {
    return _back(state, fromState)
  })
}

/** 载入页面锁 */
let loadLock = false

/** 对比参数 */
let lastObj = {}

let promises = []

let loadPromise = Promise.resolve()

const beforeEachs = []

const afterEachs = []

// let lastVueInstance = null

class Router {
  static beforeEach(callback) {
    beforeEachs.push(callback)
  }

  static afterEach(callback) {
    afterEachs.push(callback)
  }

  static switchTab(obj, other = {}) {
    const pagesDom = _getPages()

    if (other.tabIndex !== undefined) {
      tabIndex = other.tabIndex
    }

    if (pagesDom.length > 1) {
      this.navigateBack({
        delta: pagesDom.length - 1
      })
    } else {
      if (tabLoaded[tabIndex]) {
        history.replaceState(tabLoaded[tabIndex].state, '', tabLoaded[tabIndex].url)
        setTitle(null, tabLoaded[tabIndex].state.title)

        if (tabLoaded[tabIndex].instance.twiceShare) {
          tabLoaded[tabIndex].instance.twiceShare()
        }
      } else {
        Router.loadPage(obj, {
          direct: true
        })
      }
    }
  }

  static goHome() {
    let delta = 0

    tuhu.getCurrentPages().forEach((item, index) => {
      if (!item.istab && item.tab === tabIndex) {
        delta++
      }
    })

    window.removeEventListener('popstate', onPopState)

    history.go(-delta)
    setTimeout(() => {
      location.replace(tabLoaded[0].url)
    }, 100)
  }

  static navigateBack(obj) {
    obj = Object.assign({}, {
      state: true,
      delta: 1,
      last: 1,
      params: {}
    }, obj)

    const filterPages = getFilterPages()
    const delta = obj.delta

    if (delta >= 1) {
      const len = filterPages.length
      let delId = 0

      filterPages.forEach((item, index) => {
        if (index >= len - delta && index < len - obj.last) {
          item.instance && item.instance.$destroy()
          item.instance = null

          tuhu.delPage(item._id - delId++)
          if (index === len - obj.last - 1 && obj.last !== 1) {
            setTimeout(() => {
              $(`#${item.pageId}`).remove()
            }, 1000)
          } else {
            $(`#${item.pageId}`).remove()
          }
        }
      })

      lockBack = obj.last !== 1
      if (!lockBack && filterPages.length > 1) {
        filterPages[filterPages.length - delta - 1].params = obj.params
      }
      if (obj.state) {
        history.go(-delta)
      }
    }
  }

  static loadPage(obj, other) {
    pageObj = obj
    pageOther = other

    const instance = new Router(obj, other)
    instance.load()
  }

  static loadFirstPage() {
    if (pageObj) {
      Router.loadPage(pageObj, pageOther)
    } else {
      tuhu.redirectTo({
        url: tuhu.getPath(location.href),
        query: tuhu.getParams()
      })
    }
  }

  static loadModule(path) {
    tuhu.config.modules[path]()
  }

  static goPayRouter(sameOrigin = false) {
    let delta = 0

    const currentPages = tuhu.getCurrentPages()
    const hasTab = currentPages.some(item => item.istab)
    if (hasTab) {
      currentPages.forEach((item, index) => {
        if (!item.istab && item.tab === tabIndex) {
          delta++
        }
      })
    } else {
      delta = currentPages.length - 1
    }

    if (sameOrigin) {
      if (tuhu.device.isApp) {
        setTimeout(() => {
          history.go(-delta)

          setTimeout(() => {
            location.reload()
          }, 300)
        }, 50)
      } else {
        window.removeEventListener('popstate', onPopState)

        setTimeout(() => {
          history.go(-delta)
        }, 50)

        setTimeout(() => {
          tuhu.navigateBack({
            delta: delta + 1,
            state: false
          })
          window.addEventListener('popstate', onPopState)
        }, 100)
      }
    } else {
      window.removeEventListener('popstate', onPopState)
      history.go(-delta)
    }
  }

  constructor(obj = {}, other = {}) {
    // this.redirected = false
    tuhu.util.clearObj(obj)
    tuhu.util.clearObj(other)

    this.obj = Object.assign({
      data: {}
    }, obj)

    this.other = Object.assign({}, other)

    this.path = ''

    this.url = ''

    this.id = 0

    this.pageId = ''

    this.vueInstance = null

    this.options = null

    this.query = {}

    this.error = false

    this.direct = false

    this.animation = true

    this.istab = false

    this.promise = null

    this.resolve = null

    try {
      this.init()
    } catch (e) {
      console.log(`${e.message}`)
      this.error = true
    }
  }

  init() {
    this.tooMore()

    this.setPath()

    this.setDirect()

    this.setIstab()

    this.setQuery()

    this.setOptions()

    this.setId()

    this.setPageId()

    this.setUrl()

    this.setAnimation()
  }

  setDirect() {
    if (this.other.direct !== undefined) {
      this.direct = this.other.direct
    }
  }

  setAnimation() {
    if (this.other.animation !== undefined) {
      this.animation = this.other.animation
    }
  }

  setIstab() {
    if (this.direct) {
      tuhu.config.tabs && tuhu.config.tabs.some((item, index) => {
        if (this.obj.url.indexOf(item.url) > -1) {
          this.istab = true

          if (tabIndex !== index) {
            tabIndex = index

            $('.page-group').eq(tabIndex).show().siblings('.page-group').hide()
          }

          return true
        }
      })
    }
  }

  setQuery() {
    let query = Object.assign({}, this.obj.query, tuhu.getParams(this.obj.url))
    this.query = query

    if (project) {
      query._project = project
    }
    if (longitude) {
      query._longitude = longitude
    }
    if (latitude) {
      query._latitude = latitude
    }

    if (tuhu.config.tabs) {
      query._tab = tabIndex
    }

    if (channel) {
      query._channel = channel
    }

    if (uuid) {
      query._uuid = uuid
    }

    this.cleanQuery()

    if (tuhu.config.mapParams) {
      query = tuhu.config.mapParams(query)
    }

    this.cleanQuery()
  }

  cleanQuery() {
    const query = this.query

    Object.keys(query).map((key) => {
      if (query[key] === null || query[key] === undefined || query[key] === 'null' || query[key] === 'undefined') {
        delete query[key]
      }
    })
  }

  resetVueInstance() {
    const instance = this.options.vue.default
    myoptions = Object.assign({}, this.query, this.obj.data)
    const myMixin = {
      beforeCreate () {
        this.options = myoptions
      }
    }

    if (instance.mixins) {
      instance.mixins.unshift(myMixin)
    } else {
      instance.mixins = [myMixin]
    }

    this.vueInstance = instance
  }

  tooMore() {
    if (loadLock && this.obj.url === lastObj.url) {
      throw new Error(`页面连续载入`)
    }
  }

  setOptions() {
    this.options = tuhu.config.pages[this.path]

    if (!this.options) {
      Router.loadModule(this.path.split('/')[2])
      throw new Error(`加载新模块${this.path}`)
    }
  }

  setId() {
    this.id = _generateRandomId()
  }

  setPageId() {
    this.pageId = '_page_' + tabIndex + '_' + this.id
  }

  setPath() {
    const match = this.obj.url.match(/\/pages\/[\w-]+\/[\w-]+/)

    this.path = match ? match[0] : '/pages/home/index'
  }

  setUrl() {
    let queryStr = tuhu.util.param(this.query)
    if (queryStr) {
      queryStr = '?' + queryStr
    }

    this.url = location.pathname.replace(/pages\/.+/, '').replace(/\/$/, '') + this.path + queryStr
  }

  ta() {
    if (location.href.indexOf('.tuhu.cn') > -1) {
      Ta.ta('pv')
    }
  }

  setPageLock() {
    loadLock = true
    setTimeout(() => {
      loadLock = false
    }, 300)
  }

  _pushNewState () {
    const url = this.url

    const state = {
      id: _getNextStateId(),
      istab: this.istab,
      pageId: this.pageId,
      title: this.options.title,
      animation: this.animation,
      path: this.path
    }

    if (this.istab && !tabLoaded[tabIndex]) {
      tabLoaded[tabIndex] = {
        state: state,
        url: url
      }
    }

    if (this.direct) {
      history.replaceState(state, '', url)
    } else {
      history.pushState(state, '', url)
    }

    _saveAsCurrentState(state)
    _incMaxStateId()
  }

  pageDom() {
    const $curPage = _getCurrentSection()
    const $newPage = $(`<div id="${this.pageId}" class="page ${ROUTER_CONFIG.curPageClass}"><div class="${ROUTER_CONFIG.contentClass}"></div></div>`)

    if ($curPage.length < 1) {
      $('.page-group').eq(tabIndex).append($newPage)
    } else {
      $curPage.after($newPage)
    }

    return {
      newPage: $newPage,
      curPage: $curPage
    }
  }

  vue(curPage, newPage) {
    const self = this

    const vueConfig = {
      el: newPage.find('.' + ROUTER_CONFIG.contentClass)[0],
      mounted() {
        if ($(this.$el).attr('class') !== ROUTER_CONFIG.contentClass) {
          throw Error(`template结构错误 请所有的模板内容用<div class="${ROUTER_CONFIG.contentClass}"></div>包裹`)
        }
        if (self.direct) {
          !self.istab && tuhu._popPage()
          curPage.remove()

          self.resolve()
        } else {
          self.animation && _animateSection(curPage, newPage, DIRECTION.rightToLeft, self.resolve)
        }

        const instance = this.$children[0]

        // lastVueInstance = instance
        // if (self.options.vue.default.beforeRouteLeave) {
        //   lastVueInstance.beforeRouteLeave = self.options.vue.default.beforeRouteLeave.bind(lastVueInstance)
        // }

        setTitle(instance, self.options.title)
        tuhu._setCurrentPage(self.id, self.url, tabIndex, self.pageId, self.istab, instance, self.url)

        if (self.istab) {
          tabLoaded[tabIndex].instance = instance
        }

        if (instance.twiceShare) {
          instance.twiceShare()
        }

        if (getFilterPages().length > 1) {
          backIcon.show()
        }
      },
      render: h => {
        return h(this.vueInstance)
      }
    }

    if (tuhu.store) {
      vueConfig.store = tuhu.store
    }

    new Vue(vueConfig)
  }

  async load() {
    if (this.error) {
      return
    }

    this.promise = new Promise((resolve, reject) => {
      this.resolve = (data) => {
        afterEachs.forEach((callback) => {
          callback(this.obj, lastObj)
        })

        lastObj = this.obj
        resolve(data)
      }
    })

    setTimeout(this.resolve, 300)

    promises.push(this.promise)

    return loadPromise
    .then(() => {
      let promise = Promise.resolve()
      const routerConfig = this.options
      if (routerConfig.beforeEnter) {
        promise = promise.then(() => new Promise((resolve, reject) => {
          routerConfig.beforeEnter(this.obj, lastObj, resolve)
        }))
      }

      // if (lastVueInstance && lastVueInstance.beforeRouteLeave) {
      //   promise = promise.then(() => new Promise((resolve, reject) => {
      //     lastVueInstance.beforeRouteLeave(this.obj, lastObj, resolve)
      //   }))
      // }

      // if (routerConfig.vue && routerConfig.vue.default && routerConfig.vue.default.beforeRouteEnter) {
      //   promise = promise.then(() => new Promise((resolve, reject) => {
      //     routerConfig.vue.default.beforeRouteEnter(this.obj, lastObj, resolve)
      //   }))
      // }
      return promise
    })
    .then((lastData) => {
      loadPromise = loadPromise.then(() => this.promise)

      if (promises[promises.length - 1] !== this.promise) {
        this.resolve()
        return
      }

      let promise = Promise.resolve(lastData)
      beforeEachs.forEach((callback) => {
        promise = promise.then((data) => {
          if (data === false) {
            return Promise.resolve(false)
          }

          return new Promise((resolve, reject) => {
            callback(this.obj, lastObj, resolve)
          })
        })
      })

      return promise.then((data) => {
        if (data !== false) {
          if (typeof data === 'object') {
            return tuhu.navigateTo(data)
          }
          return this._load()
        }
      })
    })
  }

  async _load() {
    $.closeModal()

    if (this.options.forceLogin) {
      const startTime = +new Date()

      const userInfo = await tuhu.getUserInfo({
        force: true,
        direct: 1
      })

      if (+new Date() - startTime > 3000 && userInfo.islogin) {
        tuhu.navigateBack({
          delta: 1,
          last: 0
        })

        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 300)
        })
      }

      if (!userInfo.islogin) {
        return
      }

      this.obj.data && (this.obj.data._userInfo = userInfo)
    } else if (this.options.notForceLogin) {
      const userInfo = await tuhu.getUserInfo({
        force: false
      })

      this.obj.data && (this.obj.data._userInfo = userInfo)
    }

    if (this.options.forceLocate) {
      let locationInfo = await tuhu.getLocate()

      if (!locationInfo) {
        locationInfo = await tuhu.locate.getIpLocate()
      }

      this.obj.data._locationInfo = locationInfo
    }

    if (this.options.forceCar) {
      const startTime = +new Date()
      let carInfo = null
      if (typeof this.options.forceCar === 'object') {
        carInfo = await tuhu.getDefaultCar(this.options.forceCar[0], true, {
          pageCar: true
        })
        if (!checkCar(carInfo, this.options.forceCar[0])) {
          return
        }
        carInfo = await tuhu.getDefaultCar(this.options.forceCar[1], true, {
          pageCar: true
        })

        if (!checkCar(carInfo, this.options.forceCar[1])) {
          return
        }
      } else {
        carInfo = await tuhu.getDefaultCar(this.options.forceCar, true, {
          pageCar: true
        })
        if (!checkCar(carInfo, this.options.forceCar)) {
          if (this.istab && tuhu._tabInstance) {
            tuhu._tabInstance.tabIndex = tuhu._tabInstance.lastTabIndex
          }
          return
        }
      }

      if (+new Date() - startTime > 3000) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 300)
        })
      }
      this.obj.data._carInfo = carInfo
    } else if (this.options.notForceCar) {
      const carInfo = await tuhu.getDefaultCar(5, false)

      this.obj.data._carInfo = carInfo
    }

    this.setPageLock()

    this.ta()

    showTab(this.istab)

    this._pushNewState()

    const {curPage, newPage} = this.pageDom()
    if (this.options.vue && this.options.vue.default) {
      this.resetVueInstance(this.options.vue.default)
      this.vue(curPage, newPage)
    } else {
      const iframe = $(`<iframe width="100%" height="100%" frameborder="0" src="${this.query.url.replace(/(\/[^&?/.]+)$/, '$1/')}"></iframe>`)
      iframe.on('load', function() {
        document.title = this.contentDocument.title || defaultTitle
        setTimeout(() => {
          document.title = this.contentDocument.title || defaultTitle
        }, 1000)
      })
      newPage.find(`.${ROUTER_CONFIG.contentClass}`).append(iframe)

      if (this.direct) {
        !this.istab && tuhu._popPage()
        curPage.remove()

        this.resolve()
      } else {
        this.animation && _animateSection(curPage, newPage, DIRECTION.rightToLeft, this.resolve)
      }

      tuhu._setCurrentPage(this.id, this.url, tabIndex, this.pageId, this.istab, null, this.url)
    }
  }
}

/** 关闭默认路由 */
$.smConfig.router = false
 /** 注入router */
$(document).on('click', 'a', function(e) {
  if (tuhu.config.preventALabel === undefined || tuhu.config.preventALabel) {
    e.preventDefault()
  }
})

window.addEventListener('popstate', onPopState)

/** 后退键处理 */
$(() => {
  backIcon = $('#myback')
  setTimeout(() => {
    if (getFilterPages().length < 2) {
      backIcon.hide()
    }
  })

  backIcon.on('click', () => {
    tuhu.navigateBack()
  })
})

export default Router
