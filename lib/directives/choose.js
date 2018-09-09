import '../css/swiperModify.css'
/*
author: zhangping
调用方式：v-choose可以为1，2，3有三种选中和未选中的样式
选中样式右边的内容可以任意添加，选中图标会自动居中
<div v-choose="3">
    <img width="75px" height="75px" src="https://img3.tuhu.org/comment/40c0/03be/576b8ef70a0480ec558db859_w600_h800.jpg@100w_100h_100Q.jpg" />
</div>
<div v-choose="2">测试选中</div>
<div v-choose="1">
  <div>任意内容</div>
</div>
*/
Vue.directive('choose', {
  inserted: (el, binding) => {
    let type = binding.value
    if (type === 1) {
      $(el).append('<i class="choose-icon type1"></i>')
    } else if (type === 2) {
      $(el).append('<i class="choose-icon type2"></i>')
    } else if (type === 3) {
      $(el).append('<i class="choose-icon type3"></i>')
    }
    $(el).addClass('choose-unselect')
    $(el).find('.choose-icon').on('click', () => {
      if ($(el).hasClass('choose-selected')) {
        $(el).removeClass('choose-selected')
      } else {
        $(el).addClass('choose-selected')
      }
    })
  }
})
