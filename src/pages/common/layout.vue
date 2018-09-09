<template>
  <div class="_content">
    <!-- <header v-if="title" id="title" class="bar bar-nav" style="z-index:9999;">
      <a id="myback" class="icon icon-left pull-left"></a>
      <h1 class="title"></h1>
    </header> -->
    <template v-if="tabs">
      <div class="page-group" v-for="(item, index) in tabs" v-show="index === tabIndex" :key="index"></div>
      <nav id="tuhu-tabbar" class="tuhu-tabbar">
        <div
          @click="switchTab(index)"
          v-for="(item, index) in tabs"
          :key="index"
          :class="'item' + (index === tabIndex ? ' current' : '') + (index === parseInt((tabs.length+1)/2)-1 ? '' : '')"
        >
          <img
            :src="(index === tabIndex ? item.activeImg : item.img)"
          >
          <div class='txt' v-text="item.title"></div>
        </div>
      </nav>
    </template>
    <template v-else>
      <div class="page-group"></div>
    </template>
  </div>
</template>

<style lang="scss">
/*头部样式外部要注意不要和公共头部同名*/
// #title.bar{
//   background:#fff;
// }
// #title.bar h1.title{
//   margin: 0;
//   height: 2.2rem;
//   line-height: 2.2rem;
//   text-align: center;
//   font-size: 0.8rem;
//   color:#666;
//   font-weight: normal;
// }
  /** 整个项目公共css */
  *{
    border: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-overflow-scrolling:touch;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  img{
    border:0;
    padding:0;
    margin:0;
  }
  a{
    text-decoration:none;
    outline:none;
  }
  ul,li{
    list-style: none;
  }
  p{margin:0;}
  input::-moz-focus-inner,
  textarea::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  input,textarea {
    border: 0;
    line-height: normal;
    outline:none;
    -webkit-appearance: none;
  }

  body {
    display: flex;
    height: 100%;
    width: 100%;
    line-height: normal;
    font-family: "微软雅黑";
    margin: 0 auto;
    // max-width: 630px;
  }
  .tuhu-tabbar{
    background: #fff;
    height: 2.4rem;
    justify-content: space-around;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    width: 100%;
    display: none;
    /*&::after{
      position:absolute;
      content:'';
      width: 1.95rem;
      height: 0.5rem;
      background: url(../../lib/imgs/UI/artboard.png) no-repeat;
      background-size: 100%;
      top: -0.5rem;
      left: 50%;
      margin-left: -0.95rem;
    }*/
    .item{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 0.2rem;
      img{
        width: 1.25rem;
        height: 1.25rem;
      }
      .txt{
        font-size: 0.5rem;
        color: rgba(102, 102, 102, 1);
        padding-top: 0.1rem;
      }
      &.current{
        .txt{
          color: rgba(223, 51, 72, 1);
        }
      }
      &.bigone{
        padding-top: 0;
        margin-top: -0.1rem;
        img{
          width: 1.5rem;
          height: auto;
        }
      }
    }
  }
  .tuhu-tabbar.show{
    display: flex;
  }
  input::-webkit-input-placeholder {
    font-size: 0.7rem;
    color: rgba(153, 153, 153, 1);
  }
  input::-moz-placeholder {
    font-size: 0.7rem;
    color: rgba(153, 153, 153, 1);
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
      border-top: 1px solid rgba(217, 217, 217, 1);
      color: rgba(217, 217, 217, 1);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  /*photoBrowser样式修改start*/
  .photo-browser .bar-nav{
    display: none;
  }
  .photo-browser .bar-tab{
    display: none;
  }
  .photo-browser-swiper-container{
    padding-bottom: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 1);
  }
  .photo-browser-swiper-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .photo-browser-slide{
    overflow: hidden;
    max-width: 100%;
    max-height: 80%;
  }
  .photo-browser .showpage{
    color:#fff;
    position: absolute;
    z-index: 9;
    display: flex;
    width: 100%;
    justify-content: center;
    top: 10px;
  }
  .photo-browser-closeIcon{
    position: absolute;
    width: 15px;
    height: 15px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAgRJREFUWAm9l0FuwjAQRWPWVO1hQjessoA7tKfoAdouehmOgAQLkFA3JYehhT2d73qQE8bO2CG1BHFie97Xn7EJZrPZvBhjPoqi+Dyfz09VVR2oP1gj3gPxFgSYEu/dbLfbH+rcgUgDNfVnQ4lw8DUxSsc7jqizww0aBkjEGhP/ntzuuw13kXej8Xj8TNAvRg0hQoKDadkA13V9fzqdVgR/ZCG3SkcEPi/L8hspKNAhNXPBiVWfdHTBwTb44hZwYk/OzFMLUwMH1zrAAgJOTMiZJCccHCm11Y74LufWdubZ5/4N9/s44cEnHC8Ex3jDAV4QcwLieF77mgrH+kYNtAOGnKCCnUGkPz8H3ikAEzQicuEqAZ4IHKF+XvdwAuN0hohjbZcwt92iKfAnOyeuQJgjCdPAsVYtAJMlEXjOjarduqKFY12SACwIiciBI564DTHwXy3JAanafaFwIfXYVjsgwXHCAcoiUIx0n3RsqxwIwfELCri0DbVOdAqIwbnapcLUpiMqQANn+3NFBAWkwPuIEAXkwHNFXO2CPnCIQF3gNwI7hEXFdkfDAQe/vLcjAAKh2rngOGjX1dVE54vuRcAt4SxOI8IKGAKuFWGGhGtEjCjHCyqSzrdXDpZzdYUp/e9YYBdMOWhuwfH62FUSATYceKPPkT7LnGqPQdtjnoglmDT++gv7fD4+rIgKZQAAAABJRU5ErkJggg==') center no-repeat;
    background-size: 15px 15px;
    right: 0;
    top: 0;
    padding: 20px;
    z-index: 10;
  }
  .photo-browser-exposed .photo-browser-swiper-container{
    background: rgba(0, 0, 0, 0.7);
  }
  /*photoBrowser样式修改end*/

  /*评价页面全局样式start*/
  .comments-all{
    .content-block{
      margin: 0;
      height: 100%;
    }
    .buttons-tab{
      position: fixed;
      z-index: 10;
      width: 100%;
    }
    .infinite-scroll-preloader {
      position: relative;
      height: 2.5rem;
      .nomore{
        img{
          margin: 0 auto;
        }
        margin-bottom: 2rem;
      }
    }
    .tabs{
      height: 100%;
    }
    .swiper-container.swiper-container-horizontal{
      height: 100%;
      padding-bottom: 0;
    }
  }
  /*评价页面全局样式end*/
</style>

<script>
export default {
    created() {
        tuhu._tabInstance = this;

        tuhu._layout = this;

        this.lastTabIndex = this.tabIndex;
    },
    data() {
        return {
            title: tuhu.util.getParam('_channel') === 'xiaomi',
            tabs: tuhu.config.tabs,
            tabIndex: tuhu.getParam('_tab', 'number') || 0
        };
    },
    methods: {
        switchTab(index) {
            this.lastTabIndex = this.tabIndex;

            this.tabIndex = index;
            tuhu.switchTab({
                url: tuhu.config.tabs[index].url
            }, {
                tabIndex: index
            });
        }
    }
};
</script>
