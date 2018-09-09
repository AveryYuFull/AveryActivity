import AcBoxTitle from './boxTitle';
import AcPrice from './price';
import AcProgress from './progress';
import AcSquarePic from './squarePic';
import AcMaskBg from './maskBg';
import AcBoxButton from './boxButton';
import AcTagList from './tagList';
import AcBroadcastImgBox from './broadcastImg';
import AcErnieMachine from './ernieMachine';
import AcRaceLamp from './raceLamp';
import AcShakeBall from './shakeBall';
import AcBigHitWheel from './bigHitWheel';
import AcPopup from './popup';
import AcPopTop from './popTop';
import AcPopBody from './popBody';
import AcPopBottom from './popBottom';
import AcImgBox from './imgBox';
import AcPlayBtn from './playBtn';
import AcVideoPlay from './videoPlay';
import AcCloseImg from './closeImg';
import AcWxShareImg from './wxShareImg';
import AcCountTime from './countTime';
import AcTextScroll from './textScroll';
import AcLotteryBroadcast from './lotteryBroadcast';
import AcAeAnmiation from './aeAnimation';
import AcLoading from './loading';
import AcGoTop from './goTop';
import AcCornerMark from './cornerMark';
import AcTriTag from './triTag';
import AcSusTip from './susTip';

export default {
    install (Vue, options) {
        [
            AcBoxTitle,
            AcPrice,
            AcProgress,
            AcSquarePic,
            AcMaskBg,
            AcBoxButton,
            AcTagList,
            AcBroadcastImgBox,
            AcErnieMachine,
            AcRaceLamp,
            AcShakeBall,
            AcBigHitWheel,
            AcPopup,
            AcPopTop,
            AcPopBody,
            AcPopBottom,
            AcImgBox,
            AcPlayBtn,
            AcVideoPlay,
            AcCloseImg,
            AcWxShareImg,
            AcCountTime,
            AcTextScroll,
            AcLotteryBroadcast,
            AcAeAnmiation,
            AcLoading,
            AcGoTop,
            AcCornerMark,
            AcTriTag,
            AcSusTip
        ].forEach(item => {
            Vue.use(item, options);
        });
    }
};
