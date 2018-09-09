<template>
  <div v-if="showKey" class="_content">
    <div class="keyboardWrap">
      <div class="bg"></div>
      <div class="keyContent wrong uptoshow">    <!-- 红色的错误提示，通过类名.wrong控制。 -->    <!-- 类名.uptoshow控制键盘从下至上滑动出现 -->
        <div class="topTitle">支付金额</div>
        <div class="amount">¥{{orderMoney}}</div>
        <div class="closeBtn" @click="handleClose"></div>
        <div :class="borderColor">
          <span v-for="(item, index) in items" :key="index">
            <span class="filled" v-if="password[index]"></span>
          </span>
        </div>
        <div class="tips">
          <span :class="errorClass">{{pwdText}}</span>
          <div class="forgetPsw" @click="toSetPwd">忘记密码</div>
        </div>
        <div class="keyBox">
          <span  @click="keyUpHandle($event)" v-for="(item, index) in keys" :key="index">{{item}}</span>
          <span class="back" @click="delHandle"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cashierPay} from '../api/api';
import myutil from '../commons/myutil';
export default {
    props: {
        orderMoney: {
            type: String,
            default: ''
        },
        channel: {
            type: String,
            default: ''
        },
        loanPay: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...Vuex.mapState('cashier', {
            jsessionid: 'jsessionid'
        })
    },
    data() {
        return {
            showKey: false,
            sessionid: '',
            pwdText: '请输入支付密码',
            borderColor: 'pswBox',
            errorClass: 'leftTip',
            items: [0, 1, 2, 3, 4, 5],
            keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0],
            password: []
        };
    },
    created() {
        this.sessionid = this.jsessionid || tuhu.localStorage.getItem('session');
    },
    methods: {
        keyUpHandle(e) {
            let text = e.currentTarget.innerText;
            let len = this.password.length;
            if (!text || len >= 6) {
                return;
            }
            this.password.push(text);
            this.judgeCode();
        },
        delHandle() {
            this.borderColor = 'pswBox';
            this.errorClass = 'leftTip';
            if (this.password.length <= 0) {
                return false;
            }
            this.password.shift();
        },
        judgeCode() {
            if (this.password.length >= 6) {
                const params = {
                    payWayCode: 'LOAN_CREDIT',
                    exts: {
                        agreementId: this.loanPay.agreementId,
                        payMoney: this.orderMoney * 100,
                        paymentPassword: this.password.join('').replace(/\s/g, '')
                    }
                };
                cashierPay(params, this.sessionid).then((res) => {
                    if (res.code === 'SUCCESS') {
                        if (res.data.returnCode && res.data.returnCode !== 'SUCCESS') {
                            setTimeout(() => {
                                tuhu.alert(res.data.returnMessage);
                            });
                            return;
                        }
                        let params = {};
                        const channel = this.channel;
                        params.payway = 'LOAN_CREDIT';
                        if (res.data.paymentStatus === 'SUCCESS') {
                            params.result = 0;
                        } else {
                            params.result = 1;
                        }
                        if (channel === 'general' || channel === 'shop') {
                            if (tuhu.device.ios) {
                                window.webkit.messageHandlers.thp_inform.postMessage(params);
                            } else {
                                myutil.exeAndroid('thp_inform', params);
                            }
                        } else {
                            location.href = res.data.productShowUrl;
                        }
                    } else {
                        const that = this;
                        tuhu.modal({
                            'text': res.data,
                            'buttons': [
                                {
                                    text: '取消',
                                    close: false,
                                    onClick: function(e) {
                                        tuhu.closeModal(e.selector[0]);
                                        that.password = [];
                                        that.borderColor = 'pswBox';
                                        that.errorClass = 'leftTip';
                                    }
                                }, {
                                    text: '前往重置',
                                    close: false,
                                    onClick: function() {
                                        tuhu.navigateTo({
                                            url: '/pages/cashier/setpassword',
                                            data: {
                                                reset: true,
                                                loanInfo: that.loanPay,
                                                channel: that.channel
                                            }
                                        });
                                        that.handleClose();
                                    }
                                }
                            ]
                        });
            // tuhu.alert(res.data)
                        this.borderColor = 'pswBox2';
                        this.errorClass = 'error';
                    }
                });
            }
            return false;
        },
        clearPwdhandle() {
            this.password = [];
        },
        handleClose() {
            this.showKey = !this.showKey;
        },
        toSetPwd() {
            tuhu.navigateTo({
                url: '/pages/cashier/setpassword',
                data: {
                    reset: true,
                    loanInfo: this.loanPay,
                    channel: this.channel
                }
            });
            this.handleClose();
        }
    }
};
</script>

<style scoped lang="less">
  .keyboardWrap{
    font-family: "Arial","Microsoft YaHei";
    width: 100%;
    max-width: 630px;
    margin:0 auto;
    height:100%;
    .fontColor{
      color: #CC1B23;
    }
    .bg{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      top:0;
      left:0;
    }
    .keyContent{
      position: absolute;
      background-color: #fff;
      right: 0;
      left:0;
      bottom:-22rem;
      padding-top: 1.0rem;
      transition: all .4s;
      &.uptoshow{
        bottom:0;
      }
      .closeBtn{
        position: absolute;
        width:2.7rem;
        height: 2.7rem;
        top:0;
        right: 0;
        background: url(../imgs/close.png) no-repeat center;
        background-size: 0.7rem 0.7rem;
      }
      .topTitle{
        height: 1.0rem;
        line-height: 1.0rem;
        font-size: 0.75rem;
        color:#333;
        text-align: center;
        margin-bottom: 0.75rem;
      }
      .amount{
        font-size: 1.2rem;
        color:#333;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        margin-bottom: 0.75rem;
      }
      .pswBox{
        height: 2.5rem;
        width:16.5rem;
        margin: 0 auto;
        span{
          float: left;
          width:2.75rem;
          height: 2.5rem;
          border:1px solid #999;
          border-right: none;
          position: relative;
          &:last-child{
            border-right: 1px solid #999;
          }
          &.filled{
            &:after{
              content:'';
              position: absolute;
              width:10px;
              height: 10px;
              border-radius: 50%;
              background-color: #333;
              left:50%;
              top:50%;
              transform:translate(-50%,-50%);
            }
          }
        }
      }
      .pswBox2{
        height: 2.5rem;
        width:16.5rem;
        margin: 0 auto;
        span{
          float: left;
          width:2.75rem;
          height: 2.5rem;
          border:1px solid #CC1B23;
          border-right: none;
          position: relative;
          &:last-child{
            border-right: 1px solid #CC1B23;
          }
          &.filled{
            &:after{
              content:'';
              position: absolute;
              width:10px;
              height: 10px;
              border-radius: 50%;
              background-color: #333;
              left:50%;
              top:50%;
              transform:translate(-50%,-50%);
            }
          }
        }
      }
      .tips{
        width:16.5rem;
        height: 1.8rem;
        margin:0 auto 0.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .leftTip{
          font-size: 0.6rem;
          color:#333;
        }
        .error{
          font-size: 0.6rem;
          color: #CC1B23;
        }
        .forgetPsw{
          font-size: 0.6rem;
          color: #999;
        }
      }
      .keyBox{
        overflow:hidden;
        span{
          float:left;
          width:33.3333%;
          height: 2.7rem;
          text-align: center;
          line-height: 2.7rem;
          border:1px solid #999;
          border-left: none;
          border-bottom: none;
          color: #030303;
          font-size: 1.2rem;
          &:nth-child(10){
            background-color: #D1D5DB;
          }
          &:nth-child(12):active{
            background-color: #fff;
          }
          &:nth-child(3n+3){
            border-right: none;
          }
          &.blank{
            background-color: #D1D5DB;
          }
          &.back{
            background: #D1D5DB url(../imgs/back.png) no-repeat center;
            background-size: 1.15rem 0.85rem;
          }
        }
      }
      &.wrong{
        .pswBox{
          span{
            border-color:#999;
          }
        }
        .tips{
          .leftTip{
            color:#333333;
          }
        }
      }
    }


  }
</style>


