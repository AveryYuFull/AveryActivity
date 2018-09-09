import AcSpecial from './special';
import AcCountDown from './countDown';
import AcTextLink from './textLink';
import AcImgLink from './imgLink';
import AcMaintainPricing from './maintainPricing';

import AcFootTabs from './footTabs';
import AcVideoBox from './videoBox';
export default {
    install (Vue, options) {
        [
            AcSpecial,
            AcCountDown,
            AcTextLink,
            AcImgLink,
            AcMaintainPricing,
            AcFootTabs,
            AcVideoBox
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
