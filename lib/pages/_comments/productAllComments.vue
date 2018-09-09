<template>
  <div class="_content">
    <div class="coWrap comments-all">
      <div class="scrollContent">
        <tuhu-tabsnew class='tabsnew' :titles="titles" :active-index="0">
          <tuhu-swiper :haspagination="false" slot="content">
            <div slot="content" :key="1" class="swiper-slide">
              <!-- 评论 infinite -->
              <tab1 :tab1Data='tabData'/>
            </div>
            <div slot="content" :key="2" class="swiper-slide">
              <!-- 图片infinite -->
              <tab2 :tab2Data='tabData'/>
            </div>
          </tuhu-swiper>
        </tuhu-tabsnew> 

      </div>
    </div>
  </div>
</template>
<script>
import tab1 from './productComponents/tab1'
import tab2 from './productComponents/tab2'
export default {
  components: {
    tab1: tab1, // 评论 infinite
    tab2: tab2 // 图片 infinite
  },
  data () {
    return {
      tabData: {
        productId: this.options.productId
      },
      titles: [] // tab初始化
    }
  },
  beforeCreate() {
  },
  created() {
    // 获取tab信息
    this.GetCommentStatistic()
  },
  methods: {
    GetCommentStatistic() {
      tuhu.fetch('https://item.tuhu.cn/Comment/GetCommentStatistic.html', {}, {
        query: {productId: this.tabData.productId}
      })
        .then((res) => {
          this.titles = [{
            name: '全部',
            number: res.AllNum
          }, {
            name: '晒图',
            number: res.ImageNum
          }]
        })
    }
  }
}
</script> 
<style scoped lang="less">
// <style scoped lang="less">
 .comments-all .infinite-scroll-preloader {
    position: relative;
  }
.content.infinite-scroll.infinite-scroll-bottom.native-scroll{
  position: relative;
  
}
.infinite-scroll-preloader .nomore{
  border: 1px solid;
}
// .infinite-scroll-preloader .preloader{
//   position: relative;
// }
.tabsnew{
  height: 100%;
}
.swiper-slide{
  padding-top: 2.5rem;
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
          border-bottom: 1px solid rgba(217, 217, 217, 1);
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
                height: 1.25rem;
                min-height: 1.25rem;
                max-height: 1.25rem;
                width: 1.25rem;
                min-width: 1.25rem;
                max-width: 1.25rem;
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
              justify-content:space-between;
              img {
                // width: 3.5rem;
                // height: 3.5rem;
                height: 3.5rem;
                max-height: 3.5rem;
                min-height: 3.5rem;
                width: 3.5rem;
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
      // height:100%;
      
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
          width: 3.5rem;
          margin-bottom:0.6rem;

          img{
            height: 3.5rem;
            width: 3.5rem;
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
