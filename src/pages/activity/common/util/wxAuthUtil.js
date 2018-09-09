import { isLogin } from '../api/httpClient';
import { isWx } from './commonUtil';

// const origin = location.origin;
// let GET_OUT_URL = '';
// if (origin.indexOf('.tuhu.work') > -1) {
//     GET_OUT_URL = 'https://wx.tuhu.work/User/WXlogin?ReturnUrl=';
// } else if (origin.indexOf('.tuhu.cn') > -1) {
//     GET_OUT_URL = 'https://wx.tuhu.cn/User/WXlogin?ReturnUrl=';
// } else {}

class WxAuthUtil {
    /**
     * 获取用户信息(包含了微信授权的功能)
     * @param {Object} $tuhu 库
     * @param {Object} $http 对象
     * @param {Boolean} forceLogin 是否需要登录
     * @returns {Promise} 返回一个promise
     */
    getUserInfo ({
        $tuhu,
        $http,
        forceLogin
    }) {
        const GET_OUT_URL = $http.getApiUrl('wxServer', '/User/WXlogin?ReturnUrl=');
        return new Promise(resolve => {
            isLogin($http)
                .subscribe(res => {
                    if (res.result + '' === '0') {
                        if (forceLogin) {
                            if (isWx($tuhu) && $tuhu.getParam('evmt')) {
                                location.href = GET_OUT_URL + encodeURIComponent(location.href) + '&isauthcode=1&onlywxlogin=1&showLogin=0';
                            } else {
                                $tuhu.getUserInfo({
                                    force: true
                                });
                            }
                        }
                        resolve(null);
                    } else {
                        $tuhu.getUserInfo().then(userInfo => {
                            resolve(userInfo);
                        });
                    }
                });
        });
    }
}

export default new WxAuthUtil();
