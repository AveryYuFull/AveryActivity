<script>
export default {
    props: {
        /**
         * 传入接口packerData
         */
        packerData: {
            type: Array | Object,
            default: function () {
                return [];
            }
        }
    },
    // data: {
    //     moreOne: '',
    //     showFlag: false
    // },
    computed: {
        getResult() {
            const packerData = this.packerData;
            if (!packerData) {
                return;
            }
            let _code = packerData.Code +'';
            switch (_code) {
                case '-1': // 已经有中过实物奖励
                    // this.handleRealPrize()
                    break;
                case '0':

                    break;
                case '1': // 开始抽奖
                    this.start();
                    break;
                case '-6': // 没有权限抽奖

                    break;
            }
            return res;
        }
    },
    created() {
    }
};
</script>
