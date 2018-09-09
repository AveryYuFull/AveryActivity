import AcModuleFactory from './common/moduleFactory';
import AcModuleItem from './moduleItem';
import AcModuleList from './moduleList';

export default {
    install (Vue, options) {
        [
            AcModuleFactory,
            AcModuleItem,
            AcModuleList
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
