import { getVoucherPackage } from '../api/httpClient';
import { isApp } from '../util/commonUtil';

class VoucherPackageUtil {
    constructor () {
        this.canPacket = true;

        this.errorMessage = '网络异常';
    }

    /**
     * 抽取优惠券
     * @param {Object} item 优惠券查询对象
     * @param {Object} $tuhu tuhu的lib库
     * @param {Object} $http http 库
     */
    doVoucherPackage (item, $tuhu, $http) {
        this.$tuhu = $tuhu;
        this.$http = $http;
        this.handleVoucherPackage(item);
    }

    /**
     * 抽取优惠券
     * @param {Object} item 优惠券查询对象
     */
    handleVoucherPackage (item) {
        if (!this.canPacket) {
            return;
        }

        this.canPacket = false;

        // 券包领券
        this.$tuhu.getUserInfo({
            force: true
        }).then((da) => {
            if (da && da.userid) {
                const params = {
                    'Channal': isApp(this.$tuhu) ? 'H5' : 'Wechat',
                    'hashKey': item.voucherPackageId,
                    'deviceId': this.$tuhu.getUuid()
                };

                getVoucherPackage(this.$http, params)
                    .subscribe(res => {
                        this.canPacket = true;
                        if (res.Code === 1) {
                            this.openAlertPop(res.PromptMsg);
                        } else if (res.Code === -1 || res.Code === -6) {
                            this.openAlertPop(res.Msg);
                        } else if (res.Code === 0) {
                            if (this.$tuhu.getParam('id') === '86A8248C') {
                                this.openAlertPop('新用户专享，请勿重复领取');
                            } else {
                                this.openAlertPop(res.Msg);
                            }
                        } else {
                            this.openAlertPop('您已领取过！');
                        }
                    }, () => {
                        this.canPacket = true;
                        this.openAlertPop(this.errorMessage);
                    });
            }
        });
    }

    /**
     * 打开提示弹窗
     * @param {String} tipMess 提示信息
     */
    openAlertPop (tipMess) {
        this.$tuhu.toast(tipMess);
    }
}

export default new VoucherPackageUtil();
