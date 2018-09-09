<template>
  <div class='_content'>
    <div class='search-page'>
      <div class='search-input'>
        <input
          :placeholder="DefaultSearchKeyWord.Keywords"
          @keyup.enter="submit"
          v-model="value"
          v-focus
          type='search'
          ref='search'
        />
        <div class='search-button' @click="submit" v-if="value">搜索</div>
        <div class='search-button' @click='hindleBack' v-else>取消</div>
      </div>
      <div class='search-content'>
        <div class='search-hot'>
          <div class='hot-title'>热门搜索</div>
          <div class='hot-word'
            v-for='(item,index) in hotSearchKeyWord'
            :key='index'
            v-cloak
            @click='hindleClickHistory(item)'
          >
            {{item}}
          </div>
        </div>
        <div v-if='!userInfo.islogin' class='search-history'>
          <div class='history-title'>历史搜索</div>
          <div class='login-button' @click.stop="tologin">点击登录 查看历史搜索记录</div>
        </div>
        <div v-else class='search-history'>
          <div class='history-title'>历史搜索</div>
          <tuhu-swipeout
            v-for='(item, index) in historys'
            :key='item.Word'
            @onDelete="handleDelect(item ,index)"
          >
            <div class='history-word'
              @click.stop='hindleClickHistory(item.Word)'
              v-cloak
            >
              <div class='word'>{{item.Word}}</div>
              <div class='brands'
                @click.stop='hindleClickHistory(`${item2}${item.Word}`)'
                v-for='item2 in item.KeyWordBrands'
                :key='item2'
                v-cloak
              >
                {{item2}}
              </div>
            </div>
          </tuhu-swipeout>
          <div class='history-button' v-if='historys.length>0' @click='handleDelect'>清空历史搜索记录</div>
          <div v-else class='no-history'>没有历史记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * author: lijingwen@tuhu.cn
 * date: 2017/11/20
 * desc: 搜索主页面
 */
  export default {
    data () {
      return {
        // isApp: false,
        // isWeixin: false
        userInfo: '',
        value: this.options ? this.options.keyword : '',
        hotSearchKeyWord: [],
        DefaultSearchKeyWord: '',
        historys: [],
        HistorySearch: tuhu.localStorage.getItem('HistorySearch') ? JSON.parse(tuhu.localStorage.getItem('HistorySearch')) : []
      }
    },
    props: {
    },
    beforeCreate() {
      this.isApp = tuhu.device.isApp
      this.isWeixin = tuhu.device.isWeixin
      this.isAndroid = tuhu.device.android
      this.isIos = tuhu.device.ios
    },
    created() {
      this.initData()
    },
    watch: {
      userInfo: {
        handler(value, oldValue) {
          if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
            if (value.islogin) {
              this.getSearchHistory()
            }
          }
        },
        deep: true
      }
    },
    methods: {
      tologin() {
        tuhu.getUserInfo({
          force: true
        })
          .then((res) => {
            this.userInfo = res
          })
      },
      // 初始化数据
      async initData() {
        this.getHotWord()
        await this.getUserInfo()
        // if (this.userInfo.islogin) {
        //   await this.getSearchHistory()
        // }
      },
      // 获取热搜词和input默认值
      async getHotWord() {
        tuhu.fetch('https://api.tuhu.cn/Search/SelectDefaultAndHotSearchKeyWord', {
          method: 'GET'
        }, {
          status: false
        })
        .then((res) => {
          this.hotSearchKeyWord = res.HotSearchKeyWord
          this.DefaultSearchKeyWord = res.DefaultSearchKeyWord
        })
      },
      // 获取用户信息
      async getUserInfo() {
        let user = {}
        if (tuhu.store === undefined) {
          await tuhu.getUserInfo({force: false})
            .then((res) => {
              user = res
            })
        } else {
          user = await tuhu.store.state._userInfo
        }
        this.userInfo = user
      },
      // 获取用户历史记录
      async getSearchHistory() {
        tuhu.fetch('https://api.tuhu.cn/Search/SelectSearchHistoryV2', {
          method: 'GET'
        }, {status: false})
        .then((res) => {
          this.historys = res.SearchHistory
        })
      },
      declectHistory(value, index) {
        if (index !== undefined) {
          // 删除一个
          this.historys.splice(index, 1)
        } else {
          // 删除所有
          this.historys = []
        }
        tuhu.fetch('https://api.tuhu.cn/Search/ClearSearchHistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            word: value
          })
        })
          .then((res) => {
            console.log('res: ', res)
          })
      },
      handleDelect(item, index) {
        if (item === undefined) {
          this.declectHistory()
        } else {
          this.declectHistory(item.Word, index)
        }
      },
      hindleBack() {
        tuhu.navigateBack()
      },
      async toList(value) {
        if (!value && tuhu.autoNavigate !== undefined) {
          this.$refs.search.blur()
          // 跳转到活动页
          tuhu.autoNavigate(this.DefaultSearchKeyWord)
          return
        }
        if (value) {
          // tuhu.navigateTo({
          tuhu.redirectTo({
            url: '/pages/_search/list',
            query: {keyword: value}
          })
        }
      },
      // 插入历史记录
      async insertSearchHistory(value) {
        if (value !== '') {
          await tuhu.fetch('https://api.tuhu.cn/Search/InsertSearchHistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              word: value
            })
          }, {status: false})
            .then((res) => {
            })
        }
      },
      // 输入框点击回车
      submit(e) {
        this.hindleClickHistory(this.value)
      },
      // 点击搜索历史
      async hindleClickHistory(word) {
        this.insertSearchHistory(word)
        this.toList(word)
      }
    }
  }
</script>

<style scoped lang="less">
.swiper-container{
  padding-bottom: 1px;
  width: 100%;
}
._content{
  display: flex;
  
}
.search-page{
  background-color: #fff;
  position: relative;
  display: flex;
  overflow-x: auto;
  width:100%;
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
      padding-left: 1.3rem;
      background-color: rgba(238, 238, 238, 1);
      border: none;
      border-radius: 1rem;
      line-height: 1.4rem;
    }
    &:before{
      content: '';
      background: url(https://res.tuhu.org/images/xcx/search.png) no-repeat;
      background-size: 100%;
      display: block;
      width: 13px;
      height: 13px;
      margin-right: -20px;
      vertical-align: -1px;
      margin-top: 2px;
      z-index: 111;
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
    padding-top: 3.5em;
    font-size: 0.7rem;
    width:100%;
    .hot-title,.history-title{
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: left;
    }
    .search-hot{
      padding: 0.5rem;
      .hot-word{
        border: 2px solid rgba(238, 238, 238, 1);
        border-radius: 5px;
        display: inline-block;
        color: rgba(102, 102, 102, 1);
        padding: 0.2rem;
        margin-top: 0.4rem;
        margin-right: 0.4rem;
      }
    }
    .search-history{
      // padding: 0.5rem;
      width:100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .history-title{
        margin-left: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        width: 100%;
      }
      .login-button{
        color: #df3348;
        margin: 1rem;
        border: 1px solid;
        padding: 0.2rem;
        border-radius: 0.2rem;
      }
      .history-word{
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        margin-left: 0.5rem;
        width: 100%;
        display: flex;
        padding: 0.5rem 0;
        font-size: 0.65rem;
        align-items: center;
        .word{
          flex-grow: 1;
          text-align: left;
        }
        .brands{
          flex-grow: 0;
          color: #9e9e9e;
          background-color: #f1f1f1;
          padding: 0.1rem 0.4rem;
          border-radius: 0.2rem;
          font-size: 0.6rem;
          font-weight: 200;
          margin-right: 0.5rem;
        }
      }
      .history-button{
        color: #666666;
        border: 1px solid #bfbfbf;
        width: fit-content;
        border-radius: 5px;
        margin: 1rem auto;
        padding: 0.5rem 1.5rem;
      }
      .no-history{
        text-align: center;
        padding: 0.5rem;
        color: #a9a8a8;
      }
    } 
  }
}
</style>