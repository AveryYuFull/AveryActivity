import AcModuleCol1 from './moduleCol1';
import AcModuleCol2 from './moduleCol2';
import AcModuleCol3 from './moduleCol3';
import AcModuleCol4 from './moduleCol4';
import AcModuleCol1G5 from './moduleCol1G5';
import AcModuleCol2G5 from './moduleCol2G5';
import AcModuleCol3G5 from './moduleCol3G5';
import AcModuleCol4G5 from './moduleCol4G5';

export default {
    install (Vue, options) {
        [
            AcModuleCol1,
            AcModuleCol2,
            AcModuleCol3,
            AcModuleCol4,
            AcModuleCol1G5,
            AcModuleCol2G5,
            AcModuleCol3G5,
            AcModuleCol4G5
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
