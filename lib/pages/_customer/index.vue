<template>
  <div class="_content">
    <iframe width="100%" height="100%" frameborder="0" :src="src + '?type=' + type">
    </iframe>
  </div>
</template>
<script>
// const GET_CUSTOMER_SERVERICE_PARAM = 'https://wx.tuhu.cn/Home/Get_NTKF_PARAM'

// 客服脚本地址
// const CUSTOMER_SCRIPT_URL = 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9739'

export default {
  data() {
    return {
      // fetched: false,
      type: this.options.type,
      src: process.env.NODE_ENV !== 'development' ? '/vue/customer.html' : '/static/customer.html'
    }
  },
  mounted() {
    // tuhu.fetch(GET_CUSTOMER_SERVERICE_PARAM, {
    //   credentials: 'include' // 支持cookie
    // }).then(() => {
    //   const iframe = $(`<iframe>
    //       <html>
    //         <head>
    //         </head>
    //         <body></body>
    //       </html>
    //     </iframe>`)
    //   $(this.$el).append(iframe)
    //   const iframeDocument = iframe[0].contentDocument

    //   if (window.NTKF) {
    //     window.NTKF.im_openOutPageChat('kf_9739_1468912096836')
    //   } else {
    //     debugger
    //     tuhu.script(CUSTOMER_SCRIPT_URL, iframeDocument).then(() => {
    //       debugger
    //       // const script = iframeDocument.createElement('script')
    //       // script.innerHTML = `window.NTKF.im_openOutPageChat('kf_9739_1468912096836')`
    //       // $(iframeDocument.head).append(script)
    //       // window.NTKF.im_openOutPageChat('kf_9739_1468912096836')
    //     })
    //   }
    // })
  }
}
</script>

