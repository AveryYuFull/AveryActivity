
import AcSlideCoupon from './SlideCoupon';

export default {
    install (Vue, options) {
        [
            AcSlideCoupon
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
