import Vuex from 'vuex';

import createLogger from '../../lib/vuex/plugins/logger';
import {answerInfoStateFactory} from './modules/answerInfo';
import {tireInfoStateFactory} from './modules/tireInfo';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

window.addEventListener('storage', function (event) {
    if (!tuhu.isLightApp) {
        return;
    }

    if (event.key === '_tab_updatestore_car') {
        tuhu.store.commit('setCarInfo', {
            car: JSON.parse(event.newValue)
        });
    }
});
let lastCarInfo = false;

let lastUserInfo = false;

let lastLocationInfo = false;

export default new Vuex.Store({
    state: {
        _userInfo: false,
        _locationInfo: false,
        _carInfo: false
        // _answerInfo: answerInfoStateFactory().state._answerInfo
    },
    mutations: {
        setCarInfo(state, payload = {}) {
            payload = Object.assign({
                force: false
            }, payload);
            if (!tuhu.util.objectEqual(lastCarInfo, payload.car)) {
                if (payload.car) {
                    lastCarInfo = Object.assign({}, payload.car);

                    state._carInfo = Object.assign({}, payload.car);
                } else {
                    lastCarInfo = {};

                    state._carInfo = {};
                }

                tuhu.isLightApp && tuhu.localStorage.setItem('_tab_updatestore_car', JSON.stringify(state._carInfo));
            }
        },
        setUserInfo(state, payload = {}) {
            payload = Object.assign({
                force: false
            }, payload);

            if (!tuhu.util.objectEqual(lastUserInfo, payload.userInfo)) {
                lastUserInfo = Object.assign({}, payload.userInfo);
                state._userInfo = Object.assign({}, payload.userInfo);
            }
        },
        /**
         * 设置地理位置信息
         * @param {Object} state state
         * @param {Object} payload payload
         */
        setLocationInfo(state, payload = {}) {
            if (!tuhu.util.objectEqual(lastLocationInfo, payload.locationInfo)) {
                if (payload) {
                    lastLocationInfo = Object.assign({}, payload.locationInfo);

                    state._locationInfo = Object.assign({}, payload.locationInfo);
                } else {
                    lastLocationInfo = null;

                    state._locationInfo = null;
                }
            }
        }
    },
    modules: {
        answerInfo: answerInfoStateFactory(),
        tireInfo: tireInfoStateFactory()
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
