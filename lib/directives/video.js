/**
 * author: caozhongping@tuhu.cn
 * date: 2017/12/11
 * desc: 视频播放
 * eg:<a href="#" v-video="src">视频播放</a>
 */

// import src from '../imgs/hu.png'

Vue.directive('video', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, arg) {
    let video = null
    if (!tuhu.isLightApp) {
      video = document.createElement('video')
      video.src = arg.value
      video.controls = true
      video.preload = 'auto'
      video.style.display = 'none'
      $(el).after(video)
    }
    // const video = $(`<video
    //     src="${arg.value}"
    //     controls = "true"
    //     poster="images.jpg" /*视频封面*/
    //     preload="auto"
    //     webkit-playsinline="true" /*这个属性是ios 10中设置可以
    //                       让视频在小窗内播放，也就是不是全屏播放*/
    //     playsinline="true"  /*IOS微信浏览器支持小窗内播放*/
    //     x-webkit-airplay="allow"
    //     x5-video-player-type="h5"  /*启用H5播放器,是wechat安卓版特性*/
    //     x5-video-player-fullscreen="true" /*全屏设置，
    //                       设置为 true 是防止横屏*/
    //     x5-video-orientation="portraint" //播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
    //     style="object-fit:fill">
    //   </video>`).hide()[0]

    // video.height = 0
    // video.width = 0
    // video.style.position = 'fixed'
    // video.style.top = '-9999px'

    $(el).on('click', function () {
      if (tuhu.isLightApp) {
        if (tuhu.util.isMiApp()) {
          system.go('/Component_Video?video=' + encodeURIComponent(arg.value))
        } else {
          system.go(`/component_video?video=${arg.value}`)
        }
      } else {
        video.play()
        if (video.requestFullscreen) {
          video.requestFullscreen()
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullScreen()
        }
      }

      // tuhu.photoBrowser({
      //   photos: [
      //     src
      //   ]
      // }, {
      //   showPage: false
      // })
      // const pb = tuhu.getCurrentPage().instance.pb
      // window.pb = pb
      // $(pb.container).find('.photo-browser-zoom-container img').replaceWith(video)
      // video.play()
      // const pagination = $.Swiper.prototype.defaults.pagination

      // $.Swiper.prototype.defaults.pagination = ''

      // const pb = $.photoBrowser({
      //   photos: [{
      //     html: '<div style="position:fixed;top:15px;right:15px;color:#fff;font-size:14px;">关闭</div><iframe src="' + arg.value + '" frameborder="0" allowfullscreen></iframe>'
      //   }],
      //   theme: 'dark',
      //   type: 'standalone'
      // })
      // pb.open()

      // $(pb.container).on('click', function(ev) {
      //   $.Swiper.prototype.defaults.pagination = pagination

      //   pb.close()
      // })
    })
  }
})
