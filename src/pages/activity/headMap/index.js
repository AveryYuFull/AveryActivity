import AcHeadMap from './headMap';
import AcGeneralPage from './generalPage';
import AcSeperateCarPage from './seperateCarPage';

export default {
    install (Vue, options) {
        [
            AcHeadMap,
            AcGeneralPage,
            AcSeperateCarPage
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
