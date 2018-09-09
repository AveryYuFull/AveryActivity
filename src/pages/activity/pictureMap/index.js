import AcPictureMap from './pictureMap';
import AcPicturePage from './picturePage';
import AcProductPage from './productPage';

export default {
    install (Vue, options) {
        [
            AcPictureMap,
            AcPicturePage,
            AcProductPage
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
