<template>
	<!--洗车,美容打蜡有价格price,轮胎和保养有星级和虎直星
		美容和门店分别有不同的中间和排序tab，门店排序
	-->
  <div class="_content">
    <div class="shopWrap">
      <div class="tabsList">
        <div :class="'tabsItem area' + (tabIndex === 0 ? ' selected' : '')">
          <div @click="selectShop(0)" class="tabTitle"><span v-text="selectArea"></span><i></i></div>
          <div class="arealist" @click="hideTabs" v-show="shows[0]">
          	<div class="areaExpanded">
          		<ul>
                <template v-for="(item, index) in areaList">
          			  <li @click="handleSelectArea(item)" :key="index" v-if="index === 0" class="myArea"><i v-text="item.Region"></i><span><em>我的位置</em>{{item.Count}}</span></li>
                  <li @click="handleSelectArea(item)" :key="index" v-else><i v-text="item.Region"></i><span v-text="item.Count"></span></li>
                </template>
          		</ul>
          	</div>
          </div>
        </div>
        <div :class="'tabsItem arealist' + (tabIndex === 1 ? ' selected' : '')">
          <div class="tabTitle" @click="selectShop(1)"><span v-text="serviceName"></span><i></i></div>
          <!--门店浮层-->
          <div class="shoplist" v-show="shows[1]">
          	<div class="leftcategory">
          		<ul>
                <li @click="handleSelectCate(item)" v-for="(item, index) in shopsName" :key="index" :class="(item.serviceType - 0 === 4 || item.serviceType - 0 === 7) ? 'meirong selected' : ''"><span></span>{{item.name}}</li>
          			<!-- <li class=""><span></span>全部门店</li>
          			<li class="meirong selected"><span></span>美容门店</li>
          			<li><span></span>轮胎门店</li>
          			<li><span></span>保养门店</li>
          			<li><span></span>安装门店</li>
          			<li><span></span>改装门店</li> -->
          		</ul>
          	</div>
          	<div class="rightproject">
          		<ul v-show="serviceType === 4 || serviceType === 7">
          			<li @click="handleCateChild(item)" v-for="(item, index) in (serviceType === 7 ? beauty : services)" :key="index" v-text="item.ServersName">
          			</li>
          		</ul>
          	</div>
          </div>
        	<!--美容浮层
        	<div class="mrlist">
        		<div class="mrExpanded">
          		<ul>
          			<li class="selected"><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          			<li class=""><i>标准洗车</i></li>
          		</ul>
          	</div>
        	</div>
          -->
        </div>
        <div :class="'tabsItem sort' + (tabIndex === 2 ? ' selected' : '')">
          <div class="tabTitle" @click="selectShop(2)"><span v-text="this.sorts[this.sortIndex].name"></span><i></i></div>
          <!--
          <div class="mrsortlist">
        		<div class="mrsortExpanded">
          		<ul>
          			<li class="selected"><i>智能排序</i></li>
          			<li class=""><i>价格由高到低</i></li>
          			<li class=""><i>价格由低到高</i></li>
          		</ul>
          	</div>
        	</div>
          -->
        	<div class="shopsortlist" v-show="shows[2]">
        		<div class="shopsortExpanded">
          		<ul>
          			<li @click="handleSort(index)" v-for="(item, index) in sorts" :key="index" :class="sortIndex === index ? 'selected' : ''"><i v-text="item.name"></i></li>
          		</ul>
          	</div>
        	</div>
        </div>
      </div>
      <div class="scrollContent">
        <tuhu-infinite :nodata="noData" :end="end" @oninfinite="oninfinite" :distance="100">
                <div class="shopList" slot="content">
                        <ul class="list-container">
                          <li v-for="(item, index) in list" :key="index">
                          <div class="shopItem">
                            <div class="leftImg">
                              <img v-lazy="{src:item.Images[0], width: 3.2}" width="100%" />
                            </div>
                            <div class="rightText">
                              <div class="shopTitle">
                                <span class="name" v-text="item.CarparName"></span>
                                <!--<em class="price">15元</em>-->
                                <div class="marks">
                                  <span class="xing"></span>
                                  <span class="hu"></span>
                                  <span class="zhi"></span>
                                </div>
                              </div>
                              <div class="itemInfo">
                                <div class="rank"><span class="yi"></span></div>
                                <div class="allPingjia">评价<span v-text="item.CommentRate"></span>
                                </div>
                                <div class="allOrder">{{item.InstallQuantity}}<span>单</span>
                                </div>
                              </div>
                              <div class="address">
                                <span class="addInfo" v-text="item.Address"></span>
                                <span class="distance" v-text="item.Distance.toFixed(2) + 'KM'"></span>
                              </div>
                              <div class="activity">
                                <!--<div class="prefer"><i></i><em>限时优惠</em></div>-->
                                <div class="group"><i></i><em>9.9团购洗车</em></div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                </div>
        </tuhu-infinite>

      	<div class="locateAdd">
      		<div class="locate">当前地址：闵行区沪闵路7866号</div>
      		<div class="refresh"><i></i>刷新地址</div>
      	</div>
      </div>
    </div>
  </div>
</template>
<script>
const API_SELECT_AREA = 'https://api.tuhu.cn/Shops/SelectShopListArea'

const API_SELECT_CATEGORIES = 'https://api.tuhu.cn/Shops/SelectShopCategories'

const API_SELECT_LIST = 'https://api.tuhu.cn/Shops/SelectShopList'

export default {
  beforeCreate() {
    tuhu.showIndicator()

    this.allPromise = Promise.all([tuhu.getDefaultCar(2, true), tuhu.getLocate()])
    tuhu.fetch(API_SELECT_CATEGORIES).then((data) => {
      this.services = data.Data.Services
      this.beauty = data.Data.Beauty
    })
  },
  created() {
    this.getArea().then(() => this.getList())
  },
  data() {
    return {
      car: null,
      locate: null,
      noData: false,
      end: false,
      serviceName: '标准洗车',
      pageIndex: 1,
      list: [],
      pids: 4,
      sortIndex: 3,
      tabIndex: -1,
      serviceType: 7,
      shows: {},
      selectArea: '',
      areaList: [],
      cateGories: [],
      beauty: [],
      services: [],
      sorts: [{
        name: '默认排序',
        sort: 'HuShi'
      }, {
        name: '附近优先',
        sort: ''
      }, {
        name: '累计安装',
        sort: 'Install'
      }, {
        name: '评分最高',
        sort: 'Grade'
      }],
      shopsName: [{
        name: '全部门店',
        serviceType: 0
      }, {
        name: '美容门店',
        serviceType: 7
      }, {
        name: '轮胎门店',
        serviceType: 1
      }, {
        name: '保养门店',
        serviceType: 2
      }, {
        name: '安装门店',
        serviceType: 4
      }, {
        name: '改装门店',
        serviceType: 6
      }]
    }
  },
  methods: {
    init() {
      this.shows = {}
      this.list = []
      this.pageIndex = 1
      this.noData = false
      this.end = false
    },
    hideTabs() {
      this.shows = {}
    },
    oninfinite(ev, resolve, reject) {
      this.getList().then((data) => {
        this.end = this.pageIndex > data.TotalPage

        resolve()
      })
    },
    getList() {
      const locate = this.locate
      const car = this.car

      const query = {
        LatBegin: locate.latitude,
        LngBegin: locate.longitude,
        Province: locate.province,
        city: locate.city,
        district: this.selectArea,
        pageIndex: this.pageIndex++,
        serviceType: this.serviceType,
        shopClassification: '',
        sort: this.sorts[this.sortIndex].sort,
        vehicleId: car.ProductID,
        isMatchRegion: 1
      }

      if (this.pids !== null) {
        query.pids = this.pids
      }

      return tuhu.fetch(API_SELECT_LIST, {}, {
        status: false,
        query: query
      }).then((data) => {
        this.list = this.list.concat(data.Shops)
        this.noData = this.list.length < 1
        return data
      })
    },
    handleSort(index) {
      this.init()
      this.sortIndex = index
      this.getList()
    },
    handleSelectCate(item) {
      this.serviceType = item.serviceType - 0

      if (this.serviceType !== 4 && this.serviceType !== 7) {
        this.pids = null
        this.serviceName = item.name
        this.init()
        this.getList()
      }
    },
    handleCateChild(item) {
      this.pids = item.ServiceId - 0
      this.serviceName = item.ServersName
      this.init()
      this.getList()
    },
    handleSelectArea(item) {
      this.init()
      this.selectArea = item.Region

      this.getList()
    },
    getArea() {
      return this.allPromise.then((data) => {
        const [car, locate] = data
        // for test
        locate.district = '闵行区'
        locate.latitude = 31.13670374204165
        locate.longitude = 121.40186784995873

        this.car = car
        this.locate = locate
        tuhu.hideIndicator()

        const query = {
          city: locate.city,
          province: locate.province,
          serviceType: 7,
          pids: 4,
          vehicleId: car.ProductID
        }
        return tuhu.fetch(API_SELECT_AREA, {}, {
          query: query,
          status: false
        }).then((data) => {
          let findIndex = -1
          data.Areas.some((item, index) => {
            if (item.Region === locate.district) {
              findIndex = index
              return true
            }
          })

          if (findIndex > -1) {
            this.areaList = data.Areas.splice(findIndex, 1).concat(data.Areas)
          } else {
            this.areaList = data.Areas
          }
          this.selectArea = this.areaList[0].Region
        })
      }).catch((e) => {
        tuhu.hideIndicator()
      })
    },
    selectShop(index) {
      this.tabIndex = index

      const shows = {}
      if (this.shows[index]) {
        shows[index] = false
      } else {
        shows[index] = true
      }

      this.shows = shows
    }
  }
}
</script>
<style scoped lang="less">
.weui-cell {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0px;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
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
      .tabTitle{
      	span {
	        width: 5.2rem;
	        margin-right: 0.5rem;
	      }
	      i {
	        background: url(../../imgs/down.png) no-repeat;
	        background-size: contain;
	        height: 0.35rem;
	        width: 0.65rem;
	        display: inline-block;
	      }

      }
      .arealist,.mrlist,.mrsortlist,.shopsortlist{
      	position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 2.2rem;
		    left: 0;
		    background: #fff;
		    background-color: rgba(0,0,0,0.5);
		    z-index: 10;
				.areaExpanded,.mrExpanded,.mrsortExpanded,.shopsortExpanded{
				    overflow-y: scroll;
				    overflow-x: hidden;
				    background-color: #fff;
				    max-height: 17.6rem;
				    ul{
				    	padding-left: 0.75rem;
				    	li{
				    		font-size: 0.7rem;
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
				    			font-size: 0.7rem;
									color: rgba(102, 102, 102, 1);
				    		}
				    		&.myArea,&.selected{
				    			color: rgba(223, 52, 72, 1);
				    			span{
				    				color: rgba(223, 52, 72, 1);
				    				em{
				    					font-style: normal;
				    					font-size: 0.6rem;
											color: rgba(223, 52, 72, 1);
											margin-right: 1.2rem;
											position: relative;
											&:after{
												content: '';
												position:absolute;
												top: 0.15rem;
												right: -0.7rem;
												background: url(../../imgs/shops/location.png) no-repeat;
												background-size: contain;
												height: 0.55rem;
												width: 0.55rem;
											}
				    				}
				    			}
				    			&:before{
					    			border-bottom: 1px solid rgba(223, 52, 72, 1);
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
				    					background: url(../../imgs/shops/selectedtb.png) no-repeat;
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
        top: 0;
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
    }
    .weui-cell;
  }
  .scrollContent {
    flex: 1;
    overflow-y: auto;
    .shopList {
      ul {
        padding: 0 0 0 0.5rem;
        li {
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
	              		background: url(../../imgs/shops/zanting.png) no-repeat center;
	              		background-color: rgba(255,255,255,0.3);
	              		background-size: 2.4rem 2.4rem;
	              	}
	              }
              }
            }
            .rightText {
              flex: 1;

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
                em {
                  font-style: normal;
                  font-size: 0.75rem;
                  color: rgba(223, 51, 72, 1);
                }
              	.marks{
          		    height: 0.6rem;
          		    .xing,.hu,.zhi {
								    width: 12px;
								    height: 12px;
								    background: url(../../imgs/xing.png) no-repeat;
								    background-size: contain;
								    display: inline-block;
								    &.hu{
								    	background: url(../../imgs/hu.png) no-repeat;
								    	background-size: contain;
								    }
								    &.zhi{
								    	background: url(../../imgs/zhi.png) no-repeat;
								    	background-size: contain;
								    }
								  }
              	}
              }
              .itemInfo {
                height: 0.6rem;
                line-height: 0.6rem;
                display: flex;
                flex-direction: row;
                margin-top: 0.5rem;
                padding-right: 0.5rem;
                .rank{
                	margin-right:0.3rem;
                	.yi,.er,.san,.si,.wu{
                		width: 1.6rem;
								    height: 0.6rem;
								    background: url(../../imgs/yiji.png) no-repeat;
								    background-size: contain;
								    display: inline-block;
                	}
                }
                .allPingjia {
                  font-size: 0.55rem;
                  color: rgba(102, 102, 102, 1);
                  margin-right: 1rem;
                  position: relative;
                  span {
                    color: rgba(243, 124, 62, 1);
                  }
                  &:after {
                    content: " ";
                    position: absolute;
                    top: -0;
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
                margin-top: 0.5rem;
                padding-right: 0.5rem;
                .addInfo {
                	flex: 1;
                  font-size: 0.55rem;
                  color: rgba(102, 102, 102, 1);
                  width: 10.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: keep-all;
                  white-space: nowrap;
                  margin-right: 0.5rem;
                }
                .distance {
                  font-size: 0.55rem;
                  color: rgba(191, 191, 191, 1);
                }
              }
              .activity {
                margin-top: 0.5rem;
                .prefer,.group {
                  display: flex;
                  align-items: center;
                  padding-top: 0.5rem;
                  position:relative;
                  i {
                    height: 0.8rem;
                    width: 0.8rem;
                    display: inline-block;
                    background: url(../../imgs/hui.png) no-repeat;
                    background-size: contain;
                  }
                  em {

                    font-style: normal;
                    font-size: 0.5rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    text-align: center;
                    padding: 0 0.1rem;
                    border: 1px solid rgba(71, 171, 15, 1);
                    color: rgba(71, 171, 15, 1);
                    border-left: none;
                    border-radius: 0 3px 3px 0;
                  }
                	&::before {
								    content: " ";
								    position: absolute;
								    left: 0;
								    top: 0;
								    right: 0;
								    height: 0px;
								    border-top: 1px solid rgba(238, 238, 238, 1);
								    color: #f6f6f6;
								    -webkit-transform-origin: 0 0;
								    transform-origin: 0 0;
								    -webkit-transform: scaleY(0.5);
								    transform: scaleY(0.5);
								  }
								  &.group {
	                  i {
	                    background: url(../../imgs/tuan.png) no-repeat;
	                    background-size: contain;
	                  }
	                  em {
	                    margin-left: 0.3rem;
	                    font-size: 0.55rem;
	                    font-style: normal;
	                    color: rgba(153, 153, 153, 1);
	                    border: 0;
	                  }
	                }
                }

              }
            }
          }

          .weui-cell;
        }
      }
    }
    .locateAdd{
    	z-index: 5;
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	width: 100%;
    	height: 2rem;
			background-color: rgba(253, 255, 223, 1);
			padding: 0 0.5rem 0 0.75rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.locate{
				font-size: 0.65rem;
				color: rgba(102, 102, 102, 1);
				flex: 1;
				overflow: hidden;
	      text-overflow: ellipsis;
	      word-break: keep-all;
	      white-space: nowrap;
	      margin-right: 0.5rem;
			}
			.refresh{
				font-size: 0.65rem;
				color: rgba(245, 124, 51, 1);
				display: flex;
				align-items: center;
				i{
					height: 0.65rem;
	        width: 0.7rem;
	        display: inline-block;
	        background: url(../../imgs/exchange.png) no-repeat;
	        background-size: contain;
	        margin-right: 0.3rem;
				}
			}
    }
  }
}

</style>
