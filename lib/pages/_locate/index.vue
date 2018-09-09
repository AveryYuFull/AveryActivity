<template>
  <div class="_content"></div>
</template>
<script>
export default {
  mounted() {
    window._locateToData = this.options
    let src = '/static/locateline.html'
    if (location.host === 'wx.tuhu.cn') {
      src = 'https://wx.tuhu.cn/vue/locateline.html'
    } else if (location.host === 'wx.tuhu.cn') {
      src = 'https://wxdev.tuhu.work/vue/locateline.html'
    }
    const iframe = $(`<iframe width="100%" height="100%" frameborder="0" src="${src}"></iframe>`)
    $(this.$el).append(iframe)
  },
  methods: {
  }
}
</script>
