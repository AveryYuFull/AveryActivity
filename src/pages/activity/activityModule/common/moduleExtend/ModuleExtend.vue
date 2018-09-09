<script>
import AcModuleBase from '../moduleBase/ModuleBase';

export default {
    extends: AcModuleBase,
    props: {
        /**
         * 每个模块项的数据
         */
        moduleData: {
            type: Object
        }
    },
    methods: {
        /**
         * 获取当前模块的hashKey
         * @returns {String}
         */
        getHashKey() {
            let _that = this;
            return _that.getMdHashKey(_that.moduleData);
        },
        /**
         * 获取缓存数据的Key
         * @returns {String}
         */
        getHttpCacheKey() {
            let _that = this;
            let res = '';
            let moduleData = _that.moduleData || {};
            res = _that.getHashKey() + (moduleData.ModuleId || '') + moduleData.GroupNo + '_' + this.getVehicleId();
            return res ? ('_' + res) : res;
        }
    }
};
</script>
