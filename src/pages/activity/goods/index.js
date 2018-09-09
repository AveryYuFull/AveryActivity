import AcGoods from './goods';
import AcSeckill from './seckill';
import AcGoodsDefault from './goodsDefault';
import AcGroupBooking from './groupBooking';
import AcSysRec from './sysRec';
export default {
    install (Vue, options) {
        [
            // AcGoodsList,
            // AcGoodsListwidget,
            AcGoods,
            AcSeckill,
            AcGoodsDefault,
            AcGroupBooking,
            AcSysRec
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
