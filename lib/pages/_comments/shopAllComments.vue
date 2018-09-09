<template>
  <div class="_content">
    <div class="coWrap comments-all">
      <div class="scrollContent">
        <tuhu-infinite
          @oninfinite="oninfinite"
          endmsg="到底了哦"
          :distance="100"
          :nodata='commentsNoData'
          :end ='commentsEnd'
          :key = '0'
        >
          <div class="productComment" slot="content">
            <ul class="commentList">
              <!-- <li class="mrItem">
                <div class="itemTop">
                  <div class="pic">
                    <img class="img" src="http://resource.tuhu.cn/static/wx/images/shops/xn.png" />
                    <img class="grade" src="http://resource.tuhu.cn/static/wx/images/shops/V1.png" />
                  </div>
                  <div class="rightText">
                    <div class="user">
                      <span class="name">风向标</span>
                      <span class="date">2017.01.25</span>
                    </div>
                    <tuhu-rater></tuhu-rater>
                  </div>
                </div>
                <div class="commentDetail">
                  <div class="commentTxt">
                    服务态度好，还帮我检查了轮胎实际情况，还帮我检查了轮胎实际情况还帮我检查了轮胎实际情况还帮我检查了轮胎实际情况还帮我检查了轮胎实际情况还帮我检查了轮胎实际情况提供专业意见，非常检查了轮胎实际情况，提供专业意见，好好非常检非常检供专业意见，非常检查了业意见，非常检查了业意见
                  </div>
                  <div class="open">全文</div>
                  <div class="commentImg">
                    <img src="https://img1.tuhu.org/comment/6c638e1d/b61242a8ad150efd42ac9989.jpg">
                    <img src="https://img1.tuhu.org/comment/6c638e1d/b61242a8ad150efd42ac9989.jpg">
                    <img src="https://img1.tuhu.org/comment/6c638e1d/b61242a8ad150efd42ac9989.jpg">
                    <img src="https://img1.tuhu.org/comment/6c638e1d/b61242a8ad150efd42ac9989.jpg">
                  </div>
                  <div class="carInfo">
                    <span class="carName">标志508</span>
                    <span class="carService">标准洗车</span>
                  </div>
                </div>
              </li> -->
              <li class="mrItem"
                v-for='(item, index) in commentsList'
                :key='item.CommentID'
              >
                <div class="itemTop">
                  <div class="pic">
                    <img class="img" v-lazy="{src:item.HeadImage?item.HeadImage: 'https://res.tuhu.org/Image/UserCenter/headimg_d.png', width: '1.3'}"/>
                    <!-- <img class="grade" src="http://resource.tuhu.cn/static/wx/images/shops/V1.png" />
                    UserLevel -->
                    <img class="grade" v-lazy="{src:level[item.UserLevel]}"/>
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
                  <!-- <div>{{ $this'comment'+item.CommentId}}</div> -->
                  <div class="open" v-if='item.CommentContent.length>65' @click="changeState(index)" v-cloak>{{flags[index] === true ? '收起' : '全文'}}</div>
                  <div class="commentImg" >
                    <img
                      class="img"
                      v-for='(item2, index2) in item.CommentImages'
                      :key='index2'
                      v-if='index2 < 4'
                      v-lazy="{src:item2, width:3.5, height:3.5, group: index + group1}"
                    />
                  </div>
                  <div class="carInfo">
                    <span class="carName" v-text="item.CarTypeDes"></span>
                    <span class="carService" v-text="item.InstallShop"></span>
                  </div>
                  <!-- <div class="reply">
                    <div class="replyperson">途虎回复</div>
                    <div class="date">2016.01.05</div>
                  </div>
                  <div class="tuhuReply">这里显示官方回复，途虎感谢您的支持！这里显示官方复，途虎感谢您的支持！</div> -->
                </div>
              </li>
            </ul>
          </div>
        </tuhu-infinite>
      </div>
    </div>
  </div>
</template>
<script>
import v0 from '../../imgs/v0.png'
import v1 from '../../imgs/v1.png'
import v2 from '../../imgs/v2.png'
import v3 from '../../imgs/v3.png'
import v4 from '../../imgs/v4.png'
export default {
  data () {
    return {
      // options: {
      //   productId: 'TR-YK-A349'
      // },
      titles: [{
        name: '全部',
        number: ''
      }, {
        name: '晒图',
        number: ''
      }],
      fetchCommentsParams: {
        'UserId': '',
        'shopId': '',
        'type': '',
        'pageIndex': 1,
        'pageSize': 10
      },
      commentsList: [], // 评论列表
      commentsNoData: false, // 评论是否没有内容
      commentsEnd: false, // 评论是否到底
      commentsTotalPage: 1, // 评论总页数
      resolve: () => {},
      reject: () => {},
      flags: [],
      level: {
        V0: v0,
        V1: v1,
        V2: v2,
        V3: v3,
        V4: v4
      }
    }
  },
  beforeCreate() {
  },
  created() {
    tuhu.getUserInfo({
      force: false
    })
      .then((user) => {
        this.fetchCommentsParams = {
          ...this.fetchCommentsParams,
          shopId: this.options.shopId,
          type: this.options.type,
          UserId: user.userid
        }
      })
  },
  computed: {
    group1() {
      return tuhu.util.getGroup()
    }
    // allImages: function() {
    //   let allImages = []
    //   this.imagesList.forEach(element => {
    //     allImages = allImages.concat(element.CommentImages)
    //   })
    //   return allImages
    // }
    // flags: function() {
    //   let a = new Array(this.commentsList.length)
    //   a.fill(false)
    //   return a
    // }
  },
  watch: {
    fetchCommentsParams: {
      handler (value, oldValue) {
        let isRefersh = true
        if (value.pageIndex !== oldValue.pageIndex) {
          isRefersh = false
        }
        if (isRefersh) {
          this.commentsEnd = false
        }
        if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
          this.getComments(isRefersh)
        }
      },
      deep: true
    },
    commentsList: {
      handler (value) {
        let a = new Array(value.length)
        a.fill(false)
        this.flags = a
      }
    }
  },
  methods: {
    openPhotoBrowser(photos) {
      tuhu.photoBrowser({
        photos: photos
      })
    },
    oninfinite(ev, resolve, reject) {
      this.fetchCommentsParams = {
        ...this.fetchCommentsParams,
        pageIndex: this.fetchCommentsParams.pageIndex + 1
      }
      this.resolve = resolve
      this.reject = reject
    },
    // 获取评价信息
    getComments(isRefersh) {
      let canFetch = false
        // 评论
      if (this.commentsTotalPage >= this.fetchCommentsParams.pageIndex && (!this.commentsEnd)) {
        canFetch = true
      }
      if (canFetch) {
        tuhu.fetch('https://api.tuhu.cn/Comment/SelectShopComments', {
          methods: 'POST'
        }, {
          query: this.fetchCommentsParams,
          status: false
        })
        .then((res) => {
          if (isRefersh) {
            this.commentsList = res.Comments
          } else {
            this.commentsList.push(...res.Comments)
          }
          if (res.Comments.length === 0 || res.TotalPage === 0) {
            this.commentsNoData = true
          }
          this.commentsTotalPage = res.TotalPage
          if (res.TotalPage === 1 || this.fetchCommentsParams.pageIndex + '' === this.commentsTotalPage + '') {
            this.commentsEnd = true
            this.reject()
          }
          this.resolve()
        })
      }
    },
    changeState(k) {
      // this.flags[k] = !this.flags[k]
      this.$set(this.flags, k, !this.flags[k])
    }
  }
}
</script> 
<style scoped lang="less">
 .comments-all .infinite-scroll-preloader {
    position: relative;
  }
.content.infinite-scroll.infinite-scroll-bottom.native-scroll{
  position: relative;
  
}
// .infinite-scroll-preloader .preloader{
//   position: relative;
// }
.tabsnew{
  height: 100%;
}
.swiper-slide{
  padding-top: 2rem;
}
.weui-cell {
  position: relative;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
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

.coWrap {
  
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  .scrollContent {
    flex: 1;
    overflow-y: auto;
    background-color: rgba(238, 238, 238, 1);
    height: 100%;
      .productComment{
      .commentList {
        background: #fff;
        width: 100%;
        padding: 0;
        margin: 0;
        .mrItem {
          padding: 0.5rem 0.75rem;
          .itemTop {
            width: 100%;
            height: 1.25rem;
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: row;
            .pic {
              width: 1.25rem;
              height: 1.25rem;
              margin-right: 0.4rem;
              position: relative;
              .img {
                width: 1.25rem;
                min-height: 1.25rem;
                max-height: 1.25rem;
                border-radius: 50%;
              }
              .grade {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                vertical-align: middle;
                margin-left: 0.15rem;
              }
            }
            .rightText {
              flex: 1;
              .user {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 0.75rem;
                line-height: 0.75rem;
                margin-bottom: 0.1rem;
                .name {
                  font-size: 0.7rem;
                  color: rgba(34, 34, 34, 1);
                }

                .date {
                  font-size: 0.6rem;
                  color: rgba(153, 153, 153, 1);
                }
              }
            }
          }
          .commentDetail {
            margin-left: 1.4rem;

            .commentTxt {
              font-size: 0.7rem;
              color: rgba(102, 102, 102, 1);
              line-height: 1rem;
              position: relative;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              position: relative;
              &.expanded {
                display: -webkit-box;
                -webkit-line-clamp: initial !important;
                -webkit-box-orient: vertical;
                position: relative;
              }
            }
            .open{
              margin-top:0.2rem;
              font-size: 0.6rem;
              color: rgba(82, 125, 176, 1);
            }
            .commentImg {
              margin-top: 0.75rem;
              overflow: hidden;
              display:flex;
              flex-direction:row;
              // justify-content:space-between;
              img {
                width: 3.5rem;
                height: 3.5rem;
                margin-right: 0.4rem;
                max-height: 3.5rem;
                min-height: 3.5rem;
                max-width: 3.5rem;
                min-width: 3.5rem;
              }
            }
            .carInfo {
              height: 0.6rem;
              line-height: 0.6rem;
              margin-top: 0.5rem;
              font-size: 0.6rem;
              color: rgba(153, 153, 153, 1);
              .carName {
                margin-right: 0.5rem;
              }
            }
            .reply {
              width: 100%;
              position: relative;
              margin-top: 0.5rem;
              font-size: 0.7rem;
              color: rgba(102, 102, 102, 1);
              line-height: 0.95rem;
              display:flex;
              flex-direction:row;
              align-items:baseline;
              .replyperson {
                color: rgba(245, 124, 51, 1);
                margin-right:0.2rem;
              }
              .date{
                font-size: 0.5rem;
                color: rgba(153, 153, 153, 1);
              }
            }
            .tuhuReply {
              word-break: break-all;
              margin-top: 0.2rem;
              font-size: 0.65rem;
              color: rgba(102, 102, 102, 1);
              .deepcolor {
                color: rgba(245, 124, 51, 1);
              }
            }
          }
          .weui-cell;
        }
      }
    }
    .commentPicture{
      width:100%;
      height:100%;
      
      ul{
        padding:1rem 0.75rem;
        background-color:#fff;
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:space-between;
        margin: 0;
        li{
          height: 5.4rem;
            width: 5.4rem;
            margin-bottom:0.5rem;
            background-color: rgba(238, 238, 238, 1);
            display:flex;
            align-items:center;
            justify-content:center;
          img{
            height: 5.4rem;
            min-height: 5.4rem;
            max-height: 5.4rem;
            width: 5.4rem;
            min-width: 5.4rem;
            max-width: 5.4rem;
          }
          img[src*='loading']{
            width:2rem;
            height:2rem;
          }
        }
      }
      .nocomment{
        height:100%;
        width:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        .img{
          height: 3.5rem;
          max-height: 3.5rem;
          min-height: 3.5rem;
          width: 3.5rem;
          max-width: 3.5rem;
          min-width: 3.5rem;
          margin-bottom:0.6rem;

          img{
            height: 3.5rem;
            min-height: 3.5rem;
            max-height: 3.5rem;
            width: 3.5rem;
            min-width: 3.5rem;
            max-width: 3.5rem;
          }
        }
        p{
          font-size: 0.65rem;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }
}

</style>
