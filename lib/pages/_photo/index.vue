<template>
  <div class="_content" style="margin-top:0px;"></div>
</template>

<script>
  import src from '../../imgs/hu.png'

  export default {
    data() {
      return {
        loaded: {},
        back: false,
        index: this.options.other.index || 0,
        pb: null
      }
    },
    methods: {
      getPhotos() {
        const photos = []
        this.options.photos.forEach((item, index) => {
          photos.push(src)
        })

        return photos
      },
      setPb() {
        const pagination = $.Swiper.prototype.defaults.pagination
        $.Swiper.prototype.defaults.pagination = ''

        const photos = this.getPhotos()

        let template = '<div class="photo-browser-closeIcon"></div>'

        if (this.options.other.showPage) {
          template += `<div class="showpage">
                          <div class="photo-browser-current"></div>
                          /<div class="photo-browser-total"></div>
                        </div>`
        }

        const param = {
          photos: photos,
          onClose: () => {
            $.Swiper.prototype.defaults.pagination = pagination

            if (!this.back) {
              history.go(-1)
            }
          },
          navbarTemplate: template
        }
        const pb = $.photoBrowser(param)

        pb.open(this.index)
        // $(pb.container).find('.photo-browser-closeIcon').on('click', () => {
        //   pb.close()
        // })

        let count = 0
        $(pb.container).on('click', function(ev) {
          count++

          setTimeout(() => {
            if (count === 1) {
              pb.close()
            }

            count = 0
          }, 300)
          // if (ev.target.nodeName !== 'IMG') {
          //   close(ev)
          // } else {
          //   setTimeout(() => {
          //     if (ev.target.larged) {
          //       close(ev)
          //     } else if ($(ev.target).css('transform') === 'none') {
          //       close(ev)
          //     } else {
          //       setTimeout(() => {
          //         ev.target.larged = true
          //       }, 300)
          //     }
          //   }, 300)
          // }
        })

        pb.onSliderTransitionEnd = () => {
          if (pb.activeIndex !== this.index) {
            this.index = pb.activeIndex

            this.loadImg()
          }
        }

        this.pb = pb
      },
      loadImg() {
        const img = $(this.pb.container).find('.photo-browser-zoom-container').eq(this.index).find('img')
        if (!this.loaded[this.index]) {
          img.attr('src', this.options.photos[this.index])
          this.loaded[this.index] = true
        }
      }
    },
    created() {
      this.setPb()
      this.loadImg(this.index)
    },
    beforeDestroy() {
      this.back = true
      this.pb.close()
    }
  }
</script>
