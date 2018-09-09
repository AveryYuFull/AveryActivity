<template>
    <div class="acs_bigHitWheel" v-if="imgList && imgList.length">
        <big-hit-layout>
            <template
             v-for="(item, index) in imgList">
                <li class="ac_bigHit-item"
                    :class="[item && item.hide && 'ac_bigHitWheel-item-hide']"
                    :key="index"
                    @click="click(item, index)">
                    <ac-square-pic
                        :isLazy="false"
                        :imgUrl="bgUrlFilter(item)">
                    </ac-square-pic>
                </li>
                <li v-if="index === 4"
                    class="ac_bigHit-item" :key="index">
                    <slot></slot>
                </li>
            </template>
        </big-hit-layout>
    </div>
</template>

<script>
import BigHitLayout from './bigHitLayout/BigHitLayout';
export default {
    name: 'ac-big-hit-wheel',
    props: {
        dataFilter: { // 每项数据过滤
            type: Function
        },
        // btnItem: { // 按钮数据
        //     type: Object
        // },
        list: { // 图片列表
            type: Array
        },

        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        }
    },
    data() {
        let _that = this;
        return {
            lock: false,
            isClick: false, // 是否改变状态的点击
            myStatus: _that.status,
            imgList: _that.filteList(_that.list),
            playOrder: [0, 1, 2, 3, 5, 9, 8, 7, 6, 4] // 播放顺序
        };
    },
    watch: {
        status(nowVal) {
            this.myStatus = nowVal;
        },
        myStatus(nowVal) {
            if (this.lock && nowVal === 0) {
                this.lock = false;
                this.isClick = false;
            }
            this.$emit('update:status', nowVal);
            this.play();
        },
        list(nowVal) {
            this.imgList = this.filteList(nowVal);
        }
    },
    components: {
        BigHitLayout
    },
    methods: {
        bgUrlFilter(item) {
            let res = '';
            let myStatus = this.myStatus;
            if (item) {
                if (myStatus===3 && this.isClick === item) {
                    res = item._promptImg;
                } else if (myStatus >= 1.5) {
                    res = item.bImgUrl;
                } else {
                    res = item.imgUrl;
                }
            }
            return res;
        },
        /**
         * 过滤图片列表
         * @param {Array} list 图片列表
         * @return {Array<Object>}
         */
        filteList(list) {
            let _that = this;
            let res = [];
            let _oldList = this.imgList || [];
            if (list instanceof Array) {
                res = list.map((item, index) => {
                    let _res = {};
                    if (typeof item === 'string') {
                        _res = {
                            imgUrl: item,
                            bImgUrl: item
                        };
                    }

                    _res = Object.assign({
                        hide: false
                    }, item, _oldList[index], _res);

                    if (_that.dataFilter instanceof Function) {
                        _res = _that.dataFilter(_res);
                    }
                    return _res;
                });
            }
            return res;
        },
        /**
         * 图片的点击事件
         * @param {Object} item 点击项的数据
         * @param {Number} index 索引号
         */
        click(item, index) {
            if (this.myStatus === 2) {
                this.myStatus = 3;
                this.isClick = item;
            }
            this.$emit('click', {
                type: 'wheelItem',
                itemData: item,
                index: index,
                imgList: this.imgList
            });
        },

        /**
         * 开始播放动画
         */
        play() {
            let _that = this;
            if (!_that.lock && _that.myStatus === 1) {
                _that.setHide();
            }
        },

        /**
         * 设置隐藏
         */
        setHide() {
            let _that = this;
            _that.lock = true;
            setHide(0);
            /**
             * 设置隐藏
             * @param {Number} index 当前playOrder列表的索引
             */
            function setHide(index) {
                let _index = _that.playOrder[index];
                _that.$set(_that.imgList[_index], 'hide', true);
                if (index < _that.playOrder.length - 1) {
                    setTimeout(() => {
                        setHide(index + 1);
                    }, 100);
                } else {
                    _that.lock = false;
                    _that.myStatus = 1.5;
                    _that.setShow();
                }
            }
        },
        /**
         * 设置显示
         */
        setShow() {
            let _that = this;
            _that.lock = true;
            setHide(0);
            /**
             * 设置隐藏
             * @param {Number} index 当前playOrder列表的索引
             */
            function setHide(index) {
                let _index = _that.playOrder[index];
                _that.$set(_that.imgList[_index], 'hide', false);
                if (index < _that.playOrder.length - 1) {
                    setTimeout(() => {
                        setHide(index + 1);
                    }, 100);
                } else {
                    _that.lock = false;
                    _that.myStatus = 2;
                }
            }
        }
    }
};
</script>

<style lang="scss">
.acs_bigHitWheel {
    .ac_bigHitWheel-item-hide{
        visibility: hidden;
    }
}
</style>
