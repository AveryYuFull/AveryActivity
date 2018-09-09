/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/28
 * desc: 去搜索页面
 * eg:<a href="#" v-search>去搜索页面</a>
 */

Vue.directive('search', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, options) {
    $(el).on('click', function() {
      if (options.value === undefined) {
        tuhu.navigateTo({url: '/pages/_search/index'})
      } else {
        tuhu.navigateTo({url: '/pages/_search/list', query: options.value})
      }
    })
  }
})
