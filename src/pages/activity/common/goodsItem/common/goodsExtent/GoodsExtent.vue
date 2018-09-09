<script>
export default {
    props: {
        /**
         * 是否显示角标（根据GetActivityModuleInfo接口）
         */
        showAdapter: {
            type: Boolean
        },
        /**
         * 商品状态
         */
        status: { // 1为正常;2为售完
            type: Number,
            default: 1
        },
        /**
         * 图片地址
         */
        imgUrl: {
            type: String
        },
        /**
         * 商品标题
         */
        nameText: {
            type: String
        },
        /**
         * 商品标题类名
         */
        nameClass: {
            type: String,
            default: ''
        },
        /**
         * 商品副标题
         */
        extraNameText: {
            type: String
        },
        /**
         * 限制标题行数
         */
        row: {
            type: Number
        },
        /**
         * 进度条进度
         */
        rate: {
            type: Number
        },
        /**
         * 价格
         */
        price: {
            // type: Number,
            default: 0
        },
        /**
         * 老的价格
         */
        oldPrice: {
            // type: Number
            // default: 0
        },
        /**
         * 按钮状态
         */
        btnItem: { // 0为未开始;1为开始;2为结束
            type: Object
        },
        /**
         * tag标签数据
         */
        tags: {
            type: [Array, Object]
        },
        /**
         * 是否显示进度条
         */
        showProgress: {
            type: Boolean,
            default: true
        },
        /**
         * 促销语
         */
        promotionalAd: {
            type: String
        },
        /**
         * 商品品牌
         */
        brand: {
            type: String,
            default: '品牌'
        },
        /**
         * 标签过滤器
         */
        tagFilter: {
            type: Function
        }
    },
    methods: {
        /**
         * 点击商品
         * @param {Event} evt 事件对象
         * @param {String} type 点击内容的类型
         */
        click(evt, type = 'goods') {
            evt._contentType = evt._contentType || type;
            this.$emit('click', evt);
        }
    }
};
</script>
