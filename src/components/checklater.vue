<template>
  <div v-if="showCheck">
    <div class="wrapper2">
      <div class="popBg2">
        <div class="popUp">
          <div class="title">
              请选择分期<span @click="closeCheck"></span>
          </div>
          <ul class="list">
            <li v-for="(item, index) in checkItem" :key="index" :class="chooseClass[index] ? 'selected' : ''" @click="chooseSelect(index)">
              <span></span>
              <div class="text" v-if="item.onwer !== 'User'">
                <h4>{{item.eachPrin}}×{{number[index]}}期</h4>
                <p>无手续费</p>
              </div>
              <div class="text" v-if="item.onwer === 'User'">
                <h4>{{item.prinAndFee}}×{{number[index]}}期</h4>
                <p>手续费{{item.eachFee}}/期，费率{{item.rate}}</p>
              </div>
            </li>
          </ul>
          <div class="confirmBtn" @click="checkPay">
              <p>确认支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myutil from '../commons/myutil';
import {getCheckData, cashierPay} from '../api/api';

export default {
    props: {
        orderMoney: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...Vuex.mapState('cashier', {
            jsessionid: 'jsessionid',
            cashData: 'cashData'
        })
    },
    data() {
        return {
            showCheck: true,
            select: 0,
            choose: null,
            sessionid: '',
            checkItem: [],
            chooseClass: [],
            checkData: [],
            number: ['3', '6', '12']
        };
    },
    created() {
        this.sessionid = this.jsessionid || tuhu.localStorage.getItem('session');
        this.getCheckDatas(this.orderMoney);
    },
    methods: {
        setMoney(money, choose) {
            this.choose = choose;
            this.getCheckDatas(money);
        },
        setChoose() {
            this.select = 0;
        },
        getCheckDatas(money) {
            const datas = [];
            getCheckData(money, this.sessionid).then((res) => {
                if (res && res.code === 'SUCCESS') {
                    for (let key in res.data.huabeiInfo) {
                        datas.push(res.data.huabeiInfo[key]);
                    }
                    this.checkData = res.data;
                    this.checkItem = datas;
                    this.number.map((item, index) => {
                        if (item === res.data.checked) {
                            this.chooseClass[index] = true;
                        } else {
                            this.chooseClass[index] = false;
                        }
                    });
                    if (!this.checkData.checked) {
                        this.chooseClass[0] = true;
                    }
                    this.chooseClass = this.chooseClass.slice();
                } else {
                    tuhu.alert('花呗支付异常');
                }
            }).catch((e) => {
                tuhu.alert(e.message);
            });
        },
        chooseSelect(index) {
            if (index !== this.select) {
                this.chooseClass[this.select] = false;
                this.checkItem.forEach((item, ind) => {
                    if (ind === index) {
                        this.chooseClass[ind] = true;
                    }
                });
                this.chooseClass = this.chooseClass.slice();
                this.select = index;
            }
        },
        checkPay() {
            let params = {
                'payWayCode': 'ALIPAY_HUABEI'
            };
            params.exts = {};
            if (this.choose) {
                const acctNo = this.cashData.orderInfo.cardInfo.cardList[this.choose].acctNo;
                const cardM = this.cashData.orderInfo.cardInfo.cardList[this.choose].balance.amount;
                params.exts.ecard = 'ACCOUNT_CARD';
                params.exts.accountNo = acctNo;
                params.exts.payMoney = cardM;
            }
            for (let key in this.checkData.huabeiInfo) {
                if (key === this.number[this.select]) {
                    params.exts.hbNum = key;
                    if (this.checkData.huabeiInfo[key].onwer === 'User') {
                        params.exts.sellerPercent = '0';
                    } else {
                        params.exts.sellerPercent = '100';
                    }
                }
            }
            cashierPay(params, this.sessionid).then((res) => { // 支付接口
                if (res) {
                    myutil.toPay(res);
                } else {
                    tuhu.alert('收银台支付异常', () => {
                        tuhu.redirectTo({
                            url: '/pages/cashier/error'
                        });
                    });
                }
            }).catch((e) => {
                tuhu.alert('收银台授权异常', () => {
                    tuhu.redirectTo({
                        url: '/pages/cashier/error'
                    });
                });
            });
        },
        closeCheck() {
            this.showCheck = !this.showCheck;
            this.setChoose();
        }
    }
};
</script>

<style lang="less" scoped>
  .wrapper2 {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    .popBg2 {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      .popUp {
        width: 100%;
        background-color: #ffffff;
        .title {
          color: #666666;
          font-size: 13px;
          text-align: center;
          position: relative;
          line-height: 45px;
          height: 45px;
          span {
            background: url(../imgs/close.png) no-repeat;
            background-size: contain;
            width: 12px;
            height: 12px;
            position: absolute;
            right: 15px;
            top: 18px;
          }
        }
        .list {
          padding-left: 15px;
          padding-bottom: 10px;
          .selected {
            span {
              background: url(../imgs/on.png) no-repeat;
              background-size: contain;
            }
          }
          li {
            height: 58px;
            display: flex;
            align-items: center;
            position: relative;

            &:before {
              content: " ";
              position: absolute;
              left: 0;
              bottom: 0;
              right: 0;
              height: 0px;
              border-top: 1px solid #d9d9d9;
              color: #d9d9d9;
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-transform: scaleY(0.5);
              transform: scaleY(0.5);
            }
            &:last-child:before {
              content: '';
              clear: both;
              border: 0;
            }
            span {
              width: 16px;
              height: 16px;
              background: url(../imgs/off.png) no-repeat;
              background-size: contain;
            }
            .text {
              margin-left: 15px;
              h4 {
                color: #333333;
                font-size: 13px;
                margin-bottom: 5px;
                font-weight: normal;
              }
              p {
                color: #999999;
                font-size: 11px;
              }
            }
          }
        }
      }
    }
    .confirmBtn {
      padding: 20px 15px;
      p {
        height: 42px;
        line-height: 42px;
        background-color: #df3348;
        border-radius: 5px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .hide {
    display: none;
  }

</style>

