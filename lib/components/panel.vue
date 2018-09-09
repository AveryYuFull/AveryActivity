<template>
  <div :class="'panel panel-' + dir + ' panel-' + openType"
    @touchstart="touchstartHandle" @touchend="touchendHandle"
  >
    <slot name="content"></slot>
  </div>
</template>

<script>

/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/10. vue-touch 组件 https://github.com/vuejs/vue-touch/tree/next
 * desc: 在任何元素上增加 .close-panel 类都可以使他点击关闭侧栏，因为侧栏只能同时打开一个，所以关闭的时候你不用指定是哪一个侧栏。
        可以通过 .panel-left 或者 .panel-right 来指定侧栏是从左边还是右边出现。
        可以通过 .panel-cover 或者 .panel-reveal 指定侧栏是覆盖在页面上还是推开页面。
        <tuhu-panel ref="panel" dir="left" open-type="cover" class="test">
                <div slot="content" class="content-block">
                        <p>我是从右边出现的</p>
                        <p>并且我是覆盖在页面上而不是推开页面</p>’、'
                        <p></p>
                        <!-- Click on link with "close-panel" class will close panel -->
                        <p><a href="#" class="close-panel">关闭</a></p>
                </div>
        </tuhu-panel>
 */
export default {
  data() {
    return {
      startx: 0,
      starty: 0
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      default: 'right'
    },
    openType: {
      type: String,
      default: 'cover'
    }
  },
  watch: {
    flag(val) {
      if (val) {
        $.openPanel(this.$el)
      } else {
        $.closePanel()
      }
    }
  },
  created() {
  },
  methods: {
    getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI
    },
    getDirection(startx, starty, endx, endy) {
      let angx = endx - startx
      let angy = endy - starty
      let result = 0

      if (Math.abs(angx) < 30 && Math.abs(angy) < 50) {
        return result
      }

      let angle = this.getAngle(angx, angy)
      if (angle >= -135 && angle <= -45) {
        result = 1
      } else if (angle > 45 && angle < 135) {
        result = 2
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
      } else if (angle >= -45 && angle <= 45) {
        result = 4
      }

      return result
    },
    touchstartHandle(e) {
      this.startx = e.touches[0].pageX
      this.starty = e.touches[0].pageY
    },
    touchendHandle(e) {
      var endx, endy
      endx = e.changedTouches[0].pageX
      endy = e.changedTouches[0].pageY
      var direction = this.getDirection(this.startx, this.starty, endx, endy)
      switch (direction) {
        case 0:
          console.log('未滑动')
          break
        case 1:
          console.log('向上')
          break
        case 2:
          console.log('向下')
          break
        case 3:
          console.log('向左')
          if (this.dir === 'left') {
            $.closePanel()
          }
          break
        case 4:
          console.log('向右')
          if (this.dir === 'right') {
            $.closePanel()
          }
          break
        default:
      }
    },
    open: function() {
      const el = $(this.$el).on('closed', () => {
        this.$emit('closed')
      })

      $.allowPanelOpen = true
      $.openPanel(el)
    },
    close: function() {
      $.closePanel()
    }
  }
}
</script>
<style lang="less" scoped>
.vuetouch{
  height: 100%;
}
</style>
