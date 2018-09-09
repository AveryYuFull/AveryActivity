<template>
  <div class="_content">
    <div class="inWrap">
        <div class="header">
          <div class="close" @click="back"></div>
          <!-- <div class="zhuce">注册</div> -->
        </div>
        <div class="logo">
          <img src="../../imgs/logo.png" width="100%" />
        </div>
        <div class="userInfo">
          <div class="name">
            <div class="nameinput">
              <input v-model="phone" type="number" placeholder="手机号" maxlength="11" />
              <div class="clear" @click="clear('phone')" v-show="phone.length > 0"></div>
            </div>
            <div :class="'getyzm ' + yzmClass" @click="getCode" v-text="codeText">

            </div>
          </div>
          <div class="yanzhengma">
            <div class="yzminput">
              <input type="number" placeholder="验证码" maxlength="4" v-model="code" :readonly="readonly"/>
              <div class="clear" @click="clear('code')"  v-show="code.length > 0"></div>
            </div>
          </div>
          <!-- <p class="yuyin"><span>语音验证码</span></p> -->
        </div>
        <div :class="'loginBtn ' + codeClass" @click="signIn">
          验证并登录
        </div>
        <div class="rules" @click="goToAgreement">
          新用户登录即完成注册，代表同意<a href="user_agreement.html">《途虎用户协议》</a>
          <!--注册代表同意《途虎用户协议》-->
        </div>
      </div>
    </div>
</template>

<script>
const TONGDUN_CHANNEL = 'TongDunWx'

const UUID = tuhu.util.uuid()

export default {
  data() {
    return {
      locked: false,
      phone: '',
      _loginSuccess: false,
      _blackBox: null,
      readonly: true,
      code: '',
      yzmClass: '',
      codeClass: '',
      codeText: '获取验证码'
    }
  },
  beforeDestroy() {
    if (!this._loginSuccess) {
      this.options.resolve({
        islogin: false
      })
    }
  },
  watch: {
    phone(val) {
      if (val.length > 11) {
        this.phone = val.substr(0, 11)
        return
      }

      if (val.length === 11 && /\d{11}/.test(val)) {
        this.yzmClass = 'active'
      } else {
        this.yzmClass = ''
      }
    },
    code(val) {
      if (val.length === 4 && /\d{4}/.test(val)) {
        this.codeClass = 'active'
      } else {
        this.codeClass = ''
      }
    },
    yzmClass(val) {
      if (val === 'djs') {
        let times = 60
        this.codeText = times-- + '秒后重发'
        const interval = setInterval(() => {
          this.codeText = times-- + '秒后重发'

          if (times < 0) {
            this.locked = false
            this.yzmClass = 'active'
            this.codeText = '获取验证码'
            clearInterval(interval)
          }
        }, 1000)
      }
    }
  },
  methods: {
    // _getBlackBox() {
    //   if (!this._blackBox) {
    //     this._blackBox = getBlackBox().then(() => {
    //       return tuhu.util.getCookie('_fmdata')
    //     })
    //   }

    //   return this._blackBox
    // },
    clear(val) {
      this[val] = ''
    },
    goToAgreement() {
      return tuhu.navigateTo({
        url: '/pages/_login/agreement'
      })
    },
    back() {
      return tuhu.navigateBack()
    },
    signIn() {
      if (!this.codeClass) {
        return
      }
      const formData = new FormData()
      formData.append('Phone', this.phone)
      // formData.append('black_box', blackBox)
      formData.append('channel', TONGDUN_CHANNEL)
      formData.append('event_id', 'Login_web_20171031')
      formData.append('code', this.code)

      tuhu.fetch('https://api.tuhu.cn/User/SignIn', {
        method: 'post',
        body: formData,
        headers: {
          'TongDun-TokenId': UUID
        }
      }).then((data) => {
        // {"userinfo":{"usersession":"939744706d0442d3adb65b2e57ebcf1a"},"username":"曹先生","RealName":"曹忠平","userid":"{f44906e9-7ce9-48ea-bedb-80cec47039d7}","userlevel":"银卡会员","userAvatar":"/Image/Product/zhilaohu.png","NewUser":"0","isNewUser":falsenumberNumber":"13761117808","IsNewMember":"0","HeadImage":"https://img4.tuhu.org/UserHead/1cce9318/8a4c4b858d0e71a58b1c34be.jpg@100Q.jpg","Sex":"男","Code":1,"Status":"1","Message":"登录成功","userchat":"CC168BF7B293AF2317E8A4E6F4625D58","OpenID":"o7XCEt8Xp9wTllSSwdcn1aoWyYL8","QQOpenID":null,"HWopenId":null}
        if (data && data.userinfo && data.userinfo.usersession) {
          tuhu.fetch('https://wx.tuhu.cn/user/SetLoginCookie', {
            method: 'post',
            headers: {
              authorization: 'Bearer ' + data.userinfo.usersession
            },
            credentials: 'include'
          }).then(() => {
            this._loginSuccess = true
            if (!this.options.direct) {
              tuhu.navigateBack()
            }

            const userInfoPromise = tuhu._setUserInfo(data)
            tuhu.car.addLoginedCar().then(() => {
              this.options.resolve(userInfoPromise)
            }).catch((e) => {
              this.options.resolve(userInfoPromise)
            })
          })
        } else {
          tuhu.toast(data.Message || '网络异常')
        }
      }).catch(() => {
        return {
          islogin: false
        }
      })

      // this._getBlackBox().then((blackBox) => {

      // }).catch(() => {
      //   return {
      //     islogin: false
      //   }
      // })
    },
    async getCode() {
      if (this.locked) {
        return
      }
      if (!this.yzmClass) {
        return
      }

      this.locked = true

      await tuhu.util.setBlackBox()

      const formData = new FormData()
      formData.append('Phone', this.phone)
      // formData.append('black_box', blackBox)
      tuhu
      .fetch('https://api.tuhu.cn/User/GetIdentityCode', {
        method: 'post',
        body: formData,
        headers: {
          'TongDun-TokenId': UUID
        }
      })
      .then(data => {
        if (data.Code === 1) {
          this.yzmClass = 'djs'
          this.readonly = false
        } else {
          this.locked = false
          tuhu.toast(data.Message || '网络异常')
        }
      }).catch(() => {
        this.locked = false
      })
    }
  }
}
</script>
<style scoped>
input::-webkit-input-placeholder {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
input::-moz-placeholder {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
input {
  border: 0;
  line-height: normal;
  outline:none;
  -webkit-appearance: none;
}
.weui-cell {
  position: relative;
}
.weui-cell::before {
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
.inWrap {
  width: 100%;
  height: 100%;
  background: url(../../imgs/beijing.png) no-repeat;
  background-size: cover;
  background-color: #fff;
}
.inWrap .header {
  display: flex;
  justify-content: space-between;
  padding: 34px 15px 0;
}
.inWrap .header .close {
  background: url(../../imgs/close.png) no-repeat;
  width: 16px;
  height: 16px;
  background-size: contain;
}
.inWrap .header .zhuce {
  font-size: 14px;
  color: #666666;
}
.inWrap .logo {
  margin-top: 44px;
}
.inWrap .logo img {
  width: 54px;
  height: 54px;
  margin: 0 auto;
  display: block;
}
.inWrap .userInfo {
  margin-top: 60px;
  padding: 0 30px;
}
.inWrap .userInfo .name {
  display: flex;
  justify-content: space-between;
  height: 49px;
  align-items: center;
  position: relative;
}
.inWrap .userInfo .name .nameinput {
  flex: 1;
  height: 100%;
  position: relative;
}
.inWrap .userInfo .name .nameinput input {
  height: 48px;
  padding-left: 30px;
  width: 150px;
  border:0;
  font-size: 14px;
  color: #333333;
  background-color: rgba(255,255,255,0);
}
.inWrap .userInfo .name .nameinput .clear {
  background: url(../../imgs/delete.png) no-repeat;
  background-size: contain;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
  top: 16px;
}
.inWrap .userInfo .name .getyzm {
  width: 95px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background-color: #d9d9d9;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
}
.inWrap .userInfo .name .getyzm.djs {
  color: #808080;
}
.inWrap .userInfo .name .getyzm.active {
  background-color: #df3348;
}
.inWrap .userInfo .name:after {
  content: "";
  position: absolute;
  left: 0px;
  top: 16px;
  background: url(../../imgs/phone.png) no-repeat;
  background-size: contain;
  width: 18px;
  height: 18px;
}
.inWrap .userInfo .name::before {
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
.inWrap .userInfo .yanzhengma {
  height: 49px;
  display: flex;
  position: relative;
}
.inWrap .userInfo .yanzhengma .yzminput {
  flex: 1;

  height: 100%;
  position: relative;
}
.inWrap .userInfo .yanzhengma .yzminput input {
  height: 48px;
  border: 0;
   padding-left: 30px;
  font-size: 14px;
  color: #333;
  text-align: left;
    width: 150px;
  background-color: rgba(255,255,255,0);
}
.inWrap .userInfo .yanzhengma .yzminput .clear {
  background: url(../../imgs/delete.png) no-repeat;
  background-size: contain;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
  top: 16px;
}
.inWrap .userInfo .yanzhengma:after {
  content: "";
  position: absolute;
  left: 0px;
  top: 16px;
  background: url(../../imgs/yzm.png) no-repeat;
  background-size: contain;
  width: 18px;
  height: 18px;
}
.inWrap .userInfo .yanzhengma::before {
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
.inWrap .userInfo .yuyin {
  text-align: right;
  margin-top: 5px;
}
.inWrap .userInfo .yuyin span {
  font-size: 12px;
  color: #666666;
}
.inWrap .loginBtn {
  margin: 0 30px;
  margin-top: 30px;
  height: 48px;
  line-height: 48px;
  background-color: #d9d9d9;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
  font-size: 16px;
}
.inWrap .loginBtn.active {
  background-color: #df3348;
}
.inWrap .rules {
  color: #999999;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.inWrap .rules a {
  color: #4a90e2;
}

body {
  border: 1px red solid;
}
</style>
