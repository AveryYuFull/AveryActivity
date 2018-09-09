<template>
  <div class="platenum">
    <div  :class="showModal?'modal modal-coupons modal-in': 'modal modal-coupons modal-out'" style="display: block; margin-top: -167px;">
      <div class="modal-inner">
        <div class="modal-title">领取优惠券</div>
        <div class="modal-text">
          <div class="promotions">
            <div class="promotionBox">

              <div class="list">
                <div v-for='(item, index) in couponsList' :key='index' :class="item.IsGet || item.AlreadyHave? 'item getted':'item'">
                  <div class="itemLeft">
                    <div class="number">
                      <span class="label">¥</span>
                      <span class="amount" v-cloak>{{item.Discount}}</span>
                    </div>
                    <div class="condition">{{item.Rule || '满' + item.MinMoney + '元可用'}}</div>
                  </div>
                  <div class="itemRight">
                    <div class="title">{{item.PromtionName || item.PromotionName}}</div>
                    <div class="date">{{item.Time || item.ValidStartTime + '-' + item.ValidEndTime}}</div>
                    <div class="useNow" @click.stop='handleClick(item,index)'>领取优惠券</div>
                    <div class="quanDetail">
                      <div class="text">{{item.Description}}</div>
                      <!-- <div class="arrow"></div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-buttons " @click.stop='closeCoupons'>
        <span class="modal-button">
          <span class="closeBtn"></span>
        </span>
      </div>
    </div>
    <div  v-if="showmask && showModal" class="modal-overlay modal-overlay-visible"></div>
  </div>
</template>
<script>
  export default {
    /**
      * author: lijingwen@tuhu.cn
      * date: 2017/12/6
      * desc: 领取优惠券的弹窗
     */
    data() {
      return {
        showModal: true,
        couponsList: []
      }
    },
    props: {
      showmask: {
        type: Boolean,
        require: false,
        default: true
      },
      type: {
        type: String | Number
      },
      couponsCallBack: {
        type: Function,
        require: false,
        default: () => {}
      },
      productId: {
        type: String,
        require: false
      },
      sort: {
        type: String | Number,
        require: false,
        default: 'xby'
      }
    },
    computed: {

    },
    watch: {
      showModal: {
        handler() {
          this.getCoupons()
            .then((res) => {
            })
        }
      }
    },
    created() {
      this.getCoupons()
    },
    methods: {
      async fetchData() {
        const userInfo = await tuhu.getUserInfo()

        if (this.type + '' === '1') {
          return {
            url: 'https://api.tuhu.cn/Action/SelectProductPromotionGetRules',
            query: {
              UserID: userInfo.userid,
              pids: this.productId,
              type: 1
            }
          }
        }

        if (this.type + '' === '2') {
          return {
            url: 'https://by.tuhu.cn/apinew/GetPromotionRulesByPackageType.html',
            query: {
              userId: userInfo.userid,
              packagetype: this.sort
            }
          }
        }
      },
      async receiveCoupon(item) {
        const userInfo = await tuhu.getUserInfo()
        let receiveData = {}
        if (this.type + '' === '1') {
          // 轮胎优惠券领取
          // {"getRuleGuid":"c2df607e-c8ac-48dc-a678-2b8da1457afe","userId":"2c17639a-a05b-46ac-966b-123b15b644cb"}
          receiveData = {
            url: 'https://api.tuhu.cn/Action/CreateProductPromotion',
            query: {
              getRuleGuid: item.GetRuleGUID,
              userId: userInfo.userid
            }
          }
        } else if (this.type + '' === '2') {
          // 保养
          // {"channel":"WXAPP","getRuleId":"3d29b26f-3ed6-42d7-bc5d-cbfd468b4ba3","userId":"2c17639a-a05b-46ac-966b-123b15b644cb"}
          // {"Code": "1","Message": "领取成功"}
          receiveData = {
            url: 'https://by.tuhu.cn/apinew/CreatePromotionCode.html',
            query: {
              channel: 'WXAPP',
              getRuleId: item.Id,
              userId: userInfo.userid
            }
          }
        }
        const receiveRes = await tuhu.fetch(receiveData.url, {}, {
          query: receiveData.query
        })
        return receiveRes
      },
      handleClick(item, index) {
        this.receiveCoupon(item)
          .then((res) => {
            this.couponsCallBack(res)
            tuhu.toast(res.Message)
            if (this.couponsList[index].IsGet !== undefined) {
              this.couponsList[index].IsGet = true
            }
            if (this.couponsList[index].AlreadyHave !== undefined) {
              this.couponsList[index].AlreadyHave = true
            }
            this.couponsList.slice(0, 0)
            // this.closeCoupons()
          })
      },
      closeCoupons () {
        this.showModal = false
      },
      async getCoupons() {
        const fetchData = await this.fetchData()
        const res = await tuhu.fetch(fetchData.url, {}, {
          query: fetchData.query,
          state: false
        })

        if (this.type + '' === '1') { // 轮胎车品
          this.couponsList = res.Data.GetRules
        } else if (this.type + '' === '2') { // 保养 优惠券 小保养
          this.couponsList = res.Data
        }
        return res
      }
    }
  }
</script>

<style scoped lang="less">
// 优惠券弹框全局样式
.platenum{
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100%;
  .modal-overlay.modal-overlay-visible{
    z-index: 1;
    position: fixed;
  }
  .modal-coupons{
    width: 100%;
    left: 0;
    right: 0;
    margin: 0;
    bottom: 0;
    position: fixed;
    transform: translateY(100%);
    opacity: 1;
    z-index: 999;
    &.modal-in{
      transform: translateY(0);
    }
    &.modal-out{
      transform: translateY(100%);
      opacity: 1;
    }
    .modal-inner{
      border-radius:0;
      height: 100%;
      padding: 0.5rem 0 0 0;
      display:flex;
      flex-direction:column;
    }
    .modal-button:first-child:last-child{
      border-radius: 0
    }
    // 关闭按钮
    .modal-buttons {
      position: absolute;
      top: 0;
      right: 0;
      width: 2.25rem;
      height: 2.0rem;
      z-index: 10601;
      .closeBtn{
        position: absolute;
        width:2.25rem;
        height:2.0rem;
        top:0;
        right:0;
        background:url(../../lib/imgs/UI/closeBtn.png) no-repeat center;
        background-size: 0.8rem 0.8rem;
      }
    }
    // 优惠券列表
    .modal-text{
      height: 100%;
      flex:1;
      overflow-y: scroll;
      //padding-bottom: 1.5rem;
      .promotions{
        // position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        max-width:630px;
        z-index:10599;
        .bg{
          position: absolute;
          width: 100%;
          height: 100%;
          top:0;
          left:0;
          background-color: rgba(0,0,0,.7);
        }
        .promotionBox{
          background-color: rgba(238, 238, 238, 1);
          // position: absolute;
          // top:20%;
          height: 100%;
          bottom:0;
          left:0;
          right:0;
          display:flex;
          flex-direction:column;
          .header{
            height:2.0rem;
            line-height: 2.0rem;
            text-align: center;
            font-size: 0.7rem;
            color: rgba(51, 51, 51, 1);
            position: relative;
            // .closeBtn{
            //   position: absolute;
            //   width:2.25rem;
            //   height:2.0rem;
            //   top:0;
            //   right:0;
            //   background:url(../../lib/imgs/UI/closeBtn.png) no-repeat center;
            //   background-size: 0.8rem 0.8rem;
            // }
          }
          .list{
            flex:1;
            // overflow-y: scroll;
            height: max-content;
            overflow: scroll;
            padding:0 0.25rem 1.5rem;
            .item{
              margin-bottom:0.5rem;
              overflow:hidden;
              background:url(../../lib/imgs/UI/bg.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
              .itemLeft{
                float:left;
                position: absolute;
                top:0;
                bottom:0;
                left:0;
                width:32%;
                background:url(../../lib/imgs/UI/orangeBg.png) no-repeat;
                background-size: 100% 100%;
                .number{
                  width: 100%;
                  height:1.6rem;
                  color:#fff;
                  text-align: center;
                  position: absolute;
                  top:50%;
                  margin-top:-0.8rem;
                  .label{
                    font-size: 0.8rem;
                    margin-right: -0.2rem;
                    display: inline-block;
                    vertical-align: middle;
                    height: 1.6rem;
                    line-height: 1.8rem;
                  }
                  .amount{
                    font-size: 1.25rem;
                    line-height:1.6rem;
                    display: inline-block;
                    vertical-align: middle;
                  }
                }
                .quanName{
                  width: 100%;
                  height:1.6rem;
                  color:#fff;
                  text-align: center;
                  position: absolute;
                  top:50%;
                  margin-top:-0.8rem;
                  &+.condition{
                    display:none;
                  }
                }
                .condition{
                  height:0.6rem;
                  line-height: 0.6rem;
                  font-size: 0.6rem;
                  color: rgba(255, 255, 255, 1);
                  position: absolute;
                  width: 100%;
                  text-align: center;
                  bottom:25%;
                }
                .quanState {
                  font-size: 0;
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 2.25rem;
                  height: 2.05rem;
                  z-index:999;
                }
              }
              .itemRight{
                width: 68%;
                float: right;
                top: 0;
                right: 0;
                padding: 10px 0 0 4%;
                .title{
                  font-size: 0.65rem;
                  color: #f16527;
                  height: 0.9rem;
                  line-height: 0.9rem;
                  margin-bottom: 0.75rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding-right: 0.2rem;
                  text-align: left;
                }
                .date{
                  height: 0.6rem;
                  line-height: 0.7rem;
                  font-size: 0.5rem;
                  color: #666;
                  padding-left: 0.4rem;
                  position: relative;
                  margin-bottom: 0.4rem;
                  text-align: left;
                  &:before {
                    content: "";
                      position: absolute;
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      top: 4px;
                      left: 0;
                      background-color: #666;
                  }
                  &:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 0;
                    bottom:-0.45rem;
                    left: -4%;
                    border-bottom: 1px dashed #e6e6e6;
                  }
                }
                .useNow {
                  position: absolute;
                  top: 1.6rem;
                  right: 0.75rem;
                  height: 1.1rem;
                  width: 3.35rem;
                  background-color: #fc6333;
                  border-radius:0.55rem;
                  text-align: center;
                  line-height:1.1rem;
                  color: #fff;
                  font-size: 0.6rem;
                }
                .quanDetail{
                  height:2.2rem;
                  position: relative;
                  .text{
                    font-size: 10px;
                    color: #666;
                    line-height: 14px;
                    padding-left: 8px;
                    padding-right: 12%;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-align: left;
                    &:before{
                      content: "";
                      position: absolute;
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      top: 4px;
                      left: 0;
                      background-color: #666;
                    }
                  }
                  .arrow{
                    position: absolute;
                    width: 1.8rem;
                    height: 2.2rem;
                    background: url(../../lib/imgs/UI/xiangxia.png) no-repeat center;
                    background-size: 0.5rem 0.35rem;
                    top: 50%;
                    right: 0;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                  }
                  &.expanded{
                    height:3.0rem;
                    .text{
                      -webkit-line-clamp: 3;
                    }
                    .arrow{
                      position: absolute;
                      width: 1.8rem;
                      height: 2.2rem;
                      background: url(../../lib/imgs/UI/xiangshang.png) no-repeat center;
                      background-size: 0.5rem 0.35rem;
                      top: 50%;
                      right: 0;
                      -webkit-transform: translateY(-50%);
                      transform: translateY(-50%);
                    }
                  }
                }
              }
              &.getted{
                .itemLeft{
                  background:url(../../lib/imgs/UI/grayBg.png) no-repeat;
                  background-size: 100% 100%;
                  &:after{
                    content:"";
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 2.25rem;
                    height: 2.05rem;
                    z-index:999;
                    background: url(../../lib/imgs/UI/ylq.png) no-repeat;
                    background-size: 2.25rem 2.05rem;
                  }
                }
                .itemRight{
                  .title{
                    color: rgba(153, 153, 153, 1);
                  }
                  .useNow{
                    display:none;
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
</style>
