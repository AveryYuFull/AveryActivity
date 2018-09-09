<template>
  <div class="_content" style="margin-top:0px;">
    <div class="tiretypeWrap">
      <div class="carmodel">
        <div>
          <span>车型:</span>
          <span class="red" v-text="vehicle"></span>
        </div>
        <div>
          <span>适配规格:</span>
          <span class="red">一一</span>
        </div>
      </div>
      <div class="desc">
        <div>
          <h3>如何确定您爱车的轮毂尺寸</h3>
          <span>您可以根据爱车轮胎尺寸确定轮毂的尺寸，如225/45R17 的轮胎适配轮毂尺寸为17寸</span>
          <img src="../../imgs/legend.png" />
        </div>
      </div>
      <div class="recommend">
        <a href="#" v-if="list !== null && list.length < 1">没有适配规格</a>
        <a href="#" @click="select(item)" v-for="(item, index) in list" :key="index" v-cloak>{{item}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehicle: this.options.vehicle,
      list: null,
      selected: false
    }
  },
  created() {
    tuhu.car.getLunGu(this.options.car.TID).then(list => {
      this.list = list
    })
  },
  beforeDestroy() {
    // if (!this.selected) {
    //   setTimeout(() => {
    //     const instance = tuhu.car.getInstance()
    //     instance.force = false
    //     instance.getDefaultCar()
    //   })
    // }
  },
  methods: {
    select(item) {
      let car = this.options.car
      this.selected = true

      if (car) {
        car.lunguType = item
        tuhu.car.saveLunGu(this.options.productid, item)

        const instance = tuhu.car.getInstance()
        instance.resolveCar(car)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .tiretypeWrap{
    width: 100%;
    max-width: 630px;
    margin:0 auto;
    height: 100%;
    .carmodel{
      width: 100%;
      height: 2.1rem;
      background-color: #fff;
      border-bottom: 1px solid #d9d9d9;
      display:flex;
      div{
        flex:1;
        width:50%;
        text-align: center;
        line-height:2.05rem;
        color:#999;
        font-size:0.6rem;
        padding:0 0.75rem;
        display:flex;
        align-items:center;
        justify-content:space-between;
        &:first-child{
          border-right: 1px solid #d9d9d9;
        }
        span{
          text-align: left;
          &.red{
            flex:1;
            margin-left:0.2rem;
            color: #df3448;
            font-size:0.7rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
    .desc{
      div{
        padding: 1.0rem 0.8rem 0 0.8rem;
        background: #fff;
        border-bottom: 1px solid #d9d9d9;
        h3{
          color: #222;
          font-size:0.7rem;
          border-left: 0.15rem solid #df3448;
          line-height: 1.0rem;
          padding-left: 0.5rem;
          margin: 0 0 0.5rem 0;
        }
        span{
          color: #666;
          font-size: 0.6rem;
          line-height: 1.0rem;
        }
        img{
          margin: 0.75rem 0 1.0rem 0;
          width: 100%;
        }
      }
    }
    .recommend{
      margin: 0 0.8rem;
      font-size: 0.8rem;
      padding-top: 1.0rem;
      padding-bottom: 0.8rem;
      a{
        display: block;
        width: 100%;
        margin-bottom: 0.75rem;
        color: #DF3448;
        border: 1px solid #DF3448;
        border-radius: 0.25rem;
        padding: 3% 0;
        font-size: 0.8rem;
        background: #fff;
        text-align: center;
      }
    }
  }
</style>

