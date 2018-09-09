<template>
  <div class="_content">
    <div class="levelPage">
      <div class="brandheader">
        <div class="brandIcon">
          <img :src="img" />
        </div>
        <div class="brand" v-text="vehicle"></div>
      </div>

      <div class="selectTitle">
        <template v-if="!paiLiang">
          <span class="default triangle">选择发动机排量</span>
        </template>
        <template v-else-if="!year">
          <span class="default selected" v-text="paiLiang" @click="slideTo(0)"></span>
          <span class="default triangle">选择年份</span>
        </template>
        <template v-else>
          <span class="default selected" v-text="paiLiang" @click="slideTo(0)"></span>
          <span class="default selected triangle" @click="slideTo(1)" v-text="this.year"></span>
          <span class="default triangle">选择车型</span>
        </template>

        <!--选过橙色显示class=selected-->

        <!--带三角形class=triangle-->
      </div>
      <tuhu-swiper :haspagination="false" slot="content" ref="swiper" style="width:100%;">
        <div class="list swiper-slide" slot="content">
          <div class="title" v-for="(item, index) in list" :key="index" v-text="item.Value" @click="toYear(item)"></div>
        </div>
        <div class="list swiper-slide" slot="content">
          <div class="title" v-for="(item, index) in years" :key="index" v-text="item.Value" @click="toType(item)"></div>
        </div>
        <div class="list swiper-slide" slot="content">
          <div class="title" v-for="(item, index) in types" :key="index" v-text="item.Name" @click="selectedCar(item)"></div>
        </div>
      </tuhu-swiper>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            years: [],
            types: [],
            productId: '',
            img: '',
            year: '',
            paiLiang: '',
            type: 5,
            vehicle: '',
            selected: false
        };
    },
    beforeCreate() {
        tuhu
            .fetch(
        'https://item.tuhu.cn/Car/SelectVehicle?VehicleID=' +
          tuhu.getParam('productid')
      )
            .then(data => {
                if (data.PaiLiang.length < 1) {
                  const instance = tuhu.car.getInstance();
                  instance.force = false;
                  instance.resolveCar(this.options.car);
              } else {
                  this.list = data.PaiLiang;
                  this.$nextTick(() => {
                    this.$refs.swiper.instance.update();
                });
              }
            });

    // const API_PAILIANG_URL = 'https://item.tuhu.cn/Car/SelectVehicle'
    // tuhu.fetch(API_PAILIANG_URL)
    },
    created() {
        this.productId = tuhu.getParam('productid');
        this.type = tuhu.getParam('type') - 0;
        this.vehicle = tuhu.getParam('vehicle');
        this.img = tuhu.getParam('img');

        const paiLiang = tuhu.getParam('pailiang');
        if (paiLiang) {
            this.paiLiang = paiLiang;
        }

        const year = tuhu.getParam('year');
        if (year) {
            this.year = year;
        }
    },
    mounted() {
    // debugger
        this.$refs.swiper.instance.lockSwipes();

        if (this.year) {
            tuhu
                .fetch(
          'https://item.tuhu.cn/Car/SelectVehicleSalesName?VehicleID=' +
            this.productId +
            '&PaiLiang=' +
            escape(this.paiLiang) +
            '&Nian=' +
            this.year
        )
                .then(data => {
                  this.types = data.SalesName;

                  this.$refs.swiper.instance.slideTo(2);
              });
        } else if (this.paiLiang) {
            tuhu
              .fetch(
          'https://item.tuhu.cn/Car/SelectVehicle?VehicleID=' +
            this.productId +
            '&PaiLiang=' +
            escape(this.paiLiang)
        )
              .then(data => {
                this.types = data.SalesName;

                this.$refs.swiper.instance.slideTo(1);
            });
        }
    },
    beforeDestroy() {
    // debugger
    // if (!this.selected) {
    //   setTimeout(() => {
    //     const instance = tuhu.car.getInstance()
    //     instance.force = false
    //     instance.resolveCar(this.options.car)
    //   })
    // }
    },
    methods: {
        slideTo(index) {
            if (index === 0) {
                this.paiLiang = '';
            } else {
                this.year = '';
            }

            this.$refs.swiper.instance.slideTo(index);
        },
        selectedCar(item) {
            let car = this.options.car;
            this.selected = true;

            if (car) {
                if (item) {
                  car.SalesName = item.Name;
                  car.TID = item.TID;
              }

                car.Nian = this.year;
                car.Pailiang = this.paiLiang;

                const instance = tuhu.car.getInstance();
                instance.resolveCar(car);
            }
        },
        toYear(item) {
            this.paiLiang = item.Value;

            tuhu
                .fetch(
          'https://item.tuhu.cn/Car/SelectVehicle?VehicleID=' +
            this.productId +
            '&PaiLiang=' +
            escape(this.paiLiang)
        )
                .then(data => {
                  this.years = data.Nian;

                  this.$refs.swiper.instance.slideNext();
              });
        },
        toType(item) {
            this.year = item.Value;

            if (this.type < 5) {
                this.selectedCar();
            } else {
                tuhu
                  .fetch(
            'https://item.tuhu.cn/Car/SelectVehicleSalesName?VehicleID=' +
              this.productId +
              '&PaiLiang=' +
              escape(this.paiLiang) +
              '&Nian=' +
              this.year
          )
                  .then(data => {
                    this.types = data.SalesName;

                    this.$refs.swiper.instance.slideNext();
                });
            }
        }
    }
};
</script>

<style lang='less' scoped>
.levelPage * {
  box-sizing: border-box;
}

.levelPage {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .brandheader {
    background: #e83e41;
    display: -webkit-box;
    padding: 10px 15px 8px;
    align-items: center;
    height: 48px;
    .brandIcon {
      position: relative;
      height: 30px;
      &::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 28px;
        background: #cfcfcf;
        right: -18px;
        top: 1px;
        opacity: 0.4;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
    .brand {
      color: #fff;
      padding-left: 30px;
      font-size: 14px;
      line-height: 14px;
    }
  }
  .selectTitle {
    color: #333;
    height: 32px;
    padding-left: 15px;
    line-height: 32px;
    border-bottom: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
    background-color: #eee;
    .default {
      margin-right: 6px;
      &.selected {
        color: #f57c33;
      }
    }
    .triangle {
      background: url(https://res.tuhu.org/react/xbyPackage/static/media/triangle.ca0805d8.png)
        0 no-repeat;
      padding-left: 14px;
      background-size: 4px 8px;
    }
  }
  .list {
    background-color: #fff;
    font-size: 14px;
    overflow: auto;
    .title {
      border-bottom: 1px solid #d9d9d9;
      height: 45px;
      line-height: 45px;
      color: #222;
      margin-left: 16px;
      position: initial;
      text-align: left;
      font-size: 12px;
    }
  }
}
.swiper-container{
  flex: 1;
  padding-bottom: 0;
  height:100%;
}
@media screen and (max-height:490px) and (max-width:330px) {
  .list{
    height:380px;
  }
}
</style>
