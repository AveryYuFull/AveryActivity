<template>
  <div class="_content" style="margin-top:0px;">
    <div class="cartWrap">
      <!--<div class="tishi">加入购物车成功</div>-->
      <!-- 是否确定删除浮层 -->
      <!--<div class="deletePrompt" style="display:none;">
        <div class="bg"></div>
        <div class="promptContent">
          <div class="top">确认删除？</div>
          <div class="btns">
            <span class="cancel">取消</span>
            <span class="confirm">确认</span>
          </div>
        </div>
      </div>-->
      <!--<div class="limitTip showit">购买数量不能超过1件</div>--> <!-- 添加类名showit，将向左动画显示！！！！！！！ -->
      <div class="cartContent">
        <!-- 购物车有东西 -->
        <div class="productList" v-if="!cartList || cartList.length > 0">
          <div :class="item.IsDisabled? 'item disabled' :'item'" v-for="(item, index) in cartList" :key="item.ItemId">
            <div class="itemDetail">
              <tuhu-swipeout :status="status" @onDelete="onDelete(item, index)">
                <div>
                  <div @click="choose(index)" :class="{choose: true, notchoose: !checks[index]}"></div>
                  <a href="javascript:;" class="pdImg" @click="navigate(item)">
                    <img v-lazy="{src: item.ImageUrl, width: 3.75}" />
                  </a>
                  <div class="rightInfo">
                    <a class="pdName" @click="navigate(item)" v-text="item.DisplayName"></a>
                    <div class="limit" v-if="item.ActivityId && item.PurchasingNum">
                      <span class="hdsp">活动商品</span>
                      <span class="xg">限购{{item.PurchasingNum}}件</span>
                    </div>
                    <div class="price">
                      <span class="small">¥</span>
                      <span v-text="item.ProductPrice"></span>
                    </div>
                    <div class="quantitybtn">
                      <tuhu-linenumber :scope="[1, item.PurchasingNum || 9999]" @change="change(item, index)" :number.sync="numbers[index]"></tuhu-linenumber>
                    </div>
                  </div>
                </div>
              </tuhu-swipeout>
            </div>
            <div class="otherInfo" v-if="item.ServiceName || item.InstallShopName || item.VehicleId">
              <div class="serviceList">
                <div class="txt" v-if="item.ServiceName">
                  服务：{{item.ServiceName}} | ¥{{item.ServicePrice}}×{{item.Amount}}
                </div>
                <div class="txt" v-if="item.InstallShopName">
                  门店：{{item.InstallShopName}}
                </div>
                <div class="txt" v-if="item.VehicleId">
                 车型：{{item.VehicleName || ''}} {{item.Displacement || ''}} {{item.Year || ''}} {{item.SalesName || ''}}
                </div>
              </div>
              <!--
              <div class="gift">
                <div class="giftItem">
                  <span class="zeng"></span>
                  <span class="txt">这里是赠品信息这里是赠品信息这里是赠品信息</span>
                </div>
                <div class="giftItem">
                  <span class="zeng"></span>
                  <span class="txt">这里是赠是赠品信息</span>
                </div>
              </div>
              -->
            </div>
          </div>
          <!--
          <div class="item">
            <div class="itemDetail">
              <tuhu-swipeout @onButtonClick="onButtonClick">
                <div>
                  <div class="choose notchoose"></div>
                  <a href="javascript:;" class="pdImg">
                    <img src="../../imgs/pdimg.jpg" />
                  </a>
                  <div class="rightInfo">
                    <a href="javascript:;" class="pdName">车志酷/carzkool四合一车载吸尘器车志酷/carzkool四合一车载吸尘器</a>
                    <div class="limit">
                      <span class="hdsp">活动商品</span>
                      <span class="xg">限购2件</span>
                    </div>
                    <div class="price">
                      <span class="small">¥</span>
                      <span>568.00</span>
                    </div>
                    <div class="quantitybtn">
                      <tuhu-linenumber :modify="btnContrl"></tuhu-linenumber>
                    </div>
                  </div>
                </div>
              </tuhu-swipeout>
            </div>
          </div>
          <div class="item disabled">
            <div class="itemDetail">
              <tuhu-swipeout @onButtonClick="onButtonClick">
                <div>
                  <div class="choose"></div>
                  <a href="javascript:;" class="pdImg">
                    <img src="../../imgs/pdimg.jpg" />
                  </a>
                  <div class="rightInfo">
                    <a href="javascript:;" class="pdName">车志酷/carzkool四合一车载吸尘器车志酷/carzkool四合一车载吸尘器</a>
                    <div class="sorry">对不起，宝贝已失效了</div>
                  </div>
                </div>
              </tuhu-swipeout>
            </div>
          </div>
          -->
          <div class="clearBox" v-if="hasDisabled">
            <div class="clearBtn" @click="clearAllDisabled">清空失效宝贝</div>
          </div>
          <div class="deleteTip">
            <span>向左滑动可删除商品</span>
          </div>
        </div>
        <!-- 购物车是空的情况，底部的footer也需要去掉 -->
        <div class="noProduct" v-else>
          <img src="../../imgs/nothing.png" class="noImg" />
          <span>购物车是空的</span>
          <a @click="goToBuy()" class="shopBtn">去逛逛</a>
        </div>
        <div class="recommend">
          <div class="tophead">
            <span>猜你喜欢</span>
          </div>
          <div class="recProduct">
            <div v-for="(item, index) in loveList" :key="index" class="productItem" @click="navigate(item)">
              <a class="pdImg">
                <img v-lazy="{src: item.ProductImages, width: 8}" />
                <span class="pdName" v-text="item.DisplayName"></span>
              </a>
              <div class="bottom">
                <div class="price">
                  <span class="small">¥</span>
                  <span v-text="item.Price"></span>
                </div>
                <div class="addBtn" @click.stop="addCart(item)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="!cartList || cartList.length > 0">
        <div @click="chooseAll" :class="{all: true, notall: notall}">全选</div>
        <div class="total">
          <span>合计:</span>
          <span class="amount" v-cloak>¥{{total.toFixed(2)}}</span>
        </div>
        <div class="btn" v-cloak @click="send">去结算({{totalNumber}})</div>
      </div>
    </div>
  </div>
</template>

<script>
const USER_SELECT_API = 'https://api.tuhu.cn/User/SelectTogetherZoneNew'

const CART_LIST_API = 'https://api.tuhu.cn/Cart/GetCartDetail?channel=kH5'

const CART_DELETE_API = 'https://api.tuhu.cn/Cart/RemoveCartItem'

const CART_ADD_API = 'https://api.tuhu.cn/Cart/AddCartItem'

const CART_PAYED_API = 'https://api.tuhu.cn/Cart/RemoveCartItem'

const CART_UPDATE_API = 'https://api.tuhu.cn/Cart/BatchModifyCartItem'

let payedIds = []

let pageInstance = null

class Cart {
  async deletePayed() {
    if (payedIds.length < 0) {
      return
    }

    return tuhu.fetch(CART_PAYED_API + '?itemIds=' + payedIds.join(','), {
      method: 'post'
    }).then((data) => {
      pageInstance.init()
    })
  }

  async getList() {
    const userInfo = await tuhu.getUserInfo({
      force: true
    })
    if (!userInfo.islogin) {
      return null
    }

    const data = await tuhu.fetch(CART_LIST_API)

    return data.CartDetail.ItemList
  }

  async getTotal() {
    const userInfo = await tuhu.getUserInfo()
    if (!userInfo.islogin) {
      return 0
    }
    const data = await this.getList()

    let number = 0
    data.forEach((item, index) => {
      if (!item.IsDisabled) {
        number += item.Amount - 0
      }
    })

    return number
  }

  async addItem(item) {
    // const userInfo = await tuhu.getUserInfo()
    const addItem = await tuhu.fetch(CART_ADD_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        str: JSON.stringify(item)
      })
    })

    tuhu.toast(addItem.Message)

    return addItem
  }
}

const instance = new Cart()

// tuhu.cart.addItem({"ActivityId":"86759850-3409-4475-bdc8-c06b0673050d","Pid":"AP-VICTION-T7|4","Amount":2,"CurrentPrice":569,"ExtObject":{"InstallShopId":11727,"InstallShopName":"途虎养车工场店（莲花路店）","ServiceId":"FU-WZTT-AZ|","ServiceName":"免费安装"}})
// tuhu.cart.getTotal()
tuhu.cart = instance

export default {
  beforeCreate() {
  },
  beforeDestroy() {
    payedIds = []
  },
  created() {
    pageInstance = this

    this.init()
  },
  watch: {
    // numbers(arr, old) {
    //   console.log(333, this.cartList, arr, old)
    //   // const result = []
    //   arr.forEach((item, index) => {

    //   })
    //   debugger
    // }
  },
  computed: {
    total() {
      let sum = 0
      let number = 0
      this.cartList && this.cartList.forEach((item, index) => {
        if (this.checks[index] && !item.IsDisabled) {
          number += this.numbers[index]
          sum += this.numbers[index] * (parseFloat(item.ProductPrice) + parseFloat(item.ServicePrice))
        }
      })

      this.totalNumber = number
      return sum
    },
    notall() {
      return this.checks.some((val) => {
        if (!val) {
          return true
        }
      })
    },
    hasDisabled() {
      if (this.cartList) {
        return this.cartList.some((v) => {
          if (v.IsDisabled) {
            return true
          }
        })
      }
      return false
    }
  },
  data() {
    return {
      status: 0,
      cartList: null,
      loveList: [],
      numbers: [],
      checks: [],
      number: 0
    }
  },
  methods: {
    goToBuy() {
      // location.href = location.href.replace(/\/pages\/.+$/, '/pages/home/index?_project=' + tuhu.getParam('_project') + '&_channel=' + tuhu.getParam('_channel'))
      tuhu.switchTab({
        url: '/pages/home/index'
      }, {
        tabIndex: 0
      })

      setTimeout(() => {
        tuhu._layout.switchTab(0)
      }, 500)
    },
    init() {
      instance.getList().then((data) => {
        const pids = []
        this.cartList = data

        this.cartList.forEach((item, index) => {
          this.numbers[index] = item.Amount - 0
          this.checks[index] = true
          pids.push(item.Pid + '|' + item.Vid)
        })
        return pids
      }).then((pids) => {
        return tuhu.fetch(USER_SELECT_API, {}, {
          query: {
            productIdList: pids.join(',')
          }
        })
      }).then((data) => {
        this.loveList = data.TogetherZone
      })
    },
    change(item, index) {
      this.updateNum(this.numbers[index], item)
    },
    updateNum(amount, item) {
      return tuhu.fetch(CART_UPDATE_API, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          str: JSON.stringify([{
            Amount: amount,
            ItemId: item.ItemId,
            CurrentPrice: item.CurrentPrice,
            Pid: item.Pid + '|' + item.Vid,
            ActivityId: item.ActivityId || ''
          }])
        })
      }, {
        status: false
      })
    },
    navigate(item) {
      tuhu.autoNavigate(item)
    },
    async send() {
      // const car = await tuhu.getDefaultCar(5, false)
      const result = []
      payedIds = []
      this.cartList.forEach((item, index) => {
        if (this.checks[index]) {
          const resItem = {}
          if (item.InstallShopId && item.InstallShopName) {
            resItem.Installshop = {
              ShopId: item.InstallShopId,
              CarparName: item.InstallShopName
            }
          }
          if (item.ServiceId && item.ServiceName) {
            resItem.ProductService = {
              InstallServicePID: item.ServiceId,
              ServicePrice: item.ServicePrice,
              txt: item.ServiceName
            }
          }

          resItem.quantity = this.numbers[index]
          resItem.pid = item.Pid
          resItem.price = item.ProductPrice
          resItem.vid = item.Vid
          resItem.actid = item.ActivityId || ''
          resItem.remark = item.Brand ? '需要车型' : '无需车型'
          resItem.img = item.ImageUrl
          resItem.name = item.DisplayName || ''
          resItem.actid = item.ActivityId || ''
          resItem.price = item.ProductPrice
          resItem.quantity = this.numbers[index]
          if (!item.IsDisabled) {
            result.push(resItem)
            payedIds.push(item.ItemId)
          }
        }
      })
      if (result.length > 0) {
        const data = {
          cpData: result,
          clearShopList: this.onClear()
        }
        tuhu.Pay(data, 4)
      }
    },
    async addCart(item) {
      const addItem = await instance.addItem({
        Pid: item.ProductID + '|' + item.VariantID,
        Amount: 1
      })

      const found = this.cartList.some((item, index) => {
        if (item.ItemId === addItem.ItemId) {
          this.$set(this.numbers, index, this.numbers[index] + 1)
          return true
        }
      })

      if (!found) {
        const data = await instance.getList()

        data.some((item) => {
          if (item.ItemId === addItem.ItemId) {
            const index = this.cartList.length

            this.$set(this.checks, index, true)
            this.$set(this.numbers, index, item.Amount - 0)

            this.cartList.push(item)
            return true
          }
        })
      }
    },
    onDelete(item, index) {
      tuhu.confirm('确认删除？', '温馨提示', () => {
        // const formData = new FormData()
        // formData.append('itemIds', item.CartId)

        tuhu.fetch(CART_DELETE_API, {
          method: 'POST',
          body: JSON.stringify({
            itemIds: item.ItemId
          }),
          headers: {
            'content-type': 'application/json'
          }
        }).then((data) => {
          if (data.Code === 1) {
            this.cartList.splice(index, 1)
          }
        })
      })
    },
    // 清空购物车
    onClear() {
      let selectedList = this.cartList.filter((item, index, arr) => { return this.checks[index] })
      let len = selectedList.length
      let itemListId = ''
      for (let i = 0; i < len; i++) {
        itemListId += selectedList[i].ItemId + ','
      }
      return itemListId
    },
    choose(index) {
      this.$set(this.checks, index, !this.checks[index])
    },
    chooseAll() {
      const allTrue = this.checks.every((item, index) => {
        if (!item) {
          return false
        }

        return true
      })

      if (allTrue) {
        this.checks.forEach((item, index) => {
          this.$set(this.checks, index, false)
        })
      } else {
        this.checks.forEach((item, index) => {
          this.$set(this.checks, index, true)
        })
      }
    },
    // 清空全部失效商品
    clearAllDisabled() {
      const disabledList = this.cartList.filter((v) => {
        return v.IsDisabled
      })

      let data = ''

      disabledList.map((v) => {
        if (data === '') {
          data = v.ItemId
        } else {
          data += `,${v.ItemId}`
        }
      })

      tuhu.fetch(CART_DELETE_API, {
        method: 'POST',
        body: JSON.stringify({
          itemIds: data
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then((data) => {
        this.init()
      })
    }
  }
}
</script>

<style lang="less">
  .cartWrap{
    width: 100%;
    max-width: 630px;
    margin:0 auto;
    height:100%;
    display:flex;
    flex-direction:column;
    .limitTip{
      width:100%;
      max-width:630px;
      height:1.7rem;
      line-height: 1.7rem;
      text-align: center;
      background-color: rgba(223, 52, 72, 1);
      color:#fff;
      font-size:0.6rem;
      position: fixed;
      z-index:9999;
      top:0;
      left:100%;
      opacity:0.8;
      transition:all .6s;
      &.showit{
        left:0;
        opacity:1;
      }
    }
    .tishi{
      width:7.85rem;
      height:3.5rem;
      text-align: center;
      line-height: 3.5rem;
      border-radius: 0.5rem;
      background-color: rgba(0, 0, 0, 0.7);
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 1);
      position:fixed;
      top:30%;
      left:50%;
      margin-left: -3.925rem;
      z-index:9999;
    }
    .deletePrompt{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
      z-index:9999;
      .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        background-color: rgba(0,0,0,.7);
      }
      .promptContent{
        position: absolute;
        top:30%;
        width:13.5rem;
        left:50%;
        margin-left:-6.75rem;
        background-color: #fff;
        border-radius: 0.15rem;
        border: 1px solid rgba(216, 216, 216, 1);
        .top{
          height:3.65rem;
          line-height: 3.65rem;
          text-align: center;
          font-size: 0.8rem;
          color: rgba(51, 51, 51, 1);
          position: relative;
          &:after{
            content:"";
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            height:1px;
            background-color: #d9d9d9;
            transform:scaleY(0.5);
          }
        }
        .btns{
          height:2.2rem;
          display:flex;
          span{
            flex:1;
            height:2.2rem;
            line-height: 2.2rem;
            text-align: center;
            font-size: 0.8rem;
            color: rgba(223, 52, 72, 1);
            &.cancel{
              color:rgba(153, 153, 153, 1);
              position: relative;
              &:after{
                content:"";
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                width:1px;
                background-color: #d9d9d9;
                transform:scaleX(0.5);
              }
            }
          }
        }
      }
    }
    .cartContent{
      flex:1;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .productList{
        background-color: #fff;
        margin-bottom:0.25rem;
        .item{
          position: relative;
          &:after{
            content:"";
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            height:1px;
            background-color: #d9d9d9;
            transform:scaleY(0.5);
            z-index:999;
          }
          .itemDetail{
            height:4.25rem;
            .swiper-container{
              padding-bottom:0;
              height:100%;
              .swiper-wrapper{
                .menu{
                  background-color: rgba(223, 51, 72, 1);
                  font-size:0.8rem;
                }
                .content{
                  padding:0.25rem 0;
                  &>div{
                    height:100%;
                    width:100%;
                    display:flex;
                    justify-content:space-between;
                    .choose{
                      width:1.8rem;
                      background:url(../../imgs/choose.png) no-repeat center;
                      background-size: 0.8rem 0.8rem;
                      &.notchoose{
                        background:url(../../imgs/notchoose.png) no-repeat center;
                        background-size: 0.8rem 0.8rem;
                      }
                    }
                    .pdImg{
                      width:3.75rem;
                      height:3.75rem;
                      margin-right: 0.5rem;
                      font-size:0;
                      img{
                        width:100%;
                        height:100%;
                      }
                    }
                    .rightInfo{
                      flex:1;
                      padding-right: 0.75rem;
                      position: relative;
                      .pdName{
                        display:block;
                        font-size: 0.65rem;
                        line-height: 0.9rem;
                        text-align: left;
                        color: rgba(51, 51, 51, 1);
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break:break-all;
                        margin-bottom:0.1rem;
                      }
                      .limit{
                        height:0.8rem;
                        display:flex;
                        margin-bottom:0.3rem;
                        .hdsp{
                          height:0.8rem;
                          padding:0.075rem 0.1rem;
                          background-color: rgba(223, 51, 72, 1);
                          color:#fff;
                          font-size:0.5rem;
                          margin-right: 0.1rem;
                          border-radius:0.125rem;
                        }
                        .xg{
                          height:0.8rem;
                          padding:0.05rem 0.1rem;
                          border:0.025rem solid rgba(223, 51, 72, 1);
                          color:rgba(223, 51, 72, 1);
                          font-size:0.5rem;
                          margin-right: 0.1rem;
                          border-radius:0.125rem;
                        }
                      }
                      .price{
                        height:0.7rem;
                        line-height: 0.7rem;
                        display:flex;
                        justify-content:flex-start;
                        span{
                          font-size: 0.8rem;
                          color: rgba(223, 52, 72, 1);
                          &.small{
                            font-size:0.6rem;
                            line-height: 0.8rem;
                          }
                        }
                      }
                      .quantitybtn{
                        position: absolute;
                        right:0.75rem;
                        bottom:0.25rem;
                        .linenumber{
                          height:auto;
                          padding:0;
                          .label{
                            display:none;
                          }
                          .modify{
                            .quantity{
                              width:1.25rem;
                              border:none;
                              font-size:0.7rem;
                            }
                            &.normal{
                              .cut{
                                width:1.25rem;
                                height:1.25rem;
                                background: url(../../imgs/cutv2.png) no-repeat;
                                background-size:1.25rem 1.25rem;
                                &.disable{
                                  background: url(../../imgs/cutv1.png) no-repeat;
                                  background-size:1.25rem 1.25rem;
                                }
                              }
                              .add{
                                width:1.25rem;
                                height:1.25rem;
                                background: url(../../imgs/addv2.png) no-repeat;
                                background-size:1.25rem 1.25rem;
                                &.disable{
                                  background: url(../../imgs/addv1.png) no-repeat;
                                  background-size:1.25rem 1.25rem;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .otherInfo{
            padding-left:6.05rem;
            padding-right:0.75rem;
            padding-bottom:0.2rem;
            .serviceList{
              padding-top:0.5rem;
              position:relative;
              &:after{
                content:"";
                position: absolute;
                left:0;
                right:0;
                top:0;
                height:1px;
                background-color: #d9d9d9;
                transform:scaleY(0.5);
              }
              .txt{
                font-size: 0.6rem;
                margin-bottom:0.4rem;
                line-height: 0.7rem;
                color: rgba(153, 153, 153, 1);
              }
            }
            .gift{
              padding-top:0.5rem;
              position:relative;
              &:after{
                content:"";
                position: absolute;
                left:0;
                right:0;
                top:0;
                height:1px;
                background-color: #d9d9d9;
                transform:scaleY(0.5);
              }
              .giftItem{
                display:flex;
                margin-bottom:0.3rem;
                .zeng{
                  width:1.15rem;
                  height:0.65rem;
                  background:url(../../imgs/zeng.png) no-repeat left center;
                  background-size: 0.65rem 0.65rem;
                }
                .txt{
                  font-size: 0.6rem;
                  line-height: 0.7rem;
                  color: rgba(153, 153, 153, 1);
                }
              }
            }
          }
          &.disabled{
            .otherInfo{
              display:none;
            }
            .itemDetail{
              .choose{
                background:url(../../imgs/shixiao.png) no-repeat center !important;
                background-size: 1.3rem 0.65rem !important;
              }
              .limit,.price,.quantitybtn{
                display:none !important;
              }
              .rightInfo{
                .pdName{
                  color: rgba(153, 153, 153, 1) !important;
                }
                .sorry{
                  font-size: 0.65rem;
                  line-height: 0.65rem;
                  text-align: left;
                  color: rgba(51, 51, 51, 1);
                  position: absolute;
                  bottom:0.5rem;
                  left:0;
                }
              }
              .pdImg{
                position: relative;
                &:after{
                  content:"";
                  position: absolute;
                  width:100%;
                  height:100%;
                  top:0;
                  left:0;
                  background:rgba(255,255,255,.5);
                }
              }
            }
          }
        }
        .clearBox{
          height:2.0rem;
          padding:0.3rem 0.75rem 0.3rem 0;
          position: relative;
          &:after{
            content:"";
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            height:1px;
            background-color: #d9d9d9;
            transform:scaleY(0.5);
          }
          .clearBtn{
            float:right;
            border-radius:0.125rem;
            border: 0.05rem solid rgba(153, 153, 153, 1);
            padding:0.325rem 0.45rem;
            text-align: center;
            font-size:0.6rem;
            line-height: 0.6rem;
            color: rgba(102, 102, 102, 1);
          }
        }
        .deleteTip{
          padding:0.375rem 0;
          text-align: center;
          display:flex;
          justify-content:center;
          align-items:center;
          span{
            height:0.6rem;
            line-height: 0.6rem;
            font-size: 0.6rem;
            color: rgba(153, 153, 153, 1);
            padding-left:0.85rem;
            background:url(../../imgs/tip.png) no-repeat left center;
            background-size: 0.6rem 0.6rem;

          }
        }
      }
      .noProduct{
        background-color: #fff;
        margin-bottom: 0.25rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        padding-top:1.5rem;
        .noImg{
          width:3.5rem;
          vertical-align: midlle;
          margin-bottom: 0.6rem;
        }
        span{
          font-size: 0.65rem;
          line-height: 0.65rem;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 1.1rem;
        }
        .shopBtn{
          border: 0.05rem solid rgba(223, 51, 72, 1);
          border-radius: 0.1rem;
          padding:0.4rem 1.45rem;
          font-size: 0.7rem;
          line-height: 0.7rem;
          color: rgba(223, 52, 72, 1);
          margin-bottom: 0.75rem;
        }
      }
      .recommend{
        padding:0 0.5rem;
        .tophead{
          height:2.1rem;
          line-height: 2.1rem;
          display: flex;
          justify-content:center;
          position: relative;
          &:after{
            content:"";
            position: absolute;
            left:0;
            right:0;
            top:1.05rem;
            height:1px;
            background-color: #ccc;
            transform:scaleY(0.5);
            z-index:8;
          }
          span{
            font-size: 0.6rem;
            color: rgba(153, 153, 153, 1);
            padding:0 0.5rem;
            background-color: #eee;
            z-index:9;
          }
        }
        .recProduct{
          display:flex;
          flex-wrap:wrap;
          justify-content:space-between;
          .productItem{
            width:49%;
            background-color: #fff;
            margin-bottom:0.25rem;
            display: flex;
            flex-direction:column;
            .pdImg{
              width:100%;
              font-size:0;
              margin-bottom:0.25rem;
              img{
                width:100%;
                vertical-align: middle;
              }
            }
            .pdName{
              padding:0 0.5rem;
              font-size: 0.6rem;
              line-height: 0.75rem;
              color: rgba(51, 51, 51, 1);
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break:break-all;
              height: 1.4rem;
            }
            .bottom{
              height:1.8rem;
              display:flex;
              justify-content:space-between;
              .price{
                height: 1.8rem;
                padding-left:0.5rem;
                line-height: 1.8rem;
                display: flex;
                justify-content: flex-start;
                span{
                  font-size: 1.0rem;
                  color: rgba(223, 52, 72, 1);
                  &.small{
                    font-size:0.6rem;
                    line-height: 2rem;
                  }
                }
              }
              .addBtn{
                width:1.75rem;
                height:1.8rem;
                background:url(../../imgs/addcart.png) no-repeat center;
                background-size: 0.75rem 0.75rem;
              }
            }
          }
        }
      }
    }
    .footer{
      height:2.4rem;
      display:flex;
      align-items:center;
      background-color: #fff;
      position: relative;
      &:before{
        content:"";
        position: absolute;
        top:0;
        left:0;
        right:0;
        height:1px;
        background-color: #d9d9d9;
        transform:scaleY(0.5);
        z-index:8;
      }
      .all{
        width:1.8rem;
        height:2.4rem;
        padding-top:1.5rem;
        text-align: center;
        font-size: 0.55rem;
        line-height: 0.55rem;
        color: rgba(102, 102, 102, 1);
        background:url(../../imgs/choose.png) no-repeat top 0.5rem center;
        background-size: 0.8rem 0.8rem;
        &.notall{
          background:url(../../imgs/notchoose.png) no-repeat top 0.5rem center;
          background-size: 0.8rem 0.8rem;
        }
      }
      .total{
        height:2.4rem;
        display:flex;
        justify-content:flex-end;
        flex:1;
        padding-right: 0.75rem;
        align-items:center;
        span{
          font-size: 0.7rem;
          color: rgba(102, 102, 102, 1);
          line-height: 2.4rem;
          &.amount{
            font-size: 1.0rem;
            color: rgba(223, 52, 72, 1);
            margin-left:0.25rem;
          }
        }
      }
      .btn{
        width:7.75rem;
        height:2.4rem;
        background-color: rgba(223, 51, 71, 1);
        z-index:9;
        text-align: center;
        line-height: 2.4rem;
        color:#fff;
        font-size: 0.8rem;
      }
    }
  }
</style>
