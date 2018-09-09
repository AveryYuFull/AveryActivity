<script>
    import AcLayoutExtend from '../../../common/newLayout/layoutExtend/LayoutExtend';
    export default {
        extends: AcLayoutExtend,
        model: {
            prop: 'navIndex',
            event: 'valueChange'
        },
        props: {
            navIndex: {

            }
        },
        data () {
            return {
                myNavIndex: this.navIndex
            };
        },
        watch: {
            navIndex(nowVale) {
                this.myNavIndex = nowVale;
            },
            myNavIndex(nowVale) {
                this.$emit('valueChange', nowVale);
            }
        },
        methods: {
            /**
             * 设置导航索引ID
             * @param {any} navIndex 导航索引号
             */
            setNavIndex(navIndex) {
                this.myNavIndex = navIndex;
            }
        }
    };
</script>
