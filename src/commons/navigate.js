/* eslint-disable */
function loadOther(url) {
  tuhu.router.goHome()
  setTimeout(() => {
    // 如果是小米渠道则会在链接后面加一个_channel=xiaomi
    if (tuhu.getParam('_channel') === 'xiaomi') {
      url = url + (url.indexOf('?') > -1 ? '&' : '?') + '_channel=xiaomi'
    }
    location.href = url
  }, 100)
}

class Navigate {
  static auto(item) {
    const instance = new Navigate(item)
    instance.send()
  }

  constructor(item) {
    item.Uri = item.WxAppJumpUrl || item.WxSkipPage || item.WxAppChannelJumpUrl || item.WXUrl || item.LinkUrl || item.Link || item.Uri || item.ArticleLink || item.H5Link || item.AppUrl || item.Activity || item.ActivityUrl || item.Jumph5url || item.WXAPPValue || ''
    this.item = item
  }

  getQueryStr(url = this.item.Uri) {
    let str = ''
    let arr = url.split('?')
    if (arr[1]) {
      str = '?' + arr.pop()
    }

    return str
  }

  _activity() {
    const item = this.item
    // https://wx.tuhu.cn/staticpage/activity/list.html?id=2535

    let match = item.Uri.match(/\/luck\/.+?id=([\w-]+)/)
    if (!match) {
      match = item.Uri.match(/\/activity\/list\.html\?id=([\w-]+)/i)
    }

    if (!match) {
      match = item.Uri.match(/\/promotion\/activity\/\?id=([\w-]+)/i)
    }

    if (match) {
      if (match[1].length < 8) {
        loadOther('https://wx.tuhu.cn/staticpage/activity/list.html' + this.getQueryStr())
        // location.href = 'https://wx.tuhu.cn/staticpage/activity/list.html' + this.getQueryStr()
        // tuhu.navigateTo({
        //   url: '/pages/home/iframe',
        //   query: {
        //     url: 'https://wx.tuhu.cn/staticpage/activity/list.html' + this.getQueryStr()
        //   }
        // })
      } else {
        tuhu.navigateTo({
          url: '/pages/activity/index' + this.getQueryStr()
        })
      }

      throw new Error(item.Uri)
    }
  }

  _baoyang() {
    const item = this.item
    if (/\/maintenance/.test(item.AppUrl)) {
      tuhu.navigateTo({
        url: '/pages/maintenance/index' + item.AppUrl.replace('/maintenance', '').replace('type=', 'baoyangtypes=').replace('aid=', 'actid=')
      })

      throw new Error(item.AppUrl)
    }

    if (/\/BaoYang\/BaoYangMenus|\/keep_list2/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/maintenance/index' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }
  }

  _tire() {
    const item = this.item
    if (/\/Tires\/Result|\/tire_list|\/pages\/act_tire\/act_tire/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/tirelist' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }

    if (/\/react\/tireList2/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/activity/tireList2' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }

    if (/\/Tires/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/tirelist' + this.getQueryStr().replace('activityid=', 'actid=')
      })
      throw new Error(item.Uri)
    }
  }
  _hub() {
    const item = this.item
    if (/\/wheelRim/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/hublist' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }
  }
  _seckill() {
    const item = this.item
    if (item.Uri.indexOf('/seckill') > -1) {
      tuhu.navigateTo({
        url: '/pages/home/seckill'
      })
      throw new Error(item.Uri)
    }
  }

  _roadHelp() {
    const item = this.item
    if (item.Uri.indexOf('/roadRescue/card') > -1) {
      loadOther('https://wx.tuhu.cn/react/roadservice/')
      // tuhu.navigateTo({
      //   url: '/pages/home/iframe',
      //   query: {
      //     url: 'https://wx.tuhu.cn/react/roadservice/'
      //   }
      // })
      throw new Error(item.Uri)
    }
  }

  _moreTest() {
    const item = this.item
    if (item.Uri.indexOf('/list/list') > -1) {
      loadOther('https://wx.tuhu.cn/react/freeExperience/')
      // tuhu.navigateTo({
      //   url: '/pages/home/iframe',
      //   query: {
      //     url: 'https://wx.tuhu.cn/react/freeExperience/'
      //   }
      // })
      throw new Error(item.Uri)
    }
  }

  _search() {
    const item = this.item
    if (item.Uri.indexOf('/search/searchall') > -1) {
      tuhu.navigateTo({
        url: '/pages/home/moreService'
      })
      throw new Error(item.Uri)
    }
    if (item.Uri.indexOf('/search') > -1 || item.Uri.indexOf('/ChePin/CpList') > -1) {
      tuhu.navigateTo({
        url: '/pages/_search/list' + this.getQueryStr(item.Uri.indexOf('/ChePin/CpList') > -1 ? item.Uri.replace(/keywords/, 'keyword') : item.Uri)
      })
      throw new Error(item.Uri)
    }
  }

  _webView() {
    const item = this.item
    if (/faxian\.tuhu\.cn|res\.tuhu\.org|wx\.tuhu\.cn/.test(item.Uri)) {
      loadOther(item.Uri)
      // tuhu.navigateTo({
      //   url: '/pages/home/iframe',
      //   query: {
      //     url: item.Uri
      //   }
      // })
      throw new Error(item.Uri)
    }
  }

  _notSupport() {
    tuhu.toast('正在开发中，敬请期待...')
  }

  _md() {
    const item = this.item
    const jumpUrl = item.JumpUrl && decodeURIComponent(item.JumpUrl)
    if (jumpUrl && jumpUrl.indexOf('page=detaillist') > -1) {
      tuhu.navigateTo({
        url: '/pages/shops/detaillist' + this.getQueryStr(jumpUrl)
      })

      throw new Error(item.JumpUrl)
    }

    if (item.Uri.indexOf('/md/list') > -1) {
      tuhu.navigateTo({
        url: '/pages/shops/beautyindex' + this.getQueryStr()
      })

      throw new Error(item.Uri)
    }
    if (item.Uri.indexOf('/md/') > -1) {
      tuhu.navigateTo({
        url: '/pages/shops/index' + this.getQueryStr()
      })

      throw new Error(item.Uri)
    }
  }

  _tireDetail() {
    const item = this.item
    if (/\/Products\/Tires/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/detail' + this.getQueryStr()
      })

      throw new Error(item.Uri)
    }
  }

  _chepinDetail() {
    const item = this.item

    if (/\/Products\/Details/i.test(item.Uri)) {
      if (/pid=(?:TR-|LG-)/i.test(item.Uri)) {
        tuhu.navigateTo({
          url: '/pages/tire/detail' + this.getQueryStr()
        })
      } else {
        tuhu.navigateTo({
          url: '/pages/chepin/detail' + this.getQueryStr()
        })
      }

      throw new Error(item.Uri)
    }
  }

  _chepinIndex() {
    const item = this.item
    if (/\/chepin\/index/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/chepin/index' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }
  }

  _beautyIndex() {
    const item = this.item
    if (/\/react\/beauty\/index/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/shops/beautyindex' + this.getQueryStr()
      })
      throw new Error(item.Uri)
    }
  }

  _allDetail() {
    const item = this.item
    const pid = item.ProductID || item.PID || item.Pid
    item.ActivityID = item.ActivityID || item.ActivityId || ''
    if (pid) {
      if (/^(?:TR-|LG-)/i.test(pid)) {
        tuhu.navigateTo({
          url: `/pages/tire/detail?pid=${pid}&vid=${item.VariantID || item.Vid}&actid=${item.ActivityID}`
        })

        throw new Error('轮胎详情页')
      }

      tuhu.navigateTo({
        url: `/pages/chepin/detail?pid=${pid}&vid=${item.VariantID || item.Vid}&actid=${item.ActivityID}`
      })

      throw new Error('车品详情页')
    }
  }

  _huawenTire() {
    const item = this.item

    if (/\/Shops\/PatternDetail/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/pattern' + this.getQueryStr()
      })

      throw new Error(item.Uri)
    }
  }

  _mainShop() {
    const item = this.item
    if (/\/Shops\/BrandShop|\/Shops\/PatternDetail/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/tire/brandShop' + this.getQueryStr()
      })

      throw new Error(item.Uri)
    }
  }

  _jumpUrl() {
    const item = this.item
    if (item.JumpUrl && /^\/webView/i.test(item.JumpUrl)) {
      if (/tirelist2/i.test(item.JumpUrl)) {
        tuhu.navigateTo({
          url: '/pages/activity/tireList2' + this.getQueryStr().replace('activityid', 'activityId')
        })

        throw new Error(item.JumpUrl)
      }
    }
  }

  _wxPage() {
    const item = this.item
    if ((item.WxSkipPage && /^\/pages\/chepin\/battery/i.test(item.WxSkipPage)) || /\/BaoYang\/ActivityBattery/i.test(item.Uri)) {
      tuhu.navigateTo({
        url: '/pages/chepin/battery' + this.getQueryStr(item.WxSkipPage)
      })

      throw new Error(item.WxSkipPage)
    }

    if (/\/pages\/chepin\/detail/i.test(item.Uri)) {
      const vid = tuhu.getParam('vid', 'string', item.Uri)
      const _url = '/pages/chepin/detail' + this.getQueryStr(item.Uri).replace(/(productid=)(.+?)(&|$)/, (item0, item1, item2, item3) => {
        const arr = item2.split('|')
        return item1 + arr[0] + item3
      }).replace(/(variantid=)(.+?)(&|$)/, (item0, item1, item2, item3) => {
        const arr = item2.split('|')
        return item1 + (arr[1] || arr[0]) + item3
      }).replace('vid=' + vid, '')
      tuhu.navigateTo({
        url: _url
      })
      throw new Error(item.Uri)
    }
  }

  send() {
    try {
      this._jumpUrl()

      this._activity()

      this._tireDetail()

      this._tire()

      this._hub()

      this._baoyang()

      this._roadHelp()

      this._seckill()

      this._moreTest()

      this._search()

      this._md()

      this._chepinDetail()

      this._allDetail()

      this._huawenTire()

      this._mainShop()

      this._chepinIndex()

      this._beautyIndex()

      this._wxPage()

      this._webView()

      this._notSupport()
    } catch (e) {
      console.log('万能跳转:' + e.message)
    }

    // if (item.Uri.indexOf('keep_list2') > -1) {
    //   tuhu.navigateTo({
    //     url: '/pages/maintenance/index'
    //   })
    // } else if (item.Uri.indexOf('tire_list') > -1) {
    //   tuhu.navigateTo({
    //     url: '/pages/tire/tirelist'
    //   })
    // }
  }
}

tuhu.autoNavigate = Navigate.auto

export default Navigate
