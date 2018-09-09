/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/21
 * desc: input自动聚焦
 * eg: <input v-focus>
 */

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
