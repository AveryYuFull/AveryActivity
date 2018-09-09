<template>
  <div class='_content'>
    <div class='search-page' >
      <!-- 输入搜索框 -->
      <div class='search-input'>
        <input
          :placeholder="searchParmas.word"
          @click='toIndex'
        />
        <div class='search-button'  @click='hindleBack'>取消</div>
      </div>
      <!-- 搜索框下所有内容 -->
      <div class='search-content'>
        <tuhu-infinite
          @oninfinite="oninfinite"
          :nodata='noProduct'
          endmsg="到底了哦"
          :distance="100"
          :end ='end'
          :id="scrollId"
          :class="isPanelShow?'hidden':''"
        >
          <div slot="content" style="padding-top: 2.3rem">
            <!-- 活动列表 -->
            <div class='acitivty' v-cloak v-if="ActivityBuildList" @click='toActivity'>
              <img  v-lazy="{src:ActivityBuildList.SelKeyImage,width:'100%'}">
            </div>
            <!-- 跳转模块 -->
            <div class='tomodule' v-cloak v-if="activityFirmList">
              <img  v-lazy="{src:activityFirmList.Image,width: 3}">
              <div class='module-name'>
                <div v-cloak>{{activityFirmList.Name}}</div>
                <div v-cloak class="description">{{activityFirmList.Description}}</div>
              </div>
              <div class="module-button" @click="toModule">进入</div>
            </div>
            <!-- 车型信息 -->
            <div class='search-car'
              @click='selectCar'
            > 
              <div class="box">
                <div :class="{carInfo: carInfo.TID}" v-cloak>{{ carNamesShow }}</div>
                <div v-if="carInfo.ProductID && !carInfo.TID">完善车型</div>
              </div>
            </div>
            <!-- 排序tab  -->
            <searchSortTabs
              :tabsStatusType='tabsStatusType'
              :callbackClickTab='callbackClickTab'
              :keyword="searchParmas.word"
              class='search-list-sorttabs'
              :handlePanelHiden='handleSortPanelHidden'
            >
            </searchSortTabs>
            <!-- 产品列表 -->
            <div class='product-list' >
              <div class='product-item'
                v-for="(item,index) in ProductList" :key='index'
                @click="autoNavigate(item)"
              >
                <img  v-lazy="{src:item.Image,width: 6.25}">
                <div class='product-content'>
                  <div class='product-name'>
                    <span  v-text="item.DisplayName"></span>
                    <!-- 红字提醒 -->
                    <span v-text="item.ShuXing5" :style="{color:'#df3448'}"></span>
                  </div>
                  <div class='product-tabs'>
                    <span
                      v-for='(ite,ind) in item.Tabs'
                      :key='ind'
                      v-text="ite.Tab"
                      :style="{backgroundColor:'#'+ite.Color,color:'#fff',marginLeft:'0.1rem'}"
                    ></span>
                  </div>
                  <div class='product-price' v-text='item.Price'></div>
                  <div class='product-numbers'>
                    已售<span v-text='item.SalesQuantity'/>件 | <span v-text='item.CommentTimes'/>人评论
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </tuhu-infinite>
      </div>
    <tuhu-gotop :scrollid="scrollId"></tuhu-gotop>
    </div>
  </div>
</template>

<script>
/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/20
 * desc: 搜索列表页
 */
  import searchSortTabs from './searchSortTabs'
  export default {
    data () {
      return {
        value: '',
        // options: {
        //   searchword: '轮胎'
        // },
        resolve: () => {
        },
        scrollId: tuhu.util.getScrollId(),
        noProduct: false,
        end: false,
        oldPageNumber: 1,
        ProductList: [],
        carNamesShow: '请选择车型信息',
        tabsStatusType: [
          {
            name: '综合',
            type: 0, // 少选id
            choosed: true // 是否默认选中
          }, {
            name: '销量',
            up: 2,
            down: 1,
            default: 'down', // 默认展示的是啥样的
            choosed: false
          }, {
            name: '价格',
            up: 6,
            down: 5,
            default: 'down',
            choosed: false
          }
        ],
        TotalPage: 1,
        BrandType: '',
        CarName: '',
        car: {},
        searchParmas: {
          word: '', // 搜索关键字
          pageNumber: 1, // 页数
          orderType: 0, // 排序
          MinPrice: '', // 价格最低
          MaxPrice: '', // 价格最高
          BrandName: '', // 侧滑品牌筛选
          cityName: '',
          provinceName: '',
          cityId: '', // 空
          provinceId: '', // 空
          Width: '',  // 空
          AspectRatio: '', // 空
          Rim: '', // 空
          // SalesName: '', // SalesName
          tid: '', // TID
          vehicleId: '', // ProductID
          saleRuleId: this.options.ruleId || '' // 优惠券id
        },
        isPanelShow: false, // 侧边栏是否滑出
        location: {},
        carInfo: {},
        ActivityBuildList: null,
        activityFirmList: null
      }
    },
    components: {
      searchSortTabs: searchSortTabs
    },
    beforeCreate() {
    },
    watch: {
      searchParmas: {
        handler(value, oldValue) {
          let isRefersh = true
          this.end = false
          this.noProduct = false
          if (value.pageNumber !== oldValue.pageNumber) {
            isRefersh = false
          }
          if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
            // if ((this.TotalPage === 1 ? 2 : this.TotalPage) > value.pageNumber) {
            this.fetchProductList(isRefersh)
            // }
          }
        },
        deep: true
      }
    },
    created() {
      // 不会触发fetch，等到地理信息和车型信息到位后再触发
      const keyword = this.options === undefined ? '' : this.options.keyword
      // const saleRuleId = this.options === undefined ? '' : this.options.ruleId
      this.$set(this.searchParmas, 'word', keyword)
      // this.$set(this.searchParmas, 'saleRuleId', saleRuleId)
      this.firstSetParmas()
    },
    methods: {
      toActivity() {
        if (tuhu.autoNavigate) {
          tuhu.autoNavigate(this.ActivityBuildList)
        }
      },
      toModule() {
        if (tuhu.autoNavigate) {
          tuhu.autoNavigate(this.activityFirmList)
        }
      },
      async getCarInfo() {
        let car = {}
        if (tuhu.store === undefined) {
          car = await tuhu.getDefaultCar(5, false)
        } else {
          car = await tuhu.store.state._carInfo
        }
        if (car !== undefined && !tuhu.util.isEmptyObject(car)) {
          if (car.SalesName !== '') {
            this.carNamesShow = `车型：${car.SalesName}`
          }
          this.carNamesShow = `车型：${car.BrandType || ''} - ${car.CarName || ''} ${car.SalesName || ''}`
        }
        this.carInfo = car
      },
      async getLocation() {
        let location
        if (tuhu.store === undefined) {
          location = await tuhu.getLocate()
        } else {
          location = await tuhu.store.state._locationInfo
        }
        this.location = location
      },
      autoNavigate(item) {
        if (tuhu.autoNavigate) {
          tuhu.autoNavigate(item)
        }
      },
      handleSortPanelHidden(isshow) {
        this.isPanelShow = isshow
      },
      async firstSetParmas() {
        await this.getCarInfo()
        await this.getLocation()
        let carInfo = this.carInfo
        let location = this.location
        if (carInfo && location) {
          this.searchParmas = {
            ...this.searchParmas,
            // SalesName: carInfo.SalesName,
            tid: carInfo.TID,
            vehicleId: carInfo.ProductID,
            // BrandType: carInfo.BrandType,
            // CarName: carInfo.CarName,
            cityName: location.city,
            provinceName: location.province
          }
        } else if (!carInfo) {
          this.searchParmas = {
            ...this.searchParmas,
            cityName: location.city,
            provinceName: location.province
          }
        } else if (!location) {
          this.searchParmas = {
            ...this.searchParmas,
            // SalesName: carInfo.SalesName,
            tid: carInfo.TID,
            vehicleId: carInfo.ProductID
            // BrandType: carInfo.BrandType,
            // CarName: carInfo.CarName
          }
        }
      },
      async selectCar() {
        if (this.carInfo.TID === '' || this.carInfo.TID === undefined) {
          // 二级车型继续补全 、没有车型选车
          tuhu.getDefaultCar(
            5, true
          ).then((car) => {
            this.getCarInfo()
          }).catch((e) => {
            // alert(333, e)
          })
        } else {
              // 五级车型跳转选车页面
          tuhu.selectCar(
            5, true
          ).then((car) => {
            this.getCarInfo()
            this.searchParmas = {
              ...this.searchParmas,
              SalesName: car.SalesName,
              TID: car.TID,
              vehicleId: car.ProductID,
              BrandType: car.BrandType,
              CarName: car.CarName
            }
          }).catch((e) => {
            // alert(333, e)
          })
        }
      },
      toIndex() {
        tuhu.redirectTo({
        // tuhu.navigateBack({
          url: '/pages/_search/index',
          data: {
            keyword: this.options === undefined ? '' : this.options.keyword
          }
        })
      },
      oninfinite(ev, resolve, reject) {
        // 因为vue watch deep 监听对象时，handler 两个参数指向相同，所以要重新赋值，这样既可以监听到，又可以取到旧的值
        this.searchParmas = {...this.searchParmas, pageNumber: this.searchParmas.pageNumber + 1}
        this.resolve = resolve
      },
      // 点击取消
      hindleBack() {
        tuhu.navigateBack()
      },
      // 请求列表
      async fetchProductList(isRefersh) {
        let searchParmas = this.searchParmas
        if (this.end === false && this.searchParmas.word !== '') {
          let res = await tuhu.fetch('https://api.tuhu.cn/Search/SearchList', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'version': 'iOS 5.0.1' // 活动价格
            },
            body: JSON.stringify(searchParmas)
          }, {
            status: isRefersh
          })

          this.ActivityBuildList = res.ActivityBuildList
          this.activityFirmList = res.activityFirmList
          if (isRefersh) {
            this.ProductList = res.ProductList
          } else {
            this.ProductList.push(...res.ProductList)
          }
          if (res.ProductList.length === 0 || res.TotalPage === 1) {
            this.noProduct = true
          }
          if (res.TotalPage === this.searchParmas.pageNumber) {
            this.end = true
          }
          this.TotalPage = res.TotalPage
          this.resolve()
        } else {
          this.end = true
        }
      },
      callbackClickTab(style, typeKey) {
        // 排序
        if (style === 'sequence') {
          this.searchParmas = {...this.searchParmas, orderType: typeKey, pageNumber: 1}
        } else if (style === 'money') {
          // 价格范围
          // typeKey.sort()
          this.searchParmas = {...this.searchParmas, MinPrice: typeKey[0], pageNumber: 1}
          this.searchParmas = {...this.searchParmas, MaxPrice: typeKey[1], pageNumber: 1}
        } else if (style === 'brand') {
          // 品牌
          // this.searchParmas = {...this.searchParmas, BrandName: typeKey.join('、')}
          this.searchParmas = {...this.searchParmas, BrandName: typeKey.join(','), pageNumber: 1}
        } else if (style === 'recommend') {
          this.searchParmas = {...this.searchParmas, IsProductRefer: typeKey}
        }
      }
    }
  }
</script>

<style scoped lang="less">
.swiper-container{
  padding-bottom: 0;
}
._content{
  display: flex;
}
#goTop{
  // margin-top: 2.3rem;
  // margin-bottom: 2.3rem;
  // box-sizing: border-box;
  // height: ;
  // overflow: hidden;
}
.content.hidden{
  overflow: hidden;
}
.search-page{
  background-color: #fff;
  position: relative;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  .search-input{
    border-bottom:1px solid  rgba(238, 238, 238, 1);
    width:100%;
    height:2.2rem;
    border-bottom:1px solid #d9d9d9;
    padding-left:1rem;
    position:fixed;
    z-index:3;
    background:#fff;
    display: flex;
    align-items: center;
    input{
      padding-left: 1rem;
      background-color: rgba(238, 238, 238, 1);
      border: none;
      border-radius: 1rem;
    }
    &:before{
      content:'';
      position:absolute;
      width:0.6rem;
      height:0.6rem;
      background:url('https://res.tuhu.org/images/xcx/search.png') no-repeat;
      background-size:100%;
      top:0.8rem;
      left:1.3rem;
    }
    .search-button{
      width: 3rem;
      text-align: center;
      font-size: 0.7rem;
      padding: 0.5rem 0;
      color: rgba(153, 153, 153, 1);
    }
  }
  .search-content{
    font-size: 0.7rem;
    width: 100%;
    .acitivty{
    }
    .tomodule{
      display: flex;
      padding: 0.7rem 0.5rem;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.3rem solid #eaeaea;
      img{
        width: 3rem;
        height: 3rem;
      }
      .module-name{
        flex-grow: 1;
        padding: 0 1rem;
        font-size: 0.8rem;
        .description{
          color: #bbbbbb;
          font-size: 0.7rem;
          margin-top: 0.5rem;
        }
      }
      .module-button{
        border: 1px solid;
        color: #df3448;
        display: flex;
        justify-content: center;
        height: 1.3rem;
        width: 4rem;
        align-items: center;
      }
    }
    .noproduct{
      border: 1px soild;
      background:url('https://res.tuhu.org/images/xcx/goods.png') no-repeat;
      height: 78%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 21%;
      background-position: center 35%;
    }
    .search-car{
      border-bottom: 0.3rem solid #eaeaea;
      font-size: 0.65rem;
      width: 100%;
      height: 2rem;
      color:#666666;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.6rem;
      .box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        div:last-child {
          margin-right: 0.5rem;
        }
        div.carInfo {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; 
        }
      }
      &:after{
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        border: 0.1rem solid;
        transform: rotate(-45deg);
        border: 4rpx solid #c7c7cc;
        border-left-width: 0;
        border-top-width: 0;
      }
    }
    .product-list{
      .product-item{
        height:6rem;
        border-bottom:1px solid #eeeeee;
        position:relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        img{
          display: inline-block;
          width: 25% !important;
          height: auto !important;
        }
        .product-content{
          height:100%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: 75%;
          flex-grow: 0;
          vertical-align: top;
          padding-left: 0.5rem;
          .product-name{
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              max-height: 2.35rem;
              font-size:0.7rem;
              line-height:0.8rem;
          }
          .product-tabs{
            display:flex;
            span{
              font-size: '0.4rem';
              padding:'0.1rem';
              border-radius:2px;
              display: flex;
              font-size: 0.55rem;
              padding: 0 0.2rem;
            }
          }
          .product-price{
            color:#df3448;
            font-size: 1rem;
            line-height: 1;
            &::before{
              content: '¥';
              font-size: 0.7rem
            }
          }
          .product-numbers{
            color:#999999;
            font-size:0.4rem
          }
        }
      }
    }
  }
}
</style>