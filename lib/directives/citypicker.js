/**
 * author: caominjie@tuhu.cn
 * date: 2017/11/21
 * desc: citypicker指令
 * eg: <div v-citypicker='{formatvalue: bbb}'>test</div>
 */
import citypicker from '../components/citypicker.vue'

const bindVue = (el, arg, isShow) => {
  let $content = $('.page-current').eq(tuhu.getParam('_tab') || 0).children('._content')
  let replaceEl = $('<div></div>')
  $content.append(replaceEl)

  new Vue({
    el: replaceEl[0],
    render: createElement => {
      return createElement(citypicker, {
        props: {
          el: el,
          formatvalue: arg.value.formatvalue,
          cityPicker: arg.value.cityPicker || 3,
          cityValue: arg.value.cityValue || [],
          onclose: arg.value.onclose && arg.value.onclose
        }
      })
    }
  })
}

Vue.directive('citypicker', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, arg) {
    bindVue(el, arg)
  }
})
