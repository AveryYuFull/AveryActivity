<template>
  <div class="swiper-container" style="width: 100%">
    <div class="swiper-wrapper">
      <slot name="content"></slot>
    </div>
    <div v-if="haspagination" class="swiper-pagination"></div>
  </div>
</template>

<script>
/**
 * author: caozhongping@tuhu.cn
 * date: 2017/10/11
 * link: http://idangero.us/swiper/api/#.VjtIEK4rLyU
 * <tuhu-swiper :on-slide-change-start="onSlideChangeStart">
        <div style="width:60%;" slot="content" v-for="(value, index) in [1, 2, 3]" :key="index" class="swiper-slide">
          <img style="width:100%;" src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg" alt="">
        </div>
    </tuhu-swiper>
 */
export default {
  props: {
    moreAttributes: {
      type: Object
    },
    init: {
      type: Boolean
    },
    haspagination: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: String,
      default: '.swiper-pagination'
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: { // ??
      type: Number,
      default: 0
    },
    paginationClickable: {
      type: Boolean,
      default: true
    },
    onSlideChangeStart: {
      type: Function
    },
    onSlideChangeEnd: {
      type: Function
    },
    onSlideNextStart: {
      type: Function
    },
    onSlideNextEnd: {
      type: Function
    },
    onSlidePrevStart: {
      type: Function
    },
    onSlidePrevEnd: {
      type: Function
    },
    spaceBetween: {
      type: Number,
      default: 0
    },
    freeMode: {
      type: Boolean,
      default: false
    },
    freeModeMomentumRatio: {
      type: Number,
      default: 0.5
    },
    slidesPerView: {
      type: [Number, String],
      default: 1 || auto
    },
    slideIndex: {
      type: Number,
      default: 0
    },
    updateSwiper: {
      type: Boolean,
      default: false
    },
    onTouchStart: {
      type: Function
    },
    getInstance: {
      type: Function
    }
  },
  mounted: function() {
    this.instance = $(this.$el).swiper(Object.assign({
      pagination: $(this.$el).find(this.pagination),
      loop: this.loop,
      autoplay: this.autoplay,
      spaceBetween: this.spaceBetween,
      slidesPerView: this.slidesPerView,
      freeMode: this.freeMode,
      freeModeMomentumRatio: this.freeModeMomentumRatio,
      paginationClickable: this.paginationClickable,
      onSlideChangeStart: this.slideChangeStart,
      onSlideChangeEnd: this.onSlideChangeEnd,
      onSlideNextStart: this.onSlideNextStart,
      onSlideNextEnd: this.onSlideNextEnd,
      onSlidePrevStart: this.onSlidePrevStart,
      onSlidePrevEnd: this.onSlidePrevEnd,
      onTouchStart: this.onTouchStart

      // slidesPerView: 'auto',
      // centeredSlides: true,
      // effect: 'coverflow',
      // grabCursor: true,
      // centeredSlides: true,
      // slidesPerView: 'auto',
      // coverflow: {
      //     rotate: 50,
      //     stretch: 0,
      //     depth: 100,
      //     modifier: 1,
      //     slideShadows : true
      // },
    }, this.moreAttributes))

    if (this.slideIndex > 0) {
      this.instance.slideTo(this.slideIndex)
    }

    if (this.getInstance) {
      this.getInstance(this.instance)
    }
  },
  watch: {
    slideIndex(val, oldVal) {
      this.instance.slideTo(val)
    },
    updateSwiper(val, oldVal) {
      setTimeout(() => {
        this.instance.updateClasses()
        this.instance.updateSlidesSize()
        this.instance.slideTo(0)
      })
    },
    init(val) {
      this.instance.init()
    }
  },
  onTouchStart(swiper) {
    this.instance.onTouchStart(swiper)
  },
  destroyed: function() {
    this.instance.destroy()
  },
  methods: {
    slideChangeStart(swiper) {
      this.$emit('update:slideIndex', swiper.activeIndex)
      this.onSlideChangeStart && this.onSlideChangeStart(swiper)
    }
  }
}
</script>
