/**
 * 活动类型（包括 大翻盘，摇奖机，问答抽奖）
 */
export const DRAW_LOTTERY_TYPE = {
    DRAW_LOTTERY_NEW_BIG_HIT: 'drawLotteryNewBigHit', // 新大翻盘
    DRAW_LOTTERY_ERNIE: 'drawLotteryErnie', // 摇奖机
    DRAW_LOTTERY_ANSWER_LUCKY_DRAW: 'drawLotteryAnswerLuckyDraw' // 问答抽奖
};

// display 状态类型值定义
export const DISPLAY_STATUS = {
    NO_LOTTERY_INFO: -1, // 接口没有返回抽奖信息
    START: 0, // 开始抽奖(有免费抽奖机会)

    NO_TIMES: 2, // 2:没有抽奖机会
    // REAL: 'real', // 中奖了
    SHARE: 8, // 8:有分享机会
    // TOMORROW: 2, // 用券
    NO_LOGIN: 9, // 如果用户没有登陆，点击跳转到登陆页面,
    NO_ADDRESS: 10, // 周期内有中实物奖励但未提交地址
    NO_AUTH: 11, // 没有权限抽奖
    SHARE_NO_APP: 22, // 有分享机会但不在微信或app内
    GETCLICK: 'getclick' // 抽取
    // INTEGRAL: 'integral' // 积分
};
