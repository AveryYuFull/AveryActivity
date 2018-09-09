/**
 * author: caozhongping@tuhu.cn
 * date: 2017/11/13
 * desc: mlink
 */
import base64 from 'base-64'
const MLINK_URL = 'https://res.tuhu.org/react/lib/mlink.min.js'

Vue.directive('mlink', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, arg) {
    if (tuhu.device.isApp) {
      return $(el).hide()
    }

    const results = []

    const url = arg.value
    const data = base64.encode(JSON.stringify({
      url: /^https?:/.test(url) ? '/webView?url=' + encodeURIComponent(url) : url
    }))

    results.push({
      mlink: 'https://a.mlinks.cc/AakR',
      button: el,
      params: {
        data: data
      }
    })

    if (window.Mlink) {
      new window.Mlink(results)
    } else {
      tuhu.script(MLINK_URL).then(() => {
        new window.Mlink(results)
      })
    }
  }
})
