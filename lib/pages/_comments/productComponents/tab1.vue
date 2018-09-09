<template>
  <div>
    <tuhu-infinite
      @oninfinite="oninfinite"
      endmsg="没有更多评价"
      :distance="100"
      :nodata='nodata'
      :end ='end'
      v-if='commentsList.length>0'
    >
      <div class="productComment" slot="content"   >
        <ul class="commentList">
          <comment
            v-for='item in commentsList'
            :key='item.CommentID'
            :commentData='item'
          />
          <!-- <li class="mrItem"
            v-for='(item, index) in commentsList'
            :key='item.CommentID'
          >
            <div class="itemTop">
              <div class="pic">
                <img class="img" v-lazy="{src:item.HeadImage, width:'1.3'}"/>
                <img class="grade" src="http://resource.tuhu.cn/static/wx/images/shops/V1.png" />
              </div>
              <div class="rightText">
                <div class="user">
                  <span class="name" v-text="item.UserName"></span>
                  <span class="date" v-text="item.CommentTime"></span>
                </div>
                <tuhu-rater :point='item.CommentR1' />
              </div>
            </div>
            <div class="commentDetail">
              <div :class="flags[index] === true ? 'commentTxt expanded' : 'commentTxt'" v-text="item.CommentContent"></div>
              <div class="open" @click="changeState(index)" v-cloak>{{flags[index] === true ? '收起' : '全文'}}</div>
              <div class="commentImg" >
                <img
                  class="img"
                  v-for='(item2, index2) in item.CommentImages'
                  :key='index2'
                  v-lazy="{src:item2, width: 3.5, group: index + group1}"
                />
              </div>
              <div class="carInfo">
                <span class="carName" v-text="item.CarTypeDes"></span>
                <span class="carService" v-text="item.InstallShop"></span>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
    </tuhu-infinite>
  </div>
</template>
<script>
// 评论card
import comment from './commentCard'
const getListUrl = 'https://api.tuhu.cn/Comment/GetProductComments'
export default {
  components: {
    comment: comment
  },
  props: {
    tab1Data: {
      type: Object,
      defalut: true
    }
  },
  data() {
    return {
      nodata: false,
      end: false,
      commentsList: [],
      PageNumber: 1,
      maxPageCount: 1,
      tabData: this.tab1Data,
      resolve: () => {},
      reject: () => {}
    }
  },
  watch: {
    PageNumber(value, oldValue) {
      // 第一次请求发送
      if (value === 1) {
        this.getList(true)
      } else if (value) {
        this.getList(false)
      }
    }
  },
  methods: {
    getList(isRefersh = false) {
      tuhu.fetch(getListUrl, {}, {
        query: {
          productId: this.tabData.productId,
          commentType: 0,
          PageNumber: this.PageNumber
        }
      })
        .then((res) => {
          if (isRefersh) {
            this.commentsList = res.Data
          } else {
            this.commentsList.push(...res.Data)
          }
          // 第一次请求就结束的两种情况
          if (res.MaxPageCount === 1) {
            this.end = true
          }
          if (res.MaxPageCount === 0) {
            this.nodata = true
          }
          this.maxPageCount = res.MaxPageCount
          this.resolve()
        })
    },
    oninfinite: function(ev, resolve, reject) {
      // 如果当前页数小于总页数，增加页数
      if (this.PageNumber < this.maxPageCount) {
        this.PageNumber = this.PageNumber + 1
        this.resolve = resolve
      } else {
        this.end = true
      }
    }
  },
  updated() {
    this.tabData = this.tab1Data
  },
  created() {
    this.getList()
  }
}
</script>
<style scoped lang="less">
.productComment{
  .commentList {
    background: #fff;
    width: 100%;
    padding: 0;
    margin: 0;
    padding-top: 2.5rem;
  }
}
</style>

