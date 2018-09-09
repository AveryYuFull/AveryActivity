import AcEntrySet from './entry';
import AcAnswerItem from './answerItem';
import AcChooseItem from './chooseItem';
import AcAnswerBtn from './answerBtn';
import AcErrorPopUp from './errorPopUp';
import AcDrawPopUp from './drawPopUp';

export default {
    install (Vue, options) {
        [
            AcEntrySet,
            AcAnswerItem,
            AcChooseItem,
            AcAnswerBtn,
            AcErrorPopUp,
            AcDrawPopUp
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
