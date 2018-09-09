/**
 * author: caozhongping@tuhu.cn
 * date: 2017/11/13
 * desc: selectcar
 */

Vue.directive('selectcar', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, arg) {
    $(el).on('click', function() {
      const {level, force, onchange} = arg.value

      if (onchange) {
        return tuhu.selectCar(level, force).then(onchange)
      }

      tuhu.selectCar(level, force)
    })
  }
})
