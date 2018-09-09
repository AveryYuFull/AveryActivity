<template>
  <div class="bar bar-header-secondary">
    <div class="searchbar">
      <a class="searchbar-cancel" @click="cancel">{{cancelText}}</a>
      <div class="search-input">
        <label class="icon icon-search" for="search"></label>
        <input style="line-height:1.6rem;" v-model="value" type="search" :placeholder="placeholder" @focus="focus" @blur="blur" @input="input" />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/10
 * des: 查找
 * eg: 苹果风格的搜索栏，带有一个自动隐藏的取消按钮。适合作为主搜索固定在页面顶部
 * <tuhu-search :placeholder="msg" cancel-text="取消" :input="input" />
 */
export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字...'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    input: function(ev) {
      this.$emit('input', ev, ev.currentTarget.value)
    },
    focus: function(ev) {
      this.$emit('focus', ev, ev.currentTarget.value)
    },
    blur: function(ev) {
      this.$emit('blur', ev, ev.currentTarget.value)
    },
    cancel(ev) {
      this.value = ''

      this.$emit('cancel', ev, ev.currentTarget.value)
    }
  }
}
</script>
