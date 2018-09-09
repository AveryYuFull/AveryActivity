import { getCoupon } from '../api/httpClient';
import { isApp } from '../util/commonUtil';

class CouponUtil {
    /**
     * 抽取优惠券
     * @param {Object} item 优惠券查询对象
     * @param {Object} $tuhu tuhu的lib库
     * @param {Object} $http http 库
     */
    static doCoupon (item, $tuhu, $http) {
        const couponUtil = new CouponUtil($tuhu, $http);
        couponUtil.handleCoupon(item);
    }

    constructor ($tuhu, $http) {
        this.$tuhu = $tuhu;
        this.$http = $http;

        this.priceResult = {};
        this.errorCode = -9999;
        this.errorMessage = '网络异常';
        this.CID = null;
    }

    /**
     * 抽取优惠券
     * @param {Object} item 优惠券查询对象
     */
    handleCoupon (item) {
        this.CID = item.CID || item.Cid;

        if (!this.CID) {
            return;
        }

        const result = this.priceResult[this.CID];

        if (result && result !== this.errorCode) {
            this.priceResult[this.CID] = result > 0 ? -2 : result;
            this.showGetTip();
        } else {
            this.login();
        }
    }

    /**
     * 登录
     */
    login () {
        this.$tuhu.getUserInfo({
            force: true
        }).then(data => {
            this.callBackResponse(data);
        });
    }

    /**
     * 获取用户信息成功后的回调
     * @param {Object} da 用户信息
     */
    callBackResponse(da) {
        if (da && da.userid) {
            const params = {
                'channel': isApp(this.$tuhu) ? 'H5' : 'Wechat',
                'getRuleGUID': this.CID,
                'userid': da.userid
            };

            getCoupon(this.$http, params)
                .subscribe((result) => {
                    this.priceResult[this.CID] = result.ErrorCode;
                    this.errorMessage = result.ErrorMessage || this.errorMessage;
                    this.showGetTip();
                }, (e) => {
                    this.priceResult[this.CID] = this.errorCode;
                });
        }
    }

    /**
     * 显示提示弹窗
     */
    showGetTip () {
        const result = this.priceResult[this.CID] - 0;

        if (result >= 0) {
            this.openAlertPop('领取成功！');
        } else if (result === -2) {
            this.openAlertPop('您已领取过!');
        } else if (result === -1) {
            this.openAlertPop('抱歉！您来晚了！');
        } else if (result === -5) {
            this.openAlertPop('新用户专享,仅限新用户领取');
        } else if (result === this.errorCode) {
            this.openAlertPop('网络异常');
        } else {
            this.openAlertPop(this.errorMessage);
        }
    }

    /**
     * 打开提示弹窗
     * @param {String} tipMess 提示信息
     */
    openAlertPop (tipMess) {
        this.$tuhu.alert('', tipMess);
    }
}

export default CouponUtil;
