<!-- 轮胎订单页-->
<template>
  <div class="_content">
    <div class="mycar">
      <div class="carList">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="carinfo" @click="selectedBrandCar(item)">
            <div class="carIcon">
              <img v-lazy="{src: item.ImageUrl}" />
              <span v-text="item.CarNumber"></span>
            </div>
            <div class="brandInfo">
              <div class="brand" v-text="item.Vehicle"></div>
              <div class="nian" v-text="getName(item)"></div>
            </div>
          </div>
          <div class="btns">
            <div v-if="index === 0" :class="{defaultBtn: true, selected: true}"></div>
            <div v-else :class="{defaultBtn: true}" @click="setDefault(item, index)"></div>
            <div class="deleteBtn" @click="deleteCar(item, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="addFooter" :style="{height: showAdd ? '6.95rem' : '4.55rem'}">
        <div class="addBtn" v-show="showAdd" @click="addCar"><span>新增车型</span></div>
        <p class="tip"><span>车库最多放五辆车，如果想添加，请先删除</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      tuhu.car.getCarList().then((data) => {
        this.list = data.CarHistory
      })
    },
    beforeDestroy() {
      if (!this.selected) {
        setTimeout(() => {
          const instance = tuhu.car.getInstance()
          instance.force = false
          instance.getDefaultCar()
        })
      }
    },
    data() {
      return {
        selected: false,
        list: null,
        showAdd: false
      }
    },
    watch: {
      list(val) {
        this.showAdd = val && val.length < 5
      }
    },
    computed: {

    },
    methods: {
      getName(item) {
        if (item.SalesName) {
          return item.SalesName
        }

        if (item.Pailiang && item.Nian) {
          return `${item.Pailiang} ${item.Nian}年产`
        }

        return '详情不完整'
      },
      addCar() {
        this.selected = true

        tuhu.navigateTo({
          url: '/pages/_car/list',
          query: {
            type: this.options.type
          }
        })
      },
      selectedBrandCar(item) {
        this.selected = true

        tuhu.car.getInstance().resolveCar(item)
      },
      async setDefault(item, index) {
        await tuhu.car.setDefault(item)

        this.list.splice(index, 1)
        this.list.unshift(item)
      },
      deleteCar(item, index) {
        tuhu.confirm('删除车型后，车型数据将不再保留，您确认删除吗?', '温馨提示',
          () => {
            tuhu.car.deleteCar(item).then(() => {
              tuhu.car.getCarList().then((data) => {
                this.list = data.CarHistory
              })
            })
          }
        )
      }
    }
  }
</script>

<style scoped lang="less">
  .mycar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .carList{
      flex:1;
      overflow-y: scroll;
      .item{
        background:#fff;
        .carinfo{
          display: flex;
          align-items: center;
          height: 5rem;
          padding: 0.2rem 0 0 0;
          .carIcon{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 5.3rem;
            img{
              width:1.5rem;
              height: 1.5rem;
            }
            span{
              color:rgba(153, 153, 153, 1);
              font-size: 0.6rem;
              margin-top: 0.4rem;
            }
          }
          .brandInfo{
            padding: 0 0.75rem;
            position: relative;
            &::before{
              content:'';
              position: absolute;
              width: 1px;
              height: 2.5rem;
              background:rgba(217, 217, 217, 1);
              left: 0;
              top: 0;
            }
            .brand{
              color: rgba(51, 51, 51, 1);
              font-size: 0.75rem;
            }
            .nian{
              color:rgba(153, 153, 153, 1);
              font-size: 0.65rem;
              margin-top: 0.5rem;
            }
          }
        }
        .btns{
          height: 2.3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 1px solid #d9d9d9;
          .defaultBtn{
            width: 5rem;
            height: 1.2rem;
            background: url(../../imgs/sheweimoren.png) no-repeat;
            background-size: 100%;
            &.selected{
              background: url(../../imgs/yisheweimoren.png) no-repeat;
              background-size: 100%;
            }
          }
          .deleteBtn{
            width: 5rem;
            height: 1.2rem;
            border: 1px solid rgba(223, 51, 72, 1);
            border-radius: 2px;
            color: rgba(223, 51, 72, 1);
            font-size: 0.65rem;
            line-height: 1.2rem;
            text-align: center;
          }
        }
      }
    }
    .addFooter{
      height: 6.95rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .addBtn{
        margin: 0.5rem 0.75rem 0;
        height: 2.4rem;
        line-height: 2.4rem;
        text-align: center;
        background:rgba(223, 51, 72, 1);
        color:#fff;
        font-size: 0.8rem;
        border-radius: 5px;
        span{
          position: relative;
          &::before{
            content:'';
            position: absolute;
            width: 1.1rem;
            height: 1rem;
            background:url(../../imgs/tjchexing.png) no-repeat;
            background-size: 100%;
            left: -1.4rem;
            top: -0.15rem;
          }
        }
      }
      .tip{
        text-align: center;
        span{
          color:rgba(153, 153, 153, 1);
          font-size:0.6rem;
          line-height: 0.6rem;
          position: relative;
          &::before{
            content:'';
            position: absolute;
            width: 0.65rem;
            height: 0.65rem;
            background:url(../../imgs/f.png) no-repeat;
            background-size: 100%;
            left:-1rem;
            top: 0.08rem;
          }
        }
      }
    }
  }
</style>
