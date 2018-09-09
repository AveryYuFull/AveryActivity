<template>
  <div class="_content">
    <div class="shopWrap">
      <div class="tabsList">
        <div class="tabsItem area" @click.stop='handleClickTabsItem("area")' :class=" tabsSelectedType === 'area' ? 'selected':'' ">
          <div class="tabTitle">
            <span v-cloak>{{cityTabTitle | fliterLocateNull}}</span><i></i>
          </div>
          <div class="arealist"  :class=" tabsSelectedType === 'area' ? 'block':'none' ">
          	<div class="areaExpanded">
          		<ul>
          			<li
                  :class="{'selected': isCitySelected(item)}"
                  v-for='(item, index) in areas'
                  :key='index'
                  @click.stop='handleClickCity(item.Region)'
                >
                  <i v-text="item.Region"></i><span v-text="item.Count"></span>
                </li>
          		</ul>
          	</div>
          </div>
        </div>
        <div class="tabsItem sort"  @click.stop='handleClickTabsItem("sort")' :class=" tabsSelectedType === 'sort' ? 'selected':'' ">
          <div class="tabTitle"><span>{{sortTabTitle}}</span><i></i></div>
          <div class="shopsortlist" :class=" tabsSelectedType === 'sort' ? 'block':'none' ">
            <div class="shopsortExpanded">
              <ul>
                <li
                  v-for="(item, index) in sort"
                  :key='index'
                  :class="item.select?'selected':''"
                  @click.stop='handleClickSort(item.sort)'
                >
                  <i v-text="item.text"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tabsItem type" @click.stop='handleClickTabsItem("type")' :class=" tabsSelectedType === 'type' ? 'selected':'' ">
          <div class="tabTitle"><span>筛选</span><i></i></div>
          <!--门店种类浮层-->
        	<div class="Typelist" @click.stop='handelClickCover' :class=" tabsSelectedType === 'type' ? 'block':'none' ">
        		<div class="TypeExpanded">
              <div class="shopType">门店种类</div>
          		<ul>
                <li
                  v-for='(item, index) in ShopClassifications'
                  :key='index'
                  v-text='item'
                  @click.stop='handleClickType(item)'
                  :class="selectedShopTypes.indexOf(item) !== -1?'selected':''"
                >
                </li>
          		</ul>
              <div class="typeButton">
                <div class="reset" @click.stop="resetTypeButton">重置</div>
                <div class="submit" @click.stop="submitTypeButton">确定</div>
              </div>
          	</div>
        	</div>
        </div>

      </div>
      <div class="locateAdd">
        <div class="locate">{{locateName | fliterLocateNull}}</div>
      </div>
      <div class="scrollContent">
        <tuhu-infinite
          @oninfinite="oninfinite"
          :nodata='nodata'
          endmsg="到底了哦"
          :distance="100"
          :end ='end'
          :id="scrollId"
        >
          <div class="shopList" slot="content">
            <ul>
              <li
                v-for='(item, index) in shopList'
                :key='item.ShopId'
                @click='autoNavigate(item)'
              >
                <div class="shopItem">
                  <div class="leftImg zanting" v-if="item.IsSuspend">
                    <img v-lazy="{src:item.Images[0],width:'3.2'}" />
                  </div>
                  <div class="leftImg kaiye" v-else-if="item.Summary  === '1' ">
                    <img v-lazy="{src:item.Images[0],width:'3.2'}" />
                  </div>
                  <div class="leftImg" v-else>
                    <img v-lazy="{src:item.Images[0],width:'3.2'}" />
                  </div>
                  <div class="rightText">
                    <div class="shopTitle">
                      <span class="name" v-text='item.CarparName'></span>
                      <span class="distance" >{{item.Distance | filterDistance}}</span>
                    </div>
                    <div class="address">
                      <span class="addInfo" v-text="item.Address"></span>
                    </div>
                    <div class='tags'>
                      <!-- item.InstallNow  马上装 等待下-->
                      <!-- 工厂店 -->
                      <span class="gcd" v-if='(item.ShopType & 512)  === 512'>
                        <img v-lazy="{src:gcd}">
                      </span>
                      <!-- 维修厂 -->
                      <span class="wxc" v-if="((item.ShopType & 512)  !== 512) && item.ShopClassification === '维修厂'">
                        <img v-lazy="{src:wxc}">
                      </span>
                      <!-- 快修店 -->
                      <span class="kxd" v-if="((item.ShopType & 512)  !== 512 ) &&  item.ShopClassification === '快修店'">
                        <img v-lazy="{src:kxd}">
                      </span>
                      <!-- 免费常规检测 -->
                      <span class="mfjc" v-if="(item.ShopCertification & 8 )=== 8">
                        <img v-lazy="{src:mfjc}">
                      </span>
                      <!-- 次日达 -->
                      <span class="crd">
                        <img v-lazy="{src:crd}" v-if="!item.InstallNow && item.NextDayArrival">
                      </span>
                      <!-- 马上装 -->
                      <span class="msz">
                        <img v-lazy="{src:msz}" v-if="item.InstallNow">
                      </span>
                    </div>
                    <div class="itemInfo">
                      <div class="allPingjia">评分<span v-text="item.CommentRate"></span>
                      </div>
                      <div class="allOrder">单数<span v-text='item.InstallQuantity'></span>
                      </div>
                    </div>
                    <div class="redselect selected" @click.stop="changeShop(item)" v-if='index === 0 &&  hasDefalutShop'>
                      已选择
                    </div>
                    <div class="redselect" v-else @click.stop="changeShop(item)">选择</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      	</tuhu-infinite>
      </div>
    </div>
    <tuhu-gotop :scrollid="scrollId"></tuhu-gotop>
  </div>
</template>
<script>
import wxc from '../../imgs/shops/wxc.png'
import crd from '../../imgs/shops/crd.png'
import gcd from '../../imgs/shops/gcd.png'
import kxd from '../../imgs/shops/kxd.png'
import msz from '../../imgs/shops/msz.png'
import mfjc from '../../imgs/shops/mfjc.png'
export default {
  data() {
    return {
      shopData: false,
      locate: false, // 地理位置
      car: false, // 车型信息
      scrollId: tuhu.util.getScrollId(),
      selected: false, // 是否选择，选择后pageback
      areas: [],
      tabsSelectedType: '',
      ShopClassifications: [], // 门店所有种类
      selectedShopTypes: [], // 被选择的门店种类，暂时存放最终会放入 fetchParams 中
      shopList: [], // 门店列表
      TotalPage: 1,
      nodata: false,
      end: false,
      wxc: wxc,
      crd: crd,
      gcd: gcd,
      kxd: kxd,
      mfjc: mfjc,
      msz: msz,
      // hasDefalutShop: false,
      // activityId 保养定价
      // 612 & 512  === 512 为工厂店
      // options: {
      //   shopData: {'serviceType': 1, 'pids': 'FU-TUHU-LUTAI|1', 'activityId': '', callBack: () => {}}
      // },
      sort: [{
        text: '默认排序',
        sort: 'HuShi',
        select: true
      }, {
        text: '附近优先',
        sort: '',
        select: false
      }],
      fetchParams: {
        pageIndex: 1, // * 页数
        Ismatchregion: 0, // 当前定位地址 和 选择的地址是否一样
        shopClassification: [], // * 门店种类们
        city: '', // *
        province: '', // *
        district: '', // *
        latBegin: '', // *
        lngBegin: '', // *
        serviceType: 1,  // 传入 门店类型
        pageSize: 10, // *
        pids: '', // 传入
        activityId: '', // 传入
        sort: 'HuShi', // 默认排序
        brands: '', // * 筛选品牌类型，暂时不写
        vehicleId: '', // * 车型信息
        shopId: '' // 传入 默认门店id
      },
      resolve: () => {}
    }
  },
  watch: {
    fetchParams: {
      handler(value, oldValue) {
        let isRefersh = true
        // // this.end = false
        if (value.pageIndex !== oldValue.pageIndex) {
          isRefersh = false
        }
        if (value.pageIndex === 1) {
          isRefersh = true
        }
        if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
          this.getShopList(isRefersh)
        }
      },
      deep: true
    },
    sort: {
      handler(value, oldValue) {
        let _sort = value.filter((element, index) => {
          return element.select
        })[0]
        this.fetchParams = {
          ...this.fetchParams,
          sort: _sort.sort,
          pageIndex: 1
        }
      },
      deep: true
    }
  },
  filters: {
    fliterLocateNull(value) {
      if (value.replace(/\s/g, '') === '') {
        return '定位中'
      } else {
        return value
      }
    },
    filterDistance(value) {
      if (value === undefined) {
        value = 0
      }
      return value.toFixed(2) + 'km'
    }
  },
  computed: {
    cityTabTitle() {
      if (this.fetchParams.district === '') {
        return this.fetchParams.city
      } else {
        return this.fetchParams.district
      }
    },
    locateName() {
      if (this.fetchParams.province === this.fetchParams.city) {
        return `${this.fetchParams.city} ${this.fetchParams.district}`
      } else {
        return `${this.fetchParams.province} ${this.fetchParams.city} ${this.fetchParams.district}`
      }
    },
    hasDefalutShop() {
      if (this.shopData) {
        return this.shopData.shopId ? this.shopData.shopId : false
      } else {
        return false
      }
    },
    // 显示市还是区
    sortTabTitle() {
      return this.sort.filter((element, index) => {
        return element.select
      })[0].text
    }
  },
  created () {
    let shopData = this.options.shopData
    this.shopData = shopData
    this.fetchAll()
  },
  beforeDestroy() {
    // 不选择直接返回，并不返回第一个门店信息
    // if (!this.selected) {
    //   this.options.callBack(this.shopList[0])
    // }
  },
  methods: {
    handelClickCover(e) {
      if (e.target.classList.value.indexOf('Typelist') !== -1) {
        this.resetTabsSelectedType()
      }
    },
    autoNavigate(item) {
      if (tuhu.autoNavigate) {
        // 点击跳转至门店暂时隐藏
        // tuhu.autoNavigate(item)
      }
    },
    async fetchAll() {
      this.getSelectOptions()
      await this.getLocate()
      await this.getShopArea()
      await this.getDefaultCar()
      // await this.getShopList(true)
      this.fetchParams = {
        ...this.fetchParams,
        city: this.locate.city || '',
        province: this.locate.province || '',
        district: this.locate.district || '',
        latBegin: this.locate.latitude || '',
        lngBegin: this.locate.longitude || '',
        serviceType: this.shopData ? this.shopData.serviceType : 1,
        products: this.shopData ? this.shopData.products : '',
        pids: this.shopData ? this.shopData.pids : '',
        activityId: this.shopData ? this.shopData.activityId : '',
        shopId: this.shopData ? this.shopData.shopId : '',
        vehicleId: this.car ? this.car.ProductID : ''
      }
    },
    async getLocate() {
      let locate = {}
      if (tuhu.store === undefined) {
        locate = await tuhu.getLocate()
      } else {
        locate = await tuhu.store.state._locationInfo
      }
      this.locate = locate
      return locate
    },
    async getDefaultCar() {
      return tuhu.getDefaultCar(2, false)
        .then((res) => {
          this.car = res
        })
    },
    // 获取地理位置下拉
    async getShopArea() {
      return tuhu.fetch(
        'https://api.tuhu.cn/Shops/SelectBookShopArea',
        {},
        { query: {city: this.locate.city, province: this.locate.province} }
      )
        .then((res) => {
          this.areas = res.Areas
        })
    },
    // 获取门店筛选信息
    async getSelectOptions() {
      tuhu.fetch('https://api.tuhu.cn/Shops/SelectShopCategories')
        .then((res) => {
          this.ShopClassifications = res.Data.ShopClassifications
        })
    },
    // 获取店铺列表
    async getShopList(isRefersh) {
      // if ((this.TotalPage >= this.fetchParams.pageIndex) && this.end === false) {
      tuhu.fetch('https://api.tuhu.cn/Shops/SelectBookShops', {
        // method: 'POST',
        // body: JSON.stringify({
        //   ...this.fetchParams,
        //   shopClassification: this.fetchParams.shopClassification.join(';')
        // })
      }, {
        query: {
          ...this.fetchParams,
          shopClassification: this.fetchParams.shopClassification.join(';')
        }
      })
        .then((res) => {
          this.TotalPage = res.TotalPage
          // 有默认门店
          if (this.hasDefalutShop && this.fetchParams.pageIndex === 1) {
            res.Shops.unshift(res.SelectShop)
          }
          // 是否刷新
          if (isRefersh) {
            this.shopList = res.Shops
          } else {
            this.shopList.push(...res.Shops)
          }
          // 是否第一次就结束
          if (!(res.TotalPage > this.fetchParams.pageIndex)) {
            this.end = true
          } else {
            this.end = false
          }
          this.resolve()
        })
    },
    // 点击选择更换门店
    changeShop (shop) {
      if (!shop.IsSuspend) {
        this.selected = true
        this.options.callBack(shop)
        tuhu.navigateBack({
          delta: tuhu.getCurrentPages().reduce((sum, item) => {
            return sum + (item.path.indexOf('/pages/_shops/selectShopList') > -1 ? 1 : 0)
          }, 0)
        })
      } else {
        tuhu.toast('本店暂停营业，暂不支持下单，敬请谅解')
      }
    },
    // 滚动
    oninfinite(ev, resolve, reject) {
      if (this.TotalPage > this.fetchParams.pageIndex) {
        this.fetchParams = {
          ...this.fetchParams,
          pageIndex: this.fetchParams.pageIndex + 1
        }
      } else {
        this.end = true
      }
      this.resolve = resolve
    },

    resetTabsSelectedType() {
      this.tabsSelectedType = ''
    },
    resetTypeButton() {
      this.fetchParams = {
        ...this.fetchParams,
        pageIndex: 1,
        shopClassification: []
      }
      this.selectedShopTypes = []
      this.resetTabsSelectedType()
    },
    submitTypeButton() {
      this.fetchParams = {
        ...this.fetchParams,
        pageIndex: 1,
        shopClassification: this.selectedShopTypes
      }
      this.resetTabsSelectedType()
    },
    isCitySelected(value) {
      if (this.fetchParams.district === '') {
        return this.fetchParams.city === value.Region
      } else {
        return this.fetchParams.district === value.Region
      }
    },
    handleClickTabsItem(e) {
      if (this.tabsSelectedType === '') {
        this.tabsSelectedType = e
      } else if (this.tabsSelectedType === e) {
        this.resetTabsSelectedType()
      } else {
        this.tabsSelectedType = e
      }
    },
    handleClickType(type) {
      let _types = [...this.selectedShopTypes]
      // 不存在
      if (_types.indexOf(type) === -1) {
        _types.push(type)
      } else {
        _types.splice(_types.indexOf(type), 1)
      }
      // this.$set(this.fetchParams, 'shopClassification', _types)
      this.selectedShopTypes = _types
    },
    handleClickCity(city) {
      if (city === this.fetchParams.city) {
        // 点击城市
        this.fetchParams = {
          ...this.fetchParams,
          pageIndex: 1,
          district: ''
        }
      } else {
        // 点击区
        this.fetchParams = {
          ...this.fetchParams,
          pageIndex: 1,
          district: city
        }
      }
      this.resetTabsSelectedType()
    },
    handleClickSort(sort) {
      this.resetTabsSelectedType()
      let _index = 0
      this.sort.forEach((element, index) => {
        if (element.sort === sort) {
          _index = index
        }
      })
      let _sort = this.sort.map((item, index) => {
        let _item = {...item}
        if (index === _index) {
          _item.select = true
        } else {
          _item.select = false
        }
        return _item
      })
      this.sort = _sort
    }
  }
}
</script>
<style scoped lang="less">
.block {
  display: block
}
.none {
  visibility: hidden
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

img {
  border: 0;
  padding: 0;
  margin: 0;
  display: block;
}
p{
	margin: 0;
}
a {
  text-decoration: none;
  outline: none;
}

li {
  list-style: none;
}

body {
  height: 100%;
  width: 100%;
  line-height: normal;
  font-family: "微软雅黑";
  margin: 0 auto;
  max-width: 630px;
}

input::-moz-focus-inner,
textarea::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input,
textarea {
  border: 0;
  line-height: normal;
  outline: none;
  -webkit-appearance: none;
}

input::-webkit-input-placeholder {
  font-size: 0.7rem;
  color: rgba(153, 153, 153, 1);
}

input::-moz-placeholder {
  font-size: 0.7rem;
  color: rgba(153, 153, 153, 1);
}

.weui-cell {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0px;
    border-top: 1px solid rgba(217, 217, 217, 1);
    color: rgba(217, 217, 217, 1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

.weui-cell {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    color: #f6f6f6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

._content {
  background-color: rgba(238, 238, 238, 1);
}

.shopWrap {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  .tabsList {
    height: 2.2rem;
    z-index: 10;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.65rem;
    color: rgba(51, 51, 51, 1);
    .tabsItem {
      width: 33.33%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100% ;
      .tabTitle{
      	span {
	        width: 5.2rem;
	        display: inline-block;
          text-align: center;
          margin-right: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 75%;
	      }
	      i {
	        background: url(../../imgs/down.png) no-repeat;
	        background-size: contain;
	        height: 0.35rem;
	        width: 0.65rem;
	        display: inline-block;
	      }

      }
      .arealist,.Typelist,.shopsortlist{
      	position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 2.2rem;
		    left: 0;
		    background: #fff;
		    background-color: rgba(0,0,0,0.5);
		    z-index: 10;
        .TypeExpanded{
          background-color: #fff;
          .shopType{
            margin:0 0.75rem;
            height:2.1rem;
            line-height:2.1rem;
            font-size: 0.7rem;
            color: rgba(51, 51, 51, 1);
            .weui-cell;
          }
          ul{
            padding:0 0.75rem;
            display:flex;
            justify-content:space-between;
            flex-wrap:wrap;
            li{
              margin-bottom:0.5rem;
              height: 1.6rem;
              width: 5.4rem;
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 2px;
              font-size: 0.65rem;
              color: rgba(102, 102, 102, 1);

              line-height:1.6rem;
              text-align:center;
              i{
                font-style:normal;
              }
              &.selected{
                border: 1px solid rgba(223, 51, 72, 1);
                color:rgba(223, 51, 72, 1);
              }
            }
          }
          .typeButton{
            display:flex;
            align-items:center;
            justify-content:space-between;
            height: 2.4rem;
            line-height:2.4rem;
            text-align:center;
            background-color: rgba(253, 253, 253, 1);
            font-size: 0.85rem;
            color: rgba(51, 51, 51, 1);
            position:relative;
            margin-top:2.5rem;
            .reset{
              width:50%;
              flex:1;
            }
            .submit{
              width:50%;
              flex:1;
              color: rgba(255, 255, 255, 1);
              background-color: rgba(223, 52, 72, 1);
            }
            &::before {
              content: " ";
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              height: 0px;
              border-top: 1px solid rgba(217, 217, 217, 1);
              color: #f6f6f6;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
            }
          }
        }
				.areaExpanded,.shopsortExpanded{
				    overflow-y: scroll;
				    overflow-x: hidden;
				    background-color: #fff;
				    max-height: 21rem;
				    ul{
				    	padding-left: 0.75rem;
				    	li{
				    		font-size: 0.6rem;
								color: rgba(51, 51, 51, 1);
				    		height: 2.1rem;
				    		line-height: 2.1rem;
				    		padding-right: 0.7rem;
				    		display: flex;
				    		flex-direction: row;
				    		justify-content: space-between;
				    		i{
				    			font-style: normal;
				    		}
				    		span{
				    			font-size: 0.6rem;
									color: rgba(102, 102, 102, 1);
				    		}
				    		&.myArea,&.selected{
				    			color: rgba(223, 52, 72, 1);
				    			span{
				    				color: rgba(223, 52, 72, 1);

				    			}

				    		}
				    		.weui-cell;
				    		&:before{
				    			border-bottom: 1px solid rgba(217, 217, 217, 1)
				    		}
				    	}
				    }
				    &.shopsortExpanded{
				    	ul{
				    		li{
				    			&.selected{

				    				&:after{
				    					position: absolute;
				    					content: '';
				    					background: url(../../imgs/selectedtb.png) no-repeat;
				    					background-size: contain;
				    					width: 0.5rem;
				    					height: 0.7rem;
				    					right: 0.8rem;
				    					top: 0.85rem;
				    				}
				    			}
				    		}
				    	}
				    }
				}
      }
      .shoplist{
    		position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 2.2rem;
		    left: 0;
		    background: #fff;
		    background-color: rgba(0,0,0,0.5);
		    z-index: 10;
		    display: flex;
		    flex-direction: row;
		    .leftcategory{
		    	width: 4.8rem;
		    	height: 13.4rem;
		    	background-color: rgba(239, 239, 239, 1);
		    	ul{

		    		li{
		    			height: 2.2rem;
		    			display: flex;
		    			align-items: center;
		    			justify-content: center;
		    			font-size: 0.6rem;
							color: rgba(153, 153, 153, 1);
							position: relative;
							&:last-child{
								&:before{
									display: none;
								}
							}
							&.selected{
								background-color: #FFFFFF;
								span{
									position: absolute;
									left: 0;
									top: 0;
									height: 100%;
									width: 0.15rem;
									background-color: rgba(243, 124, 62, 1);
								}
								&:before{
									display: none;
								}
							}
							&.meirong{
								&:after{
									content: '';
									background: url(../../imgs/arrow.png) no-repeat;
					        background-size: contain;
					        height: 0.5rem;
					        width: 0.3rem;
					        right: 0.5rem;
					        top: 0.85rem;
					        position: absolute;
								}
								&.selected{
									&:after{
									content: '';
									background: url(../../imgs/redarrow.png) no-repeat;
					        background-size: contain;
					        }
								}
							}
		    			&::before {
						    content: " ";
						    position: absolute;
						    left: 0.6rem;
						    bottom: -2px;
						    right: 0;
						    height: 0px;
						    border-bottom: 1px solid rgba(217, 217, 217, 1);
						    color: #f6f6f6;
						    -webkit-transform-origin: 0 0;
						    transform-origin: 0 0;
						    -webkit-transform: scaleY(0.5);
						    transform: scaleY(0.5);
						  }
		    		}
		    	}
		    }
		    .rightproject{
		    	flex: 1;
		    	height: 13.4rem;
		    	width: calc(100%-4.8rem);
		    	background-color: #FFFFFF;
		    	overflow-y: auto;
		    	ul{
		    		padding-left:0.75rem;

		    		li{

		    			height: 2.2rem;
		    			display: flex;
		    			align-items: center;
		    			justify-content: flex-start;
		    			font-size: 0.6rem;
							color: rgba(153, 153, 153, 1);
							padding-left: 0.6rem;
							position: relative;
							&:last-child{
								&:before{
									display: none;
								}
							}
							&.selected{
								color: #DF3348;
								}
		    			.weui-cell;
		    		}
		    	}
		    }
      }
      &.selected{
      	.tabTitle{
      		color: rgba(223, 52, 72, 1);
	      	i{
	      		background: url(../../imgs/up.png) no-repeat;
	        	background-size: contain;
	      	}
      	}

	      }
      &:after {
        content: " ";
        position: absolute;
        top: 0.6rem;
        bottom: 0;
        right: 0;
        width: 1px;
        height: 1rem;
        background-color: rgba(217, 217, 217, 1);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
      }
      &:nth-last-of-type(1){
        &:after{
          display: none;
        }
      }
    }
    .weui-cell;
  }
  .locateAdd{
      z-index: 9;
      width: 100%;
      height: 2rem;
      background-color: #fff;
      padding: 0 0.5rem 0 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left:1.7rem;
      position:relative;
      .locate{
        font-size: 0.65rem;
        color: rgba(102, 102, 102, 1);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        -webkit-line-clamp: 1;
        white-space: nowrap;
        -webkit-box-orient: vertical;
        margin-right: 0.5rem;
      }
      &:after{
        content: '';
          position:absolute;
          background: url(../../imgs/lacation.png) no-repeat center;
          background-size: contain;
          height: 0.85rem;
          width: 0.6rem;
          top: 0.6rem;
          left: 0.6rem;
      }
      .weui-cell;
    }
  .scrollContent {
    flex: 1;
    overflow-y: auto;
    .shopList {
      padding-top: 4rem;
      ul {

        li {
          padding: 0 0 0 0.5rem;
          .shopItem {
            padding: 0.75rem 0 0.75rem 0;
            display: flex;

            .leftImg {
              margin-right: 0.5rem;
              width: 3.2rem;
              height: 3.2rem;
              img {
                width: 3.2rem;
                height: 3.2rem;
              }
              &.kaiye,&.zanting{
              	position:relative;
              	&:before{
	              	content: '';
                  position:absolute;
                  background: url(../../imgs/ky.png) no-repeat center;
                  background-size: 2.4rem 2.4rem;
                  background-color: rgba(255,255,255,0.3);
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
	              }
	              &.zanting{
	              	&:before{
	              		background: url(../../imgs/zanting.png) no-repeat center;
	              		background-color: rgba(255,255,255,0.3);
	              		background-size: 2.4rem 2.4rem;
	              	}
	              }
              }
            }
            .rightText {
              flex: 1;
              position:relative;
              .shopTitle {
                height: 0.8rem;
                line-height: 0.8rem;
                display: flex;
                justify-content: space-between;
                padding-right: 0.5rem;
                .name {
                	flex: 1;
                  font-size: 0.75rem;
                  font-weight: 500;
                  color: rgba(51, 51, 51, 1);
                  width: 10.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: keep-all;
                  white-space: nowrap;
                  margin-right: 0.5rem;
                }

              	.distance {
                  font-size: 0.55rem;
                  color: rgba(243, 124, 62, 1);
                }
              }
              .itemInfo {
                height: 0.6rem;
                line-height: 0.6rem;
                display: flex;
                flex-direction: row;
                margin-top: 0.5rem;
                padding-right: 0.5rem;

                .allPingjia {
                  font-size: 0.55rem;
                  color: rgba(102, 102, 102, 1);
                  margin-right: 1rem;
                  position: relative;
                  span {
                    margin-left:0.1rem;
                  }
                  &:after {
                    content: " ";
                    position: absolute;
                    top: 0.1rem;
                    bottom: 0;
                    right: -0.5rem;
                    width: 1px;
                    height: 0.5rem;
                    background-color: rgba(205, 205, 205, 1);
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                    -webkit-transform: scaleX(0.5);
                    transform: scaleX(0.5);
                  }
                }
                .allOrder {
                  font-size: 0.55rem;
                  color: rgba(102, 102, 102, 1);
                  span {
                    margin-left: 0.2rem;
                  }
                }
                .nopingjia{
                	font-size: 0.55rem;
									color: rgba(153, 153, 153, 1);
                }
              }
              .address {
                display: flex;
                justify-content: space-between;
                margin-top: 0.3rem;
                margin-bottom: 0.3rem;
                padding-right: 0.5rem;
                .addInfo {
                	flex: 1;
                  font-size: 0.60rem;
                  color: rgba(102, 102, 102, 1);
                  width: 10.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: keep-all;
                  white-space: nowrap;
                  margin-right: 0.5rem;
                }
              }
              .tags{
                display: flex;
                span{
                  background-repeat: no-repeat;
                  background-size: 100%;
                  background-position: center;
                  margin-right: 0.2rem;
                  display: block;
                  img{
                    height: 0.6rem;
                  }
                  &.gcd,&.kxd,&.wxc,&.crd,&.msz{
                    img{
                      width:1.75rem;
                    }

                  }
                  &.mfjc{
                    img{
                      width:2.8rem;
                    }
                  }
                }
              }
              .redselect{
                position:absolute;
                height: 0.9rem;
                line-height:0.8rem;
                width: 2.5rem;
                text-align:center;
                color:rgba(223, 51, 72, 1);
                border: 1px solid rgba(223, 51, 72, 1);
                border-radius: 2px;
                font-size: 0.5rem;
                right:0.75rem;
                bottom:0;
                &.selected{
                  color:rgba(255, 255, 255, 1);
                  background-color: rgba(223, 51, 72, 1);
                }
              }
            }
          }

          .weui-cell;
        }
      }
    }

  }
}

</style>
