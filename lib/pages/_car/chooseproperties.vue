<template>
  <div class="_content" style="margin-top:0px;">
    <div class="typeWrap">
      <!-- <div class="changeCar">
        <div class="carLogo">
          <img :src="options.img" >
        </div>
        <div class="carName" v-cloak>{{options.vehicle}}</div>
        <div class="changeBtn" @click="changeCar">换车</div>
      </div> -->
      <div class="tip">为了保证我们能够为您精确匹配保养年卡，请为当前车型选择以下信息：</div>
      <div :class="item.Values[0].ImageUrl?'imgList':'txtList'" v-for="(item,index) in properties" :key="index" v-cloak>
        <div class="title">请选择{{item.Name}}</div>
        <div class="listContent">
          <div @click="selectProperty(item2, item)" :class="item.selected.propertyValue === item2.Key?'item choosed':'item'" v-for="(item2, index2) in item.Values" :key="index2" v-if="item2.ImageUrl">
            <img v-lazy="{src: item2.ImageUrl, width: '50%'}" alt="">
            <div class="bottom" v-cloak>{{item2.DisplayValue}}</div>
          </div>
          <div @click="selectProperty(item2, item)" :class="item.selected.propertyValue === item2.Key?'item choosed':'item'" v-else>
            {{item2.DisplayValue}}
          </div>
        </div>
      </div>
      <div :class="canSelect?'footerBtn red':'footerBtn'" @click.stop="selectedCar">确认</div>    <!-- 如果需要按钮置灰，就去掉类名.red -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      properties: this.options.properties
    }
  },
  created() {
  },
  watch: {
  },
  computed: {
    canSelect() {
      return this.properties.every((item, index, array) => {
        return item.selected.propertyValue !== ''
      })
    },
    propertyList() {
      return this.properties.filter((item, index, array) => {
        if (item.selected.propertyKey !== 'TID') {
          return true
        }
      }).map((item, index, array) => {
        return item.selected
      })
    },
    TID() {
      let list = this.properties.filter((item, index, array) => {
        if (item.selected.propertyKey === 'TID') {
          return true
        }
      })
      if (list.length > 0) {
        return list[0].selected.propertyValue
      } else {
        return this.options.car.TID
      }
    }
  },
  methods: {
    selectedCar() {
      if (this.canSelect) {
        let car = this.options.car
        if (car) {
          car.PropertyList = this.propertyList
          car.TID = this.TID
          const instance = tuhu.car.getInstance()
          instance.resolveCar(car)
        }
      }
    },
    selectProperty(item2, item1) {
      let Key = item2.Key
      if (item1.selected.propertyValue === Key) {
        item1.selected.propertyValue = ''
      } else {
        item1.selected.propertyValue = Key
      }
    }
  }
}
</script>

<style scoped lang="less">
  .typeWrap{
    width: 100%;
    max-width: 630px;
    margin:0 auto;
    height: 100%;
    .changeCar{
      padding-left: 0.75rem;
      height:2.2rem;
      background-color: #fff;
      border-bottom: 1px solid #d9d9d9;
      display:flex;
      justify-content:space-between;
      align-items: center;
      .carLogo{
        font-size: 0;
        width:1.05rem;
        height: 1.05rem;
        margin-right: 0.5rem;
        img{
          width: 100%;
        }
      }
      .carName{
        flex:1;
        font-size: 0.7rem;
        color: rgba(51, 51, 51, 1);
      }
      .changeBtn{
        font-size: 0.65rem;
        padding:0 0.75rem;
        color: rgba(245, 124, 51, 1);
      }
    }
    .tip{
      padding:0.5rem 0.75rem;
      font-size: 0.6rem;
      color: rgba(102, 102, 102, 1);
      line-height: 0.75rem;
    }
    .txtList{
      background-color: #fff;
      margin-bottom: 0.5rem;
      .title{
        height:2.0rem;
        line-height: 2.0rem;
        padding-left:0.75rem;
        border-bottom: 1px solid #d9d9d9;
        font-size: 0.65rem;
        color: rgba(51, 51, 51, 1);
      }
      .listContent{
        padding-left:0.75rem;
        .item{
          height:2.2rem;
          line-height: 2.2rem;
          font-size: 0.65rem;
          color: rgba(102, 102, 102, 1);
          position:relative;
          border-bottom: 1px solid #eee;
          &:last-child{
            border-bottom: none;
          }
          &.choosed{
            position:relative;
            color: rgba(223, 51, 72, 1);
            &:before{
              content:"";
              position:absolute;
              width:2.2rem;
              height:2.2rem;
              top:0;
              right:0;
              background: url(../../imgs/greengou.png) no-repeat center;
              background-size: 0.7rem 0.5rem;

            }
          }
        }
      }
    }
    .imgList{
      background-color: #fff;
      margin-bottom: 0.5rem;
      .title{
        height:2.0rem;
        line-height: 2.0rem;
        padding-left:0.75rem;
        border-bottom: 1px solid #d9d9d9;
        font-size: 0.65rem;
        color: rgba(51, 51, 51, 1);
      }
      .listContent{
        padding:0 0.75rem 0.5rem;
        display:flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .item{
          width:48%;
          border: 1px solid #d9d9d9;
          margin-top:0.5rem;
          font-size: 0;
          position: relative;
          img{
            width:100%;
            vertical-align: middle;
          }
          .bottom{
            height:1.7rem;
            line-height: 1.7rem;
            text-align: center;
            font-size:0.65rem;
            color: rgba(102, 102, 102, 1);
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          }
          &:after{
            content:"";
            position: absolute;
            width:0.85rem;
            height: 0.85rem;
            bottom:1.95rem;
            right:0.25rem;
            background:url(../../imgs/graychoose.png) no-repeat center;
            background-size: 0.85rem 0.85rem;
          }
          &.choosed{
            &:after{
              background:url(../../imgs/greenchoose.png) no-repeat center;
              background-size: 0.85rem 0.85rem;
            }
            .bottom{
              color: rgba(223, 52, 72, 1);
            }
          }
        }
      }
    }
    .footerBtn{
      height:2.2rem;
      line-height: 2.2rem;
      text-align: center;
      margin:1.0rem 0.75rem;
      background-color: rgba(217, 217, 217, 1);
      border-radius: 0.2rem;
      font-size:0.8rem;
      color: #fff;
      &.red{
        background-color: rgba(223, 51, 72, 1);
      }
    }
  }
</style>

