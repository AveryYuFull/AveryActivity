<script>
export default {
    props: {
        dataFilter: { // 每项数据过滤
            type: Function
        },
        list: { // 图片列表
            type: Array
        },
        status: { // 0为未开始，1为开始，2为隐藏还未显示反面图，3为显示反面图结束
            type: Number,
            default: 0
        },
        // 模块数据
        itemData: {
            type: Object
        },
        startCb: {
            type: Function
        },
        shareCb: {
            type: Function
        }
    },
    computed: {
        /**
         * 模块的hashKey
         * @returns {String} hashKey值
         */
        hashKey() {
            // return this.getHashKey();
            return this.myItemData && this.myItemData.ActivityId ? this.myItemData.ActivityId : '';
        },
        ...Vuex.mapState({
            userInfo: '_userInfo'
        })
    },
    data() {
        let _that = this;
        return {
            myStatus: _that.status,
            /**
             * display 值定义
             * 0: 有免费抽奖机会, 2:没有抽奖机会, 8:有分享机会
             * 22: 有分享机会但不在微信或app内
             * 9: 如果用户没有登陆，点击跳转到登陆页面, 10: 周期内有中实物奖励但未提交地址
             * 11: 没有权限抽奖
             */
            myItemData: _that.itemData
            // myItemData: Object.assign({}, this.itemData, this.moduleData, {
            //     display: 0,
            //     times: null,
            //     shareTimes: null,
            //     draw: null,
            //     lotteryRecord: null, // 抽奖记录
            //     packetData: null, // 奖品记录
            //     huaweiChannel: '',
            //     userInfo: {},
            //     isLogin: true, // 代表用户是否登录（包括WAP登录和微信登录）
            //     hasDrawedLottery: false,
            //     resultImgUri: '',
            //     defaultUserAddress: '',
            //     // popData: null,
            //     shareParams: {},
            //     loginType: 0
            // })
        };
    },
    watch: {
        /**
         * 传入状态
         * @param {number} nowVal 状态当前值
         */
        status(nowVal) {
            this.myStatus = nowVal;
        },
        /**
         * 状态
         * @param {number} nowVal 状态当前值
         */
        myStatus(nowVal) {
            this.$emit('update:status', nowVal);
        },
        /**
         * 模块数据
         * @param {Object} nowVal 模块数据当前值
         */
        itemData (nowVal) {
            this.myItemData = Object.assign({}, this.myItemData, nowVal);
            this.btnItem = Object.assign({}, this.btnItem, {
                times: (nowVal && nowVal.times) || 0,
                shareTimes: (nowVal && nowVal.shareTimes) || 0
            });
        }
    }
};
</script>
