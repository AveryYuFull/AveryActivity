
import AcFlopPop from './flopPop';

export default {
    install (Vue, options) {
        [
            AcFlopPop
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
