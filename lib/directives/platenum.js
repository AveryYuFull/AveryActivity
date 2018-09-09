import Platenum from '../components/platenum.vue'
// type=type=2显示字母键盘,returnHandler返回键盘值的回调方法,showmask控制是否要黑色遮罩背景
// <div class="cityP" v-platenum="{type: 1, returnHandler: returnHandler,showmask: false}" v-text='cityp'></div>
// <div class="engP" v-platenum="{type: 2, returnHandler: returnHandler,showmask: false}"  v-text='carNo'></div>

Vue.directive('platenum', {
  inserted: (el, binding) => {
    let instance = null
    $(el).on('click', (e) => {
      e.preventDefault()
      let $content = $('.page-current').eq(tuhu.getParam('_tab') || 0).children('._content')
      let replaceEl = $('<div></div>')
      $content.append(replaceEl)
      if (instance) {
        instance.$children[0].showPlate = binding.value.type
      } else {
        let cityV = ''
        let carV = ''
        if (binding.value.type === 1) {
          cityV = $(e.target).text()
          carV = $(e.target).siblings().text()
        } else if (binding.value.type === 2) {
          carV = $(e.target).text()
          cityV = $(e.target).siblings().text()
        }
        instance = new Vue({
          el: replaceEl[0],
          render: createElement => {
            return createElement(Platenum, {
              props: {
                showmask: binding.value.showmask,
                showP: binding.value.type,
                returnHandler: binding.value.returnHandler,
                cityV: cityV,
                carV: carV
              }
            })
          }
        })
      }
    })
  }
})
