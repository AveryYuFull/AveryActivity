/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/7
 * desc: navigateto
 * 不带参数的简便写法：
 * <div v-navigateto='item.pages'  >string to {{item.name}}</div>
 * 带参数的写法
 * <div v-navigateto="{url:'/pages/alert/alert', query:{a:1, b:2}, data:{user: {name: 'lijingwen'}}}">to {{item.name}}</div>
 */

Vue.directive('navigateto', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, options) {
    $(el).on('click', function() {
      // 只传入一个String参数时跳转不传参数
      if (Object.prototype.toString.call(options.value) === '[object String]') {
        tuhu.navigateTo({url: options.value})
      } else {
        const {url, query, data} = options.value
        tuhu.navigateTo({url, query, data})
      }
    })
  }
})
