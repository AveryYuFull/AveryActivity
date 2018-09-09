<script>
import AcModuleExtend from '../../../activityModule/common/moduleExtend/ModuleExtend';
import { updateResult, shareAddOne } from '../../../common/api/httpClient';

export default {
    inject: ['$$shareUtils', '$$wxShareTipPop'],
    extends: AcModuleExtend,
    props: {
        clickEntry: {
            type: Function
        },
        setQlist: {
            type: Function
        },
        questionList: {
            type: Array
        },
        question: {
            type: Object
        },
        nextQuestion: {
            type: Function
        },
        currentPage: {
            type: Number
        },
        showBtnControl: {
            type: Function
        },
        resetData: {
            type: Function
        }
    },
    data () {
        return {
            uuid: this.$tuhu.getUuid(),
            /**
             * 默认设备id
             */
            defaultDeviceId: '53a2cc42-27a9-3ae0-ae9b-80ad9e10a2cf',
            huaweiChannel: ''
        };
    },
    methods: {
        httpPost(url, params) {
            return this.$http.post(url, {
                apiServer: 'apiServer',
                isLoading: true,
                isErrorData: true,
                data: params
            });
        },
        httpFormData(url, params) {
            return this.$http.formData(url, {
                apiServer: 'apiServer',
                isLoading: true,
                isErrorData: true,
                data: params
            });
        },
        shareCallback(hashKey, type) {  // 只有添加分享记录的接口
            return new Promise((resolve, reject) => {
                this.getDeviceChannel().then(() => {
                    let params = {
                        deviceId: this.$tuhu.getUuid(),
                        Channal: this.huaweiChannel,
                        hashKey: hashKey,
                        chanceType: type!==1 ? 3 : 2
                    };
                    shareAddOne(this.$http, params).subscribe(back => {
                        let res;
                        if (back.Code + '' === '1') {
                            this.$tuhu.toast('分享成功！');
                            res = true;
                        } else {
                            this.$tuhu.toast('分享失败请多多包涵！！！');
                            res = false;
                        }
                        resolve(res);
                    });
                });
            });
        },
        getDeviceChannel() {
            if (!this.huaweiChannel) {
                return this.$tuhu.getDeviceDetail().then((info) => {
                    info && (this.huaweiChannel = info.deviceModel || '');
                });
            }
        },
        updateQusAnswer(params) {
            updateResult(this.$http, params).subscribe(res => {
                // console.log(5555, res);
                if (res.Code + '' === '1') {
                    this.$tuhu.toast('分享成功，此题记为正确');
                } else {
                    this.$tuhu.toast('分享失败请多多包涵！！！');
                }
            });
        },
        shareHandlerUpdate() { // 带有两个接口更新的分享
            return this.shareCallback(this.hashKey, 2).then(result => {
                if (result) {
                    let params = {
                        quesId: this.question.PKID,
                        options: this.virification.OptionsReal,
                        hashKey: this.hashKey
                    };
                    this.updateQusAnswer(params);
                }
            });
        },
        shareUtils(type, callb) {
            this.wxShareTipPop();
            if (type === 1) { // 只调用1个接口
                this.$$shareUtils(() => {
                    this.shareCallback(this.hashKey, 1).then(data => {
                        callb && callb();
                    });
                });
            } else { // 调用两个接口
                this.$$shareUtils(() => {
                    this.shareHandlerUpdate().then(data => {
                        callb && callb();
                    });
                });
            }
        },
        wxShareTipPop(flag = true) {
            if (this.$tuhu.device().isWeixin) {
                this.$$wxShareTipPop(flag);
            }
        }
    }
};
</script>
