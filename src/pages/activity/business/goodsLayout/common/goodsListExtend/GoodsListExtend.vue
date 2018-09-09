<script>
// import { GOODS_TYPE } from '../../../../common/goods/constant.js';
// import filterGoodsName from '../filters/goodsName.filter.js';

export default {
    props: {
        /**
         * 商品全部数据
         */
        goodsData: {
            type: Object
        },
        /**
         * 是否显示进度条
         */
        showProgress: {
            type: Boolean
        },
        /**
         * 活动信息
         */
        activityInfo: {
            type: Object,
            default: () => { return {}; }
        },
        /**
         * 列数
         */
        col: {
            type: Number
        },
        // /**
        //  * 模板类型
        //  */
        // templateType: { // Minimalist:极简版; NoButtons:无按钮版;NoPromotional:无促销语版;Complete:完整版
        //     type: String
        // },
        /**
         * 商品列表
         */
        list: {
            type: Array
        },
        /**
         * 模板类型
         */
        templateType: {
            type: String
        },
        /**
         * 数据商品项数据过滤
         */
        dataFilter: {
            type: Function
        },
        /**
         * 标签过滤器
         */
        tagFilter: {
            type: Function
        }
    },
    data() {
        return {
            // GOODS_TYPE: GOODS_TYPE
        };
    },
    methods: {

        /**
         * 点击商品
         * @param {Event} evt 事件对象
         * @param {String} type 点击内容的类型
         */
        click(evt) {
            evt.col = this.col;
            this.$emit('click', evt);
        }
    }
};
</script>
