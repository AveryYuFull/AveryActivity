import AcNewBigHit from './newBigHit';
import AcErnie from './ernie';
// import AcAnswer from './answer';
import AcDrawLotteryItem from './drawLotteryItem';

export default {
    install (Vue, options) {
        [
            AcNewBigHit,
            AcErnie,
            // AcAnswer,
            AcDrawLotteryItem
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
