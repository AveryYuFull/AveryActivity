<template>
  <li class="mrItem">
    <div class="itemTop">
      <div class="pic">
        <img class="img" v-lazy="{src:commentData.HeadImage? commentData.HeadImage :'https://res.tuhu.org/Image/UserCenter/headimg_d.png' , width:'1.3'}"/>
        <img class="grade" v-lazy="{src:level[commentData.UserGrade]}"/>
      </div>
      <div class="rightText">
        <div class="user">
          <div class="name">
            <span class="username">
              {{commentData.UserName}}
            </span>
            <span class="carName">
              {{commentData.CarTypeDes}}
            </span>
          </div>
          <span class="date" v-cloak>{{commentData.CommentTime}}</span>
        </div>
        <tuhu-rater :point='commentData.CommentR1' />
      </div>
    </div>
    <div class="commentDetail">
      <div :class="expanded ? 'commentTxt expanded' : 'commentTxt'" v-text="commentData.CommentContent"></div>
      <div  v-if='commentData.CommentContent.length>65' class="open" @click="changeState" v-cloak>{{expanded ? '收起' : '全文'}}</div>
      <div class="commentImg" >
        <img
          class="img"
          v-for='(item, index) in commentData.CommentImages'
          :key='index'
          v-if='index < 4'
          v-lazy="{src:item, width: 3.5, height:3.5, group: group1}"
        />
      </div>
      <div class="carInfo">
        <!-- <span class="carName" v-text="commentData.CarTypeDes"></span> -->
        <span class="carService" >{{commentData.InstallShop && commentData.InstallShop}}</span>
        <span class="bytime" v-cloak>购买时间：{{commentData.OrderTime&&commentData.OrderTime}}</span>
      </div>
    </div>
  </li>
</template>

<script>
import v0 from '../../../imgs/v0.png'
import v1 from '../../../imgs/v1.png'
import v2 from '../../../imgs/v2.png'
import v3 from '../../../imgs/v3.png'
import v4 from '../../../imgs/v4.png'
export default {
  computed: {
    group1() {
      return tuhu.util.getGroup()
    }
  },
  props: {
    commentData: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      expanded: false, // 是否展开
      level: {
        V0: v0,
        V1: v1,
        V2: v2,
        V3: v3,
        V4: v4
      }
    }
  },
  methods: {
    changeState() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped lang="less">
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
          display: flex;
          width: 13rem;
          .username{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 5rem;
            margin-right: 0.5rem;
          }
          .carName {
            font-size: 0.6rem;
            color: rgba(153, 153, 153, 1);
            display: inline-flex;
            justify-content: space-between;
            margin-right: 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 8rem;
            display: block;
          }
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
        // width: 3.5rem;
        // height: 3.5rem;
        height:3.5 rem;
        max-height: 3.5rem;
        min-height: 3.5rem;
        width:3.5 rem;
        max-width: 3.5rem;
        min-width: 3.5rem;
        margin-right: 0.4rem;
      }
    }
    .carInfo {
      // height: 0.6rem;
      // line-height: 0.7rem;
      margin-top: 0.5rem;
      font-size: 0.6rem;
      color: rgba(153, 153, 153, 1);
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .carName {
        margin-right: 0.5rem;
      }
      .carService{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        position: relative;
      }
      .bytime{
        flex-shrink: 0;
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
}
</style>
