
<script>
import { DISPLAY_STATUS } from '../../../../common/constant.js';

export default {
    props: {
        /**
         * 按钮数据
         */
        btnItem: {
            type: Object
        }
    },
    data() {
        return {
            BIG_HIT_STATUS: DISPLAY_STATUS // 常量
        };
    },
    methods: {
        /**
         * 过滤类型
         * @param {string} type 类型
         * @return {Boolean}
         */
        filterType(type) {
            let _that = this;
            let btnItem = _that.btnItem;
            let res = false;
            if (btnItem && (btnItem.type === type)) {
                res = true;
            }
            return res;
        },
        click(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
