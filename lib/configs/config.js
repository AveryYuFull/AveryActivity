// import homeIconGray from '../imgs/hu.png'
// import homeIconRed from '../imgs/redhu.png'

// import flIconGray from '../imgs/fl.png'
// import flIconRed from '../imgs/redfl.png'

// import mdIconGray from '../imgs/md.png'
// import mdIconRed from '../imgs/redmd.png'

// import myIconGray from '../imgs/my.png'
// import myIconRed from '../imgs/redmy.png'

const config = {
  apiFilter(url) {
    /** if (url.indexOf('/test') > -1) {
      return 'http://api.dev.tuhu.work'
    } else if (url.indexOf('/test1') > -1) {
      return 'http://apirelease.tuhu.work'
    } else {  */
    const host = location.host;
    if (location.href.indexOf('.tuhu.work') > -1) { // work
      return url.replace(/(?:http)?s?:?\/\/item\.tuhu\.cn/, location.protocol + '//item.tuhu.work')
        .replace(/(?:http)?s?:?\/\/wx\.tuhu\.cn/, 'https:' + '//wx.tuhu.work')
        .replace(/(?:http)?s?:?\/\/api\.tuhu\.cn/, 'https:' + '//apirelease.tuhu.work')
        .replace(/(?:http)?s?:?\/\/cashierapipre-staging\.tuhu\.cn/, 'https:' + '//cashierapi.tuhu.work')
        .replace(/(?:http)?s?:?\/\/www\.tuhu\.cn/, 'https:' + '//www.tuhu.work')
    }
    if (location.href.indexOf('.tuhu.cn/vue/vueTest/') > -1) { // uat
      return url.replace(/(?:http)?s?:?\/\/item\.tuhu\.cn/, location.protocol + '//itemut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/wx\.tuhu\.cn/, 'https:' + '//wxut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/api\.tuhu\.cn/, 'https:' + '//apiut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/by\.tuhu\.cn/, 'https:' + '//byut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/cashierapipre-staging\.tuhu\.cn/, 'https:' + '//cashierapi.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/www\.tuhu\.cn/, 'https:' + '//wwwut.tuhu.cn')
    }
    if (host === 'wxut.tuhu.cn') { // uat
      return url.replace(/(?:http)?s?:?\/\/item\.tuhu\.cn/, location.protocol + '//itemut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/wx\.tuhu\.cn/, 'https:' + '//wxut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/api\.tuhu\.cn/, 'https:' + '//apiut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/by\.tuhu\.cn/, 'https:' + '//byut.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/cashierapi\.tuhu\.cn/, 'https:' + '//cashierapipre-staging.tuhu.cn')
    }
    if (host === 'wx.tuhu.cn') { // 生成
      return url.replace(/(?:http)?s?:?\/\/item\.tuhu\.cn/, location.protocol + '//item.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/wx\.tuhu\.cn/, 'https:' + '//wx.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/api\.tuhu\.cn/, 'https:' + '//api.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/by\.tuhu\.cn/, 'https:' + '//by.tuhu.cn')
        .replace(/(?:http)?s?:?\/\/cashierapipre-staging\.tuhu\.cn/, 'https:' + '//cashierapi.tuhu.cn')
    }

    return url
    /*  } */
  },
  mapParams(args = {}) {
    if (args.pid !== undefined) {
      const arr = args.pid.split('|')
      args.productid = arr[0]
      if (arr.length > 1) {
        args.variantid = arr[1]
      }

      delete args.pid
    }

    if (args.vid !== undefined) {
      args.variantid = args.vid

      delete args.vid
    }

    if (args.actid !== undefined) {
      args.activityid = args.actid

      delete args.actid
    }

    return args
  },
  apis: {

  },
  pages: {

  },
  modules: {
    // cashier() {
    //   require.ensure([], (require) => {
    //     require(`@/modules/cashier/main.js`)
    //   })
    // }
  }
  // tabs: [{
  //   title: '首页',
  //   img: homeIconGray,
  //   activeImg: homeIconRed,
  //   url: '/pages/home/index'
  // }, {
  //   title: '门店',
  //   img: mdIconGray,
  //   activeImg: mdIconRed,
  //   icon: 'icon-settings',
  //   url: '/pages/shops/index'
  // }, {
  //   title: '我的',
  //   img: myIconGray,
  //   activeImg: myIconRed,
  //   url: '/pages/personal/index'
  // }]
}
// {
//   title: '分类',
//   img: flIconGray,
//   activeImg: flIconRed,
//   url: '/pages/chepin/index'
// }

export default config
