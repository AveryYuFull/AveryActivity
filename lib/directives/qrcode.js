/**
 * author: caominjie@tuhu.cn
 * date: 2017/12/13
 * docs:
 * wdith: 宽度
 * value: String
 * eg:
    <img v-qrcode="{width: 180, value:'13671802215TH19957321'}">
 */
const qrCode = require('qrcode')

Vue.directive('qrcode', {
  inserted: function (el, arg) {
    const scale = Math.ceil(arg.value.width / 29 || 6)
    qrCode.toDataURL(arg.value.value || '', { margin: 2, scale: scale }, (e, url) => {
      if (e) {
        console.error(e)
      } else {
        el.src = url
        el.width = arg.value.width
      }
    })
  }
})
