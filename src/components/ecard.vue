<template>
  <div v-if="showCard">
    <div class="popBg4">
      <div class="popUp cards">
        <div class="cardList">
          <div class="cardItem" v-for="(item, index) in cardData" :key="index" @click="chooseCard(index)" :class="chooseClass[index] ? 'selected' : ''">
            <div class="top">
              <span class="name">{{item.acctName}}</span>
            </div>
            <div class="balance">
              <span>余额</span><h3>¥{{(item.balance.amount/100).toFixed(2)}}</h3>
            </div>
            <div class="scope">
              使用范围：{{item.applyProduct.join('、')}}
            </div>
            <div class="bottom">
              <div class="valid">
                有效期：{{new Date(parseInt(item.effectedTime/1000) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '.').replace(/下/g, '')}} 至 {{new Date(parseInt(item.expiredTime/1000) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '.').replace(/下/g, '')}}
              </div>
            </div>
          </div>
        </div>
        <div class="toUse" @click="cardPay">
          <span>使用</span>
        </div>
        <div class="close" @click="handleClose"></div>
      </div>
    </div>
  </div>
</template>

<script>
import myutil from '../commons/myutil';
import {cashierPay} from '../api/api';

export default {
    watch: {

    },
    computed: {
        ...Vuex.mapState('cashier', {
            cashData: 'cashData'
        })
    },
    data() {
        return {
            select: 0,
            money: '',
            sessionid: '',
            showCard: false,
            lock: true,
            cardData: [],
            useJudge: [],
            chooseClass: []
        };
    },
    created() {
        this.cardData = this.cashData.orderInfo.cardInfo.cardList;
        this.sessionid = this.jsessionid || tuhu.localStorage.getItem('session');
        this.chooseClass[this.select] = true;
        this.cardData.map((item, ind) => {
            if (item.acctStatus !== 'NORMAL') {
                this.useJudge[ind] = false;
            } else {
                this.useJudge[ind] = true;
            }
        });
    },
    methods: {
        chooseCard(index) {
            if (index !== this.select) {
                this.chooseClass[this.select] = false;
                this.cardData.forEach((item, ind) => {
                    if (ind === index) {
                        if (item.acctStatus !== 'NORMAL') {
                            return;
                        }
                        this.chooseClass[ind] = true;
                    }
                });
                this.chooseClass = this.chooseClass.slice();
        // this.select = index
            } else {
                this.chooseClass[index] = !this.chooseClass[index];
                this.chooseClass = this.chooseClass.slice();
            }
            this.select = index;
        },
        cardPay() {
            if (this.lock) {
                this.lock = false;
                const orderMoney = this.cashData.orderInfo.orderAmount.amount / 100;
                const cardMoney = this.cashData.orderInfo.cardInfo.cardList[this.select].balance.amount / 100;
                const compare = orderMoney - cardMoney;
                const cardNo = this.cashData.orderInfo.cardInfo.cardList[this.select].acctNo;
                const params = {
                    'payWayCode': 'ACCOUNT_CARD',
                    'exts': {
                        'ecard': 'ACCOUNT_CARD',
                        'accountNo': cardNo
                    }
                };
                if (compare <= 0) {
                    params.exts.payMoney = this.cashData.orderInfo.orderAmount.amount;
                    cashierPay(params, this.sessionid).then((res) => { // 支付接口
                        if (res && res.code === 'SUCCESS') {
                            this.lock = true;
                            if (res.data.returnCode && res.data.returnCode !== 'SUCCESS') {
                                tuhu.alert(res.data.returnMessage);
                                return;
                            }
                            const orderN = res.data.outBizNo;
                            const payId = res.data.payInstructionId;
                            tuhu.redirectTo({
                                url: '/pages/cashier/inform',
                                data: {
                                    outBizNo: orderN,
                                    payInstructionId: payId
                                }
                            });
              // myutil.toPay(res)
                        } else {
                            const errorMsg = res.data.returnMessage || '收银台支付异常';
                            tuhu.alert(errorMsg, () => {
                                tuhu.redirectTo({
                                    url: '/pages/cashier/error'
                                });
                            });
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    if (this.chooseClass[this.select]) {
                        tuhu.alert('VIP卡余额不足,请选用其他支付方式继续支付', () => {
              // const orderMoney = this.cashData.orderInfo.orderAmount.amount
                            const cardMoney = (this.cashData.orderInfo.cardInfo.cardList[this.select].balance.amount / 100).toFixed(2);
              // const finalPay = orderMoney - cardMoney
              // const cardNo = this.cashData.orderInfo.cardInfo.cardList[this.select].acctNo
              // tuhu.redirectTo({
              //   url: '/pages/cashier/cashier',
              //   data: {
              //     balance: finalPay,
              //     cardM: cardMoney,
              //     cardN: cardNo
              //   }
              // })
                            const flag = true;
                            this.showCard = false;
                            this.$emit('setDesc', `已扣${cardMoney}元`);
                            this.$emit('setSelect', this.select, flag);
                        });
                        return;
                    }
                    this.showCard = false;
                    this.$emit('setDesc', '不使用VIP卡');
                }
            }
        },
        showMoney(item) {
            myutil.showPoint(item.balance.amount);
        },
        handleClose() {
            const flag = false;
            this.showCard = !this.showCard;
            this.$emit('setDesc', '不使用VIP卡');
            this.$emit('setSelect', this.select, flag);
        }
    }
};
</script>

<style lang="less" scoped>
  .popBg4 {
  	width: 100%;
  	height: 100%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	position: fixed;
  	background-color: rgba(0, 0, 0, 0.5);
  	top: 0;
  	z-index: 5;
    padding: 0 30px;
    .popUp {
      width: 100%;
      border-radius: 5px;
      font-size: 14px;
      background-color: #ffffff;
      padding: 28px 15px;
      position: relative;
      .close {
        position: absolute;
        bottom: -13%;
        left: 50%;
        background: url(../imgs/close2.png) no-repeat;
        background-size: contain;
        display: block;
        width: 29px;
        height: 29px;
        margin-left: -15px;
      }
      .title {
        font-size: 16px;
        color: #f57b33;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .explain {
          padding: 0 8px;
        }
        span {
          height: 1px;
          flex: 1;
          border-bottom: 1px dashed rgba(245, 124, 51, 0.3);
          display: block;
        }
      }
      ul {
        list-style: none;
        margin-top: 20px;
        height: 300px;
        overflow-y: auto;
        li {
          padding-left: 15px;
          font-size: 15px;
          color: #666666;
          line-height: 24px;
          position: relative;
          margin-bottom: 5px;
          span {
            height: 4px;
            width: 4px;
            background-color: #f4825b;
            border-radius: 4px;
            display: inline-block;
            position: absolute;
            left: 5px;
            top: 7px;
          }
        }
      }
      h4 {
        font-size: 16px;
        color: #333333;
        text-align: center;
      }
      .error {
        margin: 5px 0 10px;
        font-size: 14px;
        color: #df3348;
      }
      .yzmInput {
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          height: 40px;
          width: 122px;
          border: 1px solid #d9d9d9;
          padding-left: 10px;
          font-size: 14px;
          color: #333333;
          outline: none;
          appearance: none;
        }
        img {
          height: 40px;
          width: 74px;
          background-color: #d9d9d9;
        }
        .refresh {
          height: 14px;
          width: 14px;
          background: url(../imgs/shape.png) no-repeat;
          background-size: contain;
        }
      }
      .conOK {
        margin-top: 22px;
        height: 40px;
        background-color: #d9d9d9;
        border-radius: 5px;
        font-size: 14px;
        line-height: 40px;
        color: #999999;
        text-align: center;
        .actived {
          background-color: #df3348;
          color: #ffffff;
        }
      }
      .rules {
        height: 396px;
      }
      .yanzhengma {
        height: 190px;
        width: 275px;
        padding: 20px;
        .close {
          position: absolute;
          top: 13px;
          right: 10px;
          left: inherit;
          background: url(../imgs/close1.png) no-repeat;
          background-size: contain;
          display: block;
          width: 10px;
          height: 19px;
        }
      }
      .OtherPay {
        padding: 26px 0 0;
        text-align: center;
        font-size: 16px;
        color: #333333;
        margin: 0 22px;
        .popBtn {
          height: 42px;
          line-height: 42px;
          color: #df3448;
          border-top: 1px solid #d9d9d9;
          margin-top: 26px;
        }
      }
    }
    .cards {
      padding: 5px 0 0;
      .close {
        bottom: -50px;
      }
      .toUse {
        background-color: #FFFFFF;
        padding: 10px 15px 15px;
        border-radius: 0 0 5px 5px;
        font-size: 16px;
        span {
          height: 48px;
          line-height: 48px;
          color: #FFFFFF;
          text-align: center;
          background-color: #df3348;
          border-radius: 5px;
          display: block;
        }
      }
      .cardList {
        padding: 0 15px;
        height: auto;
        max-height: 360px;
        overflow-y: scroll;
        .cardItem {
          height: 120px;
          width: 100%;
          background-color: #e7b556;
          border-radius: 5px;
          padding: 15px;
          margin-top: 10px;
          color: #ffffff;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            top: 47px;
            right: 16px;
            background: url(../imgs/check_off.png) no-repeat;
            background-size: contain;
            width: 26px;
            height: 28px;
          }
          .cannotUse {
            background-color: rgba(191, 191, 191, 0.8);
            &:after {
              content: '不可用';
              font-size: 16px;
              color: #ffffff;
              width: auto;
              height: auto;
              background: transparent;
            }
          }
          .scope {
            margin-top: 6px;
            font-size: 12px;
            color: #FFFFFF;
          }
          .bottom {
            margin-top: 5px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #FFFFFF;
          }
          .top {
            font-size: 16px;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            height: 14px;
            line-height: 14px;
            color: #FFFFFF;
          }
          .balance {
            margin-top: 6px;
            font-size: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            padding-right: 12px;
            color: #FFFFFF;
            h3 {
              height: 30px;
              line-height: 30px;
              font-size: 30px;
              font-weight: 500;
              margin-left: 5px;
              color: #FFFFFF;
            }
          }
        }
        .selected {
          &:after {
            background: url(../imgs/check_on.png) no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
</style>
