<script>
export default {
    props: {
        popData: {
            type: Object
        },
        shareUtils: {
            type: Function
        },
        wxShareTipPop: {
            type: Function
        }
    },
    data () {
        return {
            myPopData: this.popData || {}
        };
    },
    methods: {
        onShareBtnClick () {
            this.$emit('shareBtnClick');
        },
        onWashBtnClick ($evt) {
            this.$emit('washBtnClick', $evt);
        },
        handleClose () {
            this.$emit('handleClose');
        }
    },
    watch: {
        popData (nowVal) {
            this.myPopData = nowVal || {};
        }
    }
};
</script>
