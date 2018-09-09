/**
 * author: lijingwen@tuhu.cn
 * date: 2017/12/4
 * desc: commentsall
 */

Vue.directive('commentsall', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, options) {
    $(el).on('click', function() {
      // 只传入一个String参数时跳转不传参数
      if (Object.prototype.toString.call(options.value) === '[object Object]') {
        tuhu.navigateTo({
          url: '/pages/_comments/all',
          query: options.value
        })
      }
    })
  }
})
