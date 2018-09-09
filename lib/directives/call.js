/**
 * author: caominjie@tuhu.cn
 * date: 2017/11/16
 * docs:
 * tel: 电话号码 (不必填) 默认值为 4001118868
 * eg: <a href="#" v-call>客服电话</a>
 */
Vue.directive('call', {
  inserted: function (el, arg) {
    const tel = (arg.value && arg.value.tel) || 4001118868
    const call = () => {
      if (tuhu.isLightApp) {
        system.go(`/middle?tel=${tel}`)
      } else {
        let deviceInfo = tuhu.device
        if (deviceInfo.iphone) {
          window.location.href = `tel://${tel}`
        } else {
          window.location.href = `tel:${tel}`
        }
      }
    }
    const lock = tuhu.util.lockFn()

    $(el).on('click', () => {
      lock(call)
    })
  }

})
