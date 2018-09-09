<template>
    <div class="acs_navContent">
        <div class="swiper-container navBar" ref="nav">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in myList" :key="index">
                    <ac-nav-bar-item :itemData="item" @active="setActiveIndex(index)" v-model="myNavIndex"></ac-nav-bar-item></div>
                    <!-- <ac-nav-bar-item :itemData="item" v-model="myNavIndex"></ac-nav-bar-item></div> -->
            </div>
        </div>
        <ac-nav-description
            :name-text="navDescription"></ac-nav-description>
    </div>
</template>

<script>
import Swiper from '../../../../../static/js/swiper.min';
import AcNavBarExtend from '../navBarExtend/NavBarExtend';
import AcNavBarItem from '../navBarItem/NavBarItem';
import AcNavDescription from '../navDescription/NavDescription';

const COMPONENT_NAME = 'ac-nav-bar-list-cont';

export default {
    extends: AcNavBarExtend,
    name: COMPONENT_NAME,
    props: {
        list: {
            type: Array,
            required: true
        },
        navColor: {
            type: String,
            default: '#DE3333'
        }
    },
    components: {
        AcNavBarItem,
        AcNavDescription
    },
    data () {
        return {
            navSwiper: null,
            activeIndex: 0,
            tSpeed: 300,
            myList: this.list
        };
    },
    computed: {
        ...Vuex.mapState({
            carInfo: '_carInfo'
        }),
        /**
         * 导航的描述信息
         * @returns {String} 返回导航的描述信息
         */
        navDescription () {
            const myList = this.myList;
            const desc = myList && myList[this.activeIndex] && myList[this.activeIndex].NavigationDescription;
            return desc;
        },
        /**
         * 是否需要车型信息
         * @returns {Boolean} 返回是否需要车型信息
         */
        isNeedLoadCarInfo () {
            return this.list && this.list.some((item, index) => {
                return /#(车型|轮胎|轮毂)#/.test(item.NavigationDescription);
            });
        }
    },
    watch: {
        activeIndex(nowVal) {
            setTimeout(() => {
                this.goNavCenter(); // 导航居中
            }, 20);
        },
        myNavIndex(nowVal) {
            // this.activeIndex = this.getActiveIndex(nowVal);
        },
        carInfo (nowVal) {
            this.initNavDesc();
        },
        list (nowVal) {
            this.myList = nowVal;
            this.initNavDesc();
        }
    },
    created() {
        // this.activeIndex = this.getActiveIndex(this.myNavIndex);
        // 判断是否需要车型信息
        this.initNavDesc();
    },
    mounted () {
        const _that = this;
        let myList = _that.myList;
        this.$nextTick(() => {
            this.navSwiper = new Swiper(this.$refs.nav, {
                initialSlide: _that.activeIndex,
                freeMode: true,
                slidesPerView: 'auto'
                // slidesPerView: myList.length < 6 ? myList.length : 'auto'
            });
        });
        this.activeIndex = this.getActiveIndex(this.myNavIndex);
    },
    methods: {
        /**
         * 初始化导航的描述信息
         */
        initNavDesc () {
            if (this.isNeedLoadCarInfo) {
                if (this.carInfo) {
                    this.updateNavDesc();
                } else {
                    this.$tuhu.getDefaultCar(2, false);
                }
            }
        },
        /**
         * 更新导航的秒杀信息
         */
        updateNavDesc () {
            const list = this.list || [];
            const car = this.carInfo;
            this.myList = list.map((item, index) => {
                item = Object.assign({}, item);
                if (/#(车型|轮胎|轮毂)#/.test(item.NavigationDescription)) {
                    let desc = item.NavigationDescription;
                    let carType = '车型';
                    let tire = '轮胎';
                    let hubAdapter = '轮毂';
                    if (car) {
                        carType = (car.BrandType + car.CarName) || '车型';
                        tire = car.TireSizeForSingle || '轮胎';
                        hubAdapter = car.HubAdapter || '轮毂';
                    }
                    desc = desc.replace(/#(车型)#/, carType);
                    desc = desc.replace(/#(轮胎)#/, tire);
                    desc = desc.replace(/#(轮毂)#/, hubAdapter);
                    item.NavigationDescription = desc;
                }
                return item;
            });
        },
        // toSlideIndex(index) {
        //     let navSwiper = this.navSwiper;
        //     if (navSwiper) {
        //         navSwiper.slideTo(index, this.tSpeed, false);
        //     }
        // },
        setActiveIndex(activeIndex) {
            // this.toSlideIndex(activeIndex);
            this.activeIndex = activeIndex;
        },
        getActiveIndex(myNavIndex) {
            for (let i=0; i<this.myList.length; i++) {
                if (this.myList[i].ModuleId === myNavIndex) {
                    return i;
                }
            }
        },
        /**
         * 把当前选中的item居中
         */
        goNavCenter() {
            let navSwiper = this.navSwiper;
            if (!navSwiper || !navSwiper.$el) {
                return;
            }
            let clientWidth = navSwiper.$el[0].clientWidth; // Nav的可视宽度
            let slides = navSwiper.slides;
            let navSlideWidth = parseInt(slides[this.activeIndex].clientWidth, 10) || 0; // 当前item的宽度
            let navActiveSlideLeft = slides[this.activeIndex].offsetLeft; // activeSlide距左边的距离
            let navWidth = 0; // Nav的总宽度
            for (let i = 0; i < slides.length; i++) {
                navWidth += parseInt(slides[i].clientWidth);
            }
            navSwiper.setTransition(this.tSpeed);
            let translate = 0;
            if (navActiveSlideLeft < (clientWidth - navSlideWidth) / 2) {
                translate = 0;
            } else if (navActiveSlideLeft > navWidth - (navSlideWidth + clientWidth) / 2) {
                translate = clientWidth - navWidth;
            } else {
                translate = (clientWidth - navSlideWidth) / 2 - navActiveSlideLeft;
            }
            navSwiper.setTranslate(translate);
        }
    }
};
</script>
<style lang="scss">
.fixedTop{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
.acs_navContent{
    width: 100%;
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: 10000;
    // background:#fff;
    .swiper-container{
        padding-bottom: 0;
        overflow: hidden;
        background:#fff;
        .swiper-wrapper{
            .swiper-slide{
                width:auto;
                display: inline-block;
                text-align: center;
            }
        }
    }
    .tips{
        text-align: center;
        background:rgba(0,0,0,0.51);
    }
}
</style>

