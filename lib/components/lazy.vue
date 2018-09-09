<template>
  <div class="wrap" v-if="height" :style="style">
    <img class="placeholder" src="../imgs/hu.png" />
  </div>
  <div v-else></div>
</template>
<script>
  const FONSTSIZE = parseInt($('html').css('font-size')) || 20

  const PRELOAD = 1

  const LIMIT = 2

  let RATIO = 2

  const photos = []

  tuhu.getDeviceDetail().then((data) => {
    if (data && data.netWork !== 'wifi') {
      RATIO = 1.5
    }
  })

  export default {
    data() {
      return {
        loadCount: 0,
        loaded: false,
        timeout: null,
        scrollDom: null,
        height: 0,
        cutHeight: 0
      }
    },
    props: {
      el: {
        type: HTMLImageElement
      },
      src: {
        type: String,
        required: true
      },
      width: {
        type: [String, Number],
        required: false
      },
      forceHeight: {
        type: [String, Number],
        required: false
      },
      group: {
        type: String,
        required: false,
        validator: function (value) {
          return (value + '').indexOf('group_') > -1
        }
      }
    },
    mounted() {
      // this.el.__instance__ = this

      this.setPhotos()

      const height = this.getHeight()
      this.scrollDom = this.getScrollDom()
      if (height) {
        this.cutHeight = height[0]
        this.height = height[1]
      }
      setTimeout(() => {
        this.scrollDom.on('scroll', this.scrollHandle)
        this.loadImg()
      })
    },
    watch: {
    },
    computed: {
      // 计算后的真实宽度
      realWidth() {
        return this.getWidth()
      },
      style() {
        return {
          width: this.realWidth + 'px',
          height: this.height + 'px'
        }
      }
    },
    beforeDestroy() {
      this.scrollDom.off('scroll', this.scrollHandle)
    },
    methods: {
      getWidth() {
        const width = this.width
        const match = (width + '').match(/(\d+)%$/)
        if (match) {
          return parseInt(match[1] * window.innerWidth / 100)
        }

        return parseInt(width * FONSTSIZE)
      },
      scrollHandle() {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          // console.log('scroll')

          this.loadImg()
        }, 100)
      },
      // 图片浏览器
      setPhotos() {
        const group = this.group
        let imageIndex = 0

        if (group !== undefined) {
          if ((group + '').indexOf('group_') < 0) {
            throw new Error(`group属性非法，请调用tuhu.util.getGroup()生成`)
          }

          if (!photos[group]) {
            photos[group] = []
          }
          imageIndex = photos[group].length
          if (this.src.indexOf('@') < 0) {
            const type = this.src.match(/\.([^.]+)$/)[1]
            photos[group].push(this.src + '@' + innerWidth + 'w_100Q.' + type)
          } else {
            photos[group].push(this.src)
          }

          $(this.el).on('click', (e) => {
            if (photos[group]) {
              tuhu.photoBrowser({
                photos: photos[group]
              }, {
                index: imageIndex
              })
            }
          })
        }
      },
      loadImg() {
        if (this.loaded) {
          return
        }

        const isLoad = this.isLoad()
        if (!isLoad) {
          return
        }

        this.loaded = true
        this.scrollDom.off('scroll', this.scrollHandle)

        this._loadImg()
      },
      _loadImg() {
        this.loadCount++
        this.el.src = this.getSrc()
        this.el.onload = () => {
          if (this.height) {
            $(this.el).css({
              width: this.realWidth + 'px',
              height: this.height + 'px'
            })
          }

          $(this.$el).replaceWith($(this.el))
          this.$el.__vue__.$el = this.el
          this.el.__vue__ = this.$el.__vue__
        }

        this.el.onerror = () => {
          if (this.loadCount < LIMIT) {
            this._loadImg()
          }
        }
      },
      getSrc() {
        // if (!this.height) {
        //   return this.src
        // }
        if (!/img\d\.tuhu\.org/.test(this.src)) {
          return this.src
        }

        let src = this.src.replace(/@.+/, '')
        const type = src.match(/\.([^.]+)$/)[1]
        // debugger
        if (!this.cutHeight) {
          let wid = this.getWidth()
          if (type === 'gif') {
            src += '?@' + wid + 'w_99q.src'
          } else {
            src += '@' + wid + 'w_99q.' + type
          }
        } else {
          if (type === 'gif') {
            src += '?@' + this.cutHeight + 'h_99q.src'
          } else {
            src += '@' + this.cutHeight + 'h_99q.' + type
          }
        }
        return src.replace('image.tuhu.cn', 'img1.tuhu.org').replace(/https?/, 'https').replace(/img\d\./, 'img1.').replace(/\.(?:webp|png)$/, '.jpg')
      },
      isLoad() {
        const scrollOffset = this.scrollDom.offset()
        if (!scrollOffset) {
          return true
        }

        const scrollTop = scrollOffset.top
        const scrollHeight = scrollOffset.height

        const offset = $(this.$el).offset()
        if (!offset.height) {
          return true
        }

        const checkTop = offset.top - scrollTop + (offset.height / 2)
        if (checkTop >= -(PRELOAD * scrollHeight) && checkTop <= (PRELOAD + 1) * scrollHeight) {
          return true
        }

        return false
      },
      getScrollDom() {
        let parentNode = this.$el
        do {
          let style = window.getComputedStyle(parentNode)
          if (!style) {
            break
          }

          const overflow = style['overflow-y']

          if ((overflow === 'auto' || overflow === 'scroll')) {
            break
          }

          parentNode = parentNode.parentNode
        } while (parentNode)

        return $(parentNode)
      },
      // 获取 获取高度
      getHeight() {
        let height = this._getHeight(this.src.replace(/@.+/, ''))
        if (!height) {
          height = this._getHeight(this.src)
        }

        return height
      },
      _getHeight(src) {
        let match = src.match(/(\d+)w_(\d+)h/)
        if (!match) {
          match = src.match(/w(\d+)_h(\d+)/)
        }

        if (match) {
          if (!this.width) {
            throw new Error('必须传入width剪裁图片')
          }
          // (match[2] / match[1] 高宽比 ratioHeight 真实高度
          let ratioHeight = 0
          ratioHeight = this.realWidth * (match[2] / match[1])
          // RATIO放大倍数
          return [Math.ceil(ratioHeight / 10) * 10 * RATIO, parseInt(ratioHeight)]
        } else {
          return [0, this.getWidth()]
        }
      }
    }
  }
</script>

<style type="less" scoped>
  .wrap {
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .placeholder {
    height: 1.3rem !important;
    width: 1.3rem !important;
  }
</style>
