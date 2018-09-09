<template>
  <div class='_content'>
    <div class="emptypage">
      <div class="contentwrap">
        <img  :src='imageUrl'/>
        <span v-text='title'></span>
        <div class="btn" v-text='buttonName' @click="handleButtonClick" ></div>
      </div>
    </div>
  </div>
</template>

<script>
  let src = require('../../imgs/UI/nodata.png')
  export default {
    data () {
      return {
        title: this.options.title || '空页面',
        imageUrl: this.options.imageUrl || src,
        buttonName: this.options.buttonName || '返回上一页',
        buttonCallBack: this.options.buttonCallBack
      }
    },
    beforeCreate() {
    },
    created() {

    },
    methods: {
      handleButtonClick (e) {
        if (this.buttonCallBack) {
          this.buttonCallBack(e)
        } else {
          tuhu.navigateBack()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .emptypage{
    background:rgba(238, 238, 238, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: -3rem;
    .contentwrap{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 3.5rem;
      }
      span{
        font-size: 0.65rem;
        color: rgba(102, 102, 102, 1);
        margin: 0.6rem 0 1.1rem;
      }
      .btn{
        color: rgba(223, 52, 72, 1);
        font-size: 0.7rem;
        padding:0.4rem 1.75rem;
        border-radius: 0.1rem;
        border:1px solid rgba(223, 51, 72, 1);
        line-height: 0.7rem;
      }
    }
  }
</style>
