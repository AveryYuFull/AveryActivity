<script>
let first = true;
export default {
    inject: ['$$getDefaultCarInfo', '$$selectCarInfo', '$$getActivityInfo'],
    props: {
    /**
     * VehicleBar  | 车型条信息  | object
        {
            AdapterBackColor  | 顶部适配栏背景颜色  | string
            FontColor  | 字体颜色  | string
            AdapterLabel  | 适配标签展示类型  | string   ```json值说明： DontFit-不适配，AllFit-全部适配，Tire-轮胎，WheelHub-轮毂  ```
            IsDividingLine  | 是否显示分割线  | bool
            DividingLineColor  | 分割线颜色  | string
            NoVehiclePrompt  | 无车型提示语  | string
            NoSpecificationTone  | 无规格提示语  | string
        }
     * let config = {
     *  IsChangeTire: 1,//可换车
     *  IsChangeTireSize: 1,//可换轮胎尺寸
     *  IsShowTag: 1,//显示适配标签
     *  IsDividingLine: 1,//是否有分割线
     *  DividingLineColor: '#DF3348',//分割线颜色
     *  AdapterBackColor: '#DF3348',//顶部适配栏背景颜色
     *  FontColor: '#fff',//字体颜色
     *  NoVehiclePrompt: '',//无车型提示语
     *  NoSpecificationTone: '请选择规格'//无规格提示语
     * }
     */
    },
    data () {
        return {
            config: null,
            suitTireInfo: {
                titleShow: 'none',
                carImg: '',
                carName: '',
                carInfoShow: 'none',
                appCarName: '',
                tireSize: ''
            }
        };
    },
    computed: {
        ...Vuex.mapState('tireInfo', [
            'selectTire'
        ]),
        ...Vuex.mapState({
            carInfo: '_carInfo'
        }),
        /**
         * 无规格提示语
         * @return{String} 请选择规格，配置值
         */
        NoSpecificationTone() {
            return this.suitTireInfo.tireSize || this.config.NoSpecificationTone || '请选择规格';
        },
        /**
         * 无车型提示语
         * @return{String} +添加我的爱车，配置值
         */
        NoVehiclePrompt () {
            return this.config.NoVehiclePrompt || '+添加我的爱车';
        },
        /**
         * 背景填充颜色
         * @return{String} #E83D3F/#DF3348
         */
        AdapterBackColor () {
            return {
                background: tuhu.device.tuhuIos ? (this.config.AdapterBackColor || '#E83D3F') : (this.config.AdapterBackColor || '#DF3348')
            };
        },
        /**
         * 分割线
         * @return{Number} 1显示，0隐藏
         */
        IsDividingLine () {
            return this.config.IsDividingLine;
        },
        /**
         * 分割线颜色
         * @return{Object} 分割线颜色，1显示，0隐藏
         */
        suitLine () {
            return {
                borderColor: this.config.DividingLineColor || '#FFF',
                display: this.IsDividingLine ? 'block' : 'none'
            };
        },
        /**
         * 无车型
         * @return{Object} 是否显示
         */
        nosuit () {
            return {
                display: this.suitTireInfo.titleShow,
                color: this.config.FontColor || '#FFF'
            };
        },
        /**
         * 车型适配栏字体颜色
         * @return{Object} 是否显示
         */
        carInfoShowStyle () {
            return {
                display: this.suitTireInfo.carInfoShow,
                color: this.config.FontColor || '#FFF'
            };
        }
    },
    watch: {
        carInfo: function (newVal, oldVal) {
            this.setCarInfo(newVal);
        }
    },
    created() {
        const activityInfo = this.$$getActivityInfo();
        this.config = activityInfo && activityInfo.VehicleBar;
    },
    mounted () {
        // this.$$getDefaultCarInfo(7, true);
        this.setCarInfo(this.carInfo);
    },
    methods: {
        /**
         * 选择车型
         */
        changeCar () {
            this.$$selectCarInfo({
                carLevel: 5
            });
        },
        /**
         * 设置选车型信息
         * @param {Object} da 车型信息
         */
        setCarInfo(da) {
            if (da && (da.CarName)) {
                this.suitTireInfo = Object.assign({}, this.suitTireInfo, {
                    titleShow: 'none',
                    carInfoShow: 'flex',
                    carImg: da.ImageUrl,
                    carName: `${da.CarName} ${(da.Pailiang || '')} ${(da.Nian ? da.Nian + '生产' : '')}`,
                    appCarName: da.CarName
                });
                if (first) {
                    let tireSize = da.TireSizeForSingle || da.SpecialTireSizeForSingle || this.selectTire || '';
                    this.suitTireInfo = Object.assign({}, this.suitTireInfo, {
                        tireSize: tireSize
                    });
                    this.$store.commit('tireInfo/setTireSize', tireSize);
                } else {
                    let tireSize = this.selectTire || da.TireSizeForSingle || da.SpecialTireSizeForSingle || '';
                    this.suitTireInfo = Object.assign({}, this.suitTireInfo, {
                        tireSize: tireSize
                    });
                    this.$store.commit('tireInfo/setTireSize', tireSize);
                }
                // console.log(this.suitTireInfo);
                // Ta.ta('event', 'home_click_get_carId', {
                //     carId: da.ProductID
                // });
            } else {
                this.$store.commit('tireInfo/setSelectSize', '');
                this.$store.commit('tireInfo/setSelectTire', '');

                this.suitTireInfo = Object.assign({}, this.suitTireInfo, {
                    titleShow: 'flex',
                    carInfoShow: 'none'
                });
            }
        },
        /**
         * 切换轮胎规格
         * @param {Number} IsChangeTireSize 0
         */
        changeTireSize (IsChangeTireSize) {
            if (IsChangeTireSize === 0) {
                return;
            }
            this.$$getDefaultCarInfo(7, true);
        }
    }
};
</script>
