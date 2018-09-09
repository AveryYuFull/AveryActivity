// import iosScroll from '../../commons/iosScroll'
const API_BRAND_URL = 'https://item.tuhu.cn/Car/GetCarBrands2'
const API_CARS_URL = 'https://item.tuhu.cn/Car/SelOneBrand'
const ALL_CARS_API = 'https://item.tuhu.cn/Car/GetVehicle'

export default {
  beforeCreate() {
    function getBrandUrl(item) {
      return 'https://img' + (item.Brand.substr(0, 1).charCodeAt() % 4 + 1) + '.tuhu.org' + item.Url
    }

    function getBrandShow(item) {
      return item.Brand.split(' ')[2]
    }

    tuhu.fetch(API_BRAND_URL).then((data) => {
      const brands = {}
      const chars = []

      for (const name in data) {
        if (name.length === 1) {
          brands[name] = []
          chars.push(name)

          data[name].forEach((item) => {
            item.BrandShow = getBrandShow(item)
            item.Url = getBrandUrl(item)
            brands[name].push(item)
          })
        }
      }

      const hots = []
      let parentIndex = -1
      data.hot.every((item, index) => {
        if (index % 5 === 0) {
          parentIndex++
          if (parentIndex > 1) {
            return false
          }
          hots[parentIndex] = []
        }

        item.BrandShow = getBrandShow(item)
        item.Url = getBrandUrl(item)
        hots[parentIndex].push(item)

        return true
      })

      this.hots = hots
      this.brands = brands
      this.chars = chars

      this.$nextTick(function () {
        $(this.$el).find('[scroll-index]').each((index, item) => {
          this.scrollTops[$(item).attr('scroll-index')] = item.offsetTop + 31
        })
      })
    })

    this.allCars = tuhu.fetch(ALL_CARS_API).then((data) => {
      return data.Vehicle
    })
  },
  created() {
  },
  mounted() {
    // iosScroll('.page-current', '.carpage .page-content', 44)
    // iosScroll('.page-current', '.panel .native-scroll', 44)
  },
  beforeDestroy() {
    if (!this.selected) {
      setTimeout(() => {
        const instance = tuhu.car.getInstance()
        instance.force = false
        instance.getDefaultCar()
      })
    }
  },
  data() {
    return {
      hots: [],
      brands: {},
      chars: [],
      scrollTops: {},
      rightScrollTops: {},
      currentChar: '',
      currentRightChar: '',
      brandDatas: {},
      currentBrand: '',
      currentBrandUrl: '',
      searchedCars: [],
      selected: false,
      brandName: '',
      count: 0
    }
  },
  methods: {
    selectedBrandCar(item) {
      const type = this.options.type - 0

      this.$refs.panel.close()
      this.$refs.search.value = ''
      this.searchedCars = []

      this.selected = true

      if (type < 4) {
        tuhu.car.getInstance().resolveCar(item)
      } else if (type === 8) {
        tuhu.navigateTo({
          url: '/pages/_car/choosesize',
          query: {
            type: type,
            vehicle: item.Vehicle,
            productid: item.ProductID,
            img: item.ImageUrl
          },
          data: {
            car: item
          }
        })
      } else if (type === 6) {
        tuhu.navigateTo({
          url: '/pages/_car/tiresize',
          query: {
            type: type,
            vehicle: item.Vehicle,
            img: item.ImageUrl
          },
          data: {
            car: item
          }
        })
      } else {
        tuhu.navigateTo({
          url: '/pages/_car/detail',
          query: {
            productid: item.ProductID,
            type: type,
            vehicle: item.Vehicle,
            img: item.ImageUrl
          },
          data: {
            car: item
          }
        })
      }
    },
    cancel(ev) {
      this.searchedCars = []
      ev.currentTarget.value = ''
    },
    brandClick(item) {
      this.currentBrand = item.Brand
      this.currentBrandUrl = item.Url
      this.brandName = ''
      console.log(this.brandName)
      const url = API_CARS_URL + '?Brand=' + encodeURIComponent(item.Brand)
      tuhu.fetch(url).then((data) => {
        const brandTypes = []
        const brandDatas = {}

        data.OneBrand.forEach((item) => {
          if (brandTypes.indexOf(item.BrandType) < 0) {
            brandTypes.push(item.BrandType)
            brandDatas[item.BrandType] = []
          }

          brandDatas[item.BrandType].push(item)
        })

        this.brandDatas = brandDatas
        for (const key in brandDatas) {
          if (!this.brandName) {
            console.log('key: ', key)
            this.brandName = key
          }
        }
        this.$refs.panel.open()

        this.$nextTick(() => {
          this.rightScrollTops = {}
          this.currentRightChar = ''

          $(this.$el).find('[scroll-right-index]').each((index, item) => {
            const key = $(item).attr('scroll-right-index')

            this.rightScrollTops[key] = item.offsetTop + 8

            if (index < 1) {
              this.rightScrollTops[key] += 31
            }
          })

          $.refreshScroller()
          $(this.$el).find('.panel .content').scrollTop(0)
        })
      })
    },
    input(ev) {
      // const url = API_CARS_URL + '?Brand=' + encodeURIComponent(brand.Brand)
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }

      const value = ev.currentTarget.value.toUpperCase()

      if (!value) {
        this.searchedCars = []
        return
      }

      this.timeOut = setTimeout(() => {
        const result = []

        this.allCars.then((data) => {
          data.forEach((item) => {
            if ((item.Vehicle + item.Brand).toUpperCase().indexOf(value) > -1) {
              result.push(item)
            }
          })

          this.searchedCars = result
        })
      }, 300)
    },
    mainScroll(ev) {
      const scrollTop = ev.currentTarget.scrollTop
      let findIndex = ''

      for (const key in this.scrollTops) {
        if (scrollTop >= this.scrollTops[key]) {
          findIndex = key
        }
      }

      if (findIndex) {
        this.currentChar = findIndex
      } else {
        this.currentChar = ''
      }
    },
    rightScroll(ev) {
      // console.log('rightScroll')
      let brandScrolls = $(this.$refs.brandScroll).find('.list-title')
      // console.log(brandScrolls)
      brandScrolls.map((index, item) => {
        let scrollIndex = $(item).attr('scroll-right-index')
        let offtop = $(item).offset().top
        if (offtop > 50 && offtop < 70) {
          // debugger
          this.count = this.count + 1
          this.brandName = scrollIndex
        } else if (offtop > 70 && offtop < 90) {
          this.brandName = $(brandScrolls[index - 1]).attr('scroll-right-index')
        }
        // console.log(22, scrollIndex)
        // console.log(33, offtop)
      })
      const scrollTop = ev.currentTarget.scrollTop
      let findIndex = ''

      for (const key in this.rightScrollTops) {
        if (scrollTop >= this.rightScrollTops[key]) {
          findIndex = key
        }
      }

      if (findIndex) {
        this.currentRightChar = findIndex
      } else {
        this.currentRightChar = ''
      }
    },
    charClick(index) {
      $(this.$el).find('.page-content').eq(0).scrollTop(this.scrollTops[index])
    },
    topClick() {
      $(this.$el).find('.page-content').eq(0).scrollTop(0)
    }
  }
}
