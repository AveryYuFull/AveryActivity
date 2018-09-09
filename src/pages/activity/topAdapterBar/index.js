
import AcTopAdapterBar from './topAdapterBar';

export default {
    install (Vue, options) {
        [
            AcTopAdapterBar
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
