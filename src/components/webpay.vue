<template>
  <div class="weixinPay">
    <h3 class="payTitle"><span></span>微信支付</h3>
    <div class="title">
      <div class="left">
        <div class="orderNum">订单号：<span>{{payWayData.orderInfo.orderNo}}</span></div>
        <div class="orderDes">订单描述：<span>{{payWayData.orderInfo.orderDesc}}</span></div>
      </div>
      <div class="right">
        支付金额：
        <span>{{money}} </span>元
        </div>
    </div>
    <div class="erweima">
      <div class="left">
        <p class="p_1" v-if="timeText !== '00'">二维码还有<span>{{timeText}}秒</span>过期</p>
        <p class="p_1" v-if="timeText === '00'">已过期，请<span class="cursor" @click="reload">返回</span></p>
        <p class="p_2">(过期后请刷新页面继续完成支付)</p>
        <div class="erweimaimg">
          <img v-qrcode="{width: 180, value:wxData.codeUrl}">
          <!-- <div dangerouslySetInnerHTML={{__html: this.showImg(datas.codeUrl)}}></div> -->
        </div>
        <p class="p_3">微信扫一扫,扫码支付</p>
        <div class="line"></div>
        <div class="more cursor" @click="toOrder">&lt; 查看订单</div>
      </div>
      <div class="right">
          <img src="../imgs/phone.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { payResult } from '../api/api';
import myutil from '../commons/myutil';

export default {
    props: {
        wxData: Object,
        default: {}
    },
    computed: {
        ...Vuex.mapState('cashier', {
            jsessionid: 'jsessionid',
            payWayData: 'cashData'
        })
    },
    data() {
        return {
            money: '',
            timeText: '',
            sessionid: '',
            returnUrl: ''
        };
    },
    mounted() {
        this.countDown();
        this.sessionid = this.jsessionid || tuhu.localStorage.getItem('session');
        this.money = myutil.showPoint(this.payWayData.orderInfo.orderAmount.amount);
        this.payWayData.payWayList.map((item, index) => {
            if (item.code === 'WX_SCAN') {
                this.returnUrl = item.exts.returnUrl;
            }
        });
    },
    methods: {
        resultQuery() {
            const orderN = this.payWayData.orderInfo.orderNo;
            const payId = this.wxData.payInstructionId;
            payResult(orderN, payId, this.sessionid).then((res) => {
                if (res && res.data) {
                    if (res.code === 'SUCCESS') {
                        if (res.data.paymentStatus === 'SUCCESS') {
                            location.href = this.returnUrl;
                        } else if (res.data.paymentStatus === 'PROCESSING') {
                            setTimeout(() => {
                                this.resultQuery();
                            }, 2000);
                        } else {
                            location.href = this.returnUrl;
                        }
                    } else {
                        setTimeout(() => {
                            this.resultQuery();
                        }, 2000);
                    }
                } else { // 结果查询
                    setTimeout(() => {
                        this.resultQuery();
                    }, 5000);
                }
            });
        },
        countDown() {
            let times = 60;
            this.timeText = times--;
            const interval = setInterval(() => {
                this.timeText = times--;
                if (times < 10) {
                    this.timeText = '0' + times;
                }
                if (times <= 0) {
                    this.timeText = '00';
                    clearInterval(interval);
                }
            }, 1000);
        },
        reload() {
            window.location.reload();
        },
        toOrder() {
            window.location.href = this.wxData.productShowUrl;
        }
    }
};
</script>

<style lang="less" scoped>
  .weixinPay {
    padding: 20px 35px;
    .cursor {
      cursor: pointer;
    }
    .title {
      font-size: 14px;
      color: #666666;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: space-between;
      .left div {
        display: inline-block;
        span {
          font-weight: 500;
        }
        .orderDes {
          margin-left: 26px;
        }
      }
      .right {
        font-size: 14px;
        color: #333333;
        span {
          font-size: 22px;
          color: #e4393c;
          font-weight: bold;
        }
      }
    }
    .payTitle {
      font-size: 18px;
      height: 24px;
      line-height: 24px;
      display: flex;
      align-content: center;
      font-weight: 600;
      color: #333333;
      span {
        width: 24px;
        height: 24px;
        background: url(../imgs/weixin.png) no-repeat;
        background-size: contain;
        display: inline-block;
        margin-right: 5px;
      }
    }
    .erweima {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      .left {
        display: flex;
        align-items: center;
        flex-flow: column;
        font-size: 14px;
        margin-top: 22px;
        margin-right: 56px;
        .p_1 {
          color: #333333;
          margin-bottom: 10px;
        }
        .p_1 span {
          color: #d12a3e;
        }
        .p_2 {
          margin-bottom: 20px;
          color: #999999;
        }
        .erweimaimg {
          margin-bottom: 10px;
        }
        .erweimaimg img {
          width: 180px;
          height: 180px;
          display: block;
        }
        .p_3 {
          font-size: 18px;
          color: #666666;
          margin-bottom: 20px;
        }
        .line {
          height: 1px;
          width: 180px;
          background-color: #dddddd;
          margin-bottom: 10px;
        }
        .more {
          color: #4a4a4a;
        }
      }
    }
  }
</style>
