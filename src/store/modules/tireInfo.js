/**
 * 车型store
 *
 * @export
 * @returns {object}
 */
export function tireInfoStateFactory() {
    const tireInfo = {
        namespaced: true,
        actions: {

        },
        getters: {
            isShowTire(state) {
                return state.isShowTire;
            },
            selectSize(state) {
                return state.selectSize;
            },
            isTireSize(state) {
                return state.isShowTag;
            },
            selectTire(state) {
                return state.selectTire;
            },
            tireSize(state) {
                return state.tireSize;
            }
        },
        state: {
            isShowTire: false,
            selectSize: null,
            isTireSize: null,
            isShowTag: false,
            selectTire: '',
            tireSize: ''
        },
        mutations: {
            setShowTire (state, isShowTire) {
                state.isShowTire = isShowTire;
            },
            setSelectSize (state, selectSize) {
                state.selectSize = selectSize;
            },
            setIsTireSize (state, isTireSize) {
                state.isTireSize = isTireSize;
            },
            isShowTag (state, isShowTag) {
                state.isShowTag = isShowTag;
            },
            setSelectTire (state, selectTire) {
                state.selectTire = selectTire;
            },
            setTireSize (state, tireSize) {
                state.tireSize = tireSize;
            }
        }
    };

    return tireInfo;
}
