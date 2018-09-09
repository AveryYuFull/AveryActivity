<script>
import AcModuleExtend from '../../../activityModule/common/moduleExtend/ModuleExtend';
export default {
    extends: AcModuleExtend,
    methods: {
        click(evt) {
            evt = evt || {};
            let _that = this;
            let res = '';
            let itemData = _that.moduleData;
            let typeCode = itemData && itemData.ModuleType;
            evt.ModuleType = typeCode;
            evt.moduleData = itemData;
            this.$emit('click', evt);
        }
    }
};
</script>
