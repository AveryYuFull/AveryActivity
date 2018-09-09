<template>
  <div class="content" @scroll="scroll">
    <div class="card-content-inner">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/11
 * params:
 *      type: 1. auto: ios版本小于6.0.0和android版本小于4.4.0使用js滚动，其他使用native的滚动条
                2. js: 都使用js的滚动条，不建议选择此选项
                3. native: 直接使用native的滚动条，如果页面没有复杂的布局（比如 position: absolute或者 translate3D）那么可以选择此类型
        onscroll: '滚动事件'
 * desc: 滚动的方式可以通过配置项 type 来进行配置：
 */
export default {
  props: {
    type: {
      type: String,
      default: 'auto'
    }
  },
  mounted: function() {
    $(this.$el).scroller({
      type: this.type
    })
  },
  methods: {
    scroll: function(ev) {
      this.$emit('onscroll', ev)
    }
  }
}
</script>
