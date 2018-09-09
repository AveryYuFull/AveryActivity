const types = {
    SETANSWERINFO: 'SETANSWERINFO',
    GETANSERINFO: 'GETANSERINFO',
    SETQUESTIONCOUNT: 'SETQUESTIONCOUNT',
    SETVERIFICATION: 'SETVERIFICATION',
    COUNTINUEQ: 'COUNTINUEQ',
    SETHASHKEY: 'SETHASHKEY',
    SETREWARDINFO: 'SETREWARDINFO'
};
/**
 * 用户信息store
 *
 * @export
 * @returns {object}
 */
export function answerInfoStateFactory() {
    const answerInfo = {
        actions: {
            setAnswerInfo({commit, state}, answerInfo) {
                commit(types.SETANSWERINFO, answerInfo);
            },
            questionCount({commit, count}) {
                commit(types.SETQUESTIONCOUNT);
            },
            virification({commit, virif}) {
                commit(types.SETVERIFICATION);
            },
            continueQ({commit, con}) {
                commit(types.COUNTINUEQ);
            },
            hashKey({commit, con}) {
                commit(types.SETHASHKEY);
            },
            rewardInfo({commit, rewardinfo}) {
                commit(types.SETREWARDINFO);
            }
        },
        getters: {
            answerInfo(state) {
                // console.log('getters', state.data);
                return state.data;
            },
            questionCount(state) {
                // console.log('gettersquestionCount', state.questionCount);
                return state.questionCount;
            },
            virification(state) {
                // console.log('gettersvirification', state.virification);
                return state.virification;
            },
            continueQ(state) {
                // console.log('getterscontinue', state.continue);
                return state.continue;
            },
            hashKey(state) {
                // console.log('gettershashKey', state.hashKey);
                return state.hashKey;
            },
            rewardInfo(state) {
                // console.log('gettersrewardinfo', state.rewardinfo);
                return state.rewardinfo;
            }
        },
        state: {
            data: {},
            questionCount: {},
            virification: {},
            continue: 1,
            hashKey: '',
            rewardinfo: {}
        },
        mutations: {
            [types.SETANSWERINFO](state, answerInfo) {
                // console.log('mutations.answerInfo', state);
                state.data = answerInfo;
            },
            [types.SETQUESTIONCOUNT](state, count) {
                console.log('mutations.answerInfo', state);
                state.questionCount = count;
            },
            [types.SETVERIFICATION](state, virif) {
                console.log('mutations.answerInfo', state);
                state.virification = virif;
            },
            [types.COUNTINUEQ](state, con) {
                console.log('mutations.COUNTINUEQ', state);
                // debugger;
                state.continue = con;
            },
            [types.SETHASHKEY](state, con) {
                console.log('mutations.SETHASHKEY', state);
                // debugger;
                state.hashKey = con;
            },
            [types.SETREWARDINFO](state, rewardinfo) {
                console.log('mutations.SETREWARDINFO', state);
                // debugger;
                state.rewardinfo = rewardinfo;
            },
            [types.GETANSERINFO](state) {
                console.log('mutations.GETANSERINFO', state);
                return state.data;
            }
        }
    };

    return answerInfo;
}
