// 微信根服务
export const BASE_URL = 'https://wx.tuhu.cn';

// 接口6：大翻盘，答题抽奖，摇奖机配置数据
export const GET_BIG_BRAND_CONFIG = '/Active/GetBigBrandConfig';

// 问答抽奖 获取用户是否可以抽奖
export const GET_SELECT_CAN_PACKER = '/Active/SelectCanPacker';

// 问答抽奖 获取用户抽中的奖品
export const GET_ANSWER_PACKET = '/Active/GetAnswerPacket';

// 问答抽奖 判断用户是否答对题目
export const ANSWER_VERIFICATION = '/Active/AnswerVerification';

// 问答抽奖 将用户答案更新为正确
export const UPDATE_RESULT= '/Active/UpdateResult';

// 问答抽奖 分享增加一条数据接口
export const SHARE_ADD_ONE = '/BigBrand/ShareAddOne';

// 获取用户是否可以免费抽奖
export const SELECT_CAN_PACKER = '/bigbrand/SelectCanPacker';

// 抽奖（新增加实物抽奖）
export const GET_PACKET = '/BigBrand/GetPacket';

// 查询收货地址
export const SELECT_USER_ADDRESS = '/Addresses/SelectAddresses';

// 更新用户收货地址
export const UPDATE_REAL_ADDRESS = '/bigbrand/UpdateRealAddress';

// 查询普通商品（商品池）
export const GET_PRODUCT_POOL = '/Active/GetProductPool';

// 判断大翻盘或摇奖机模块是否需要登录
export const PAKCER_BEFORE_IS_MUST_LOGIN = '/BigBrand/PakcerBeforeIsMustLogin';

// 查询 系统推荐，一图三产品，拼团 的数据
export const GET_PRODUCT_MODULE = '/Active/GetProductModule';

// 查询秒杀数据
export const GET_ACTIVITY_SECONDSKILL = '/Active/GetActivitySecondsKill';

// （通用活动页，分车型活动页，一行1~4列，滑动优惠券，轮播文字链，底部tab，视频） 的数据
export const GET_MODULE_DETAIL = '/Active/GetModuleDetail';

// 判断是否登录接口
export const IS_LOGIN_URL = '/Activity/IsLogin';

// #保养定价
export const GET_FIXED_PRICE_ACTIVITY_STATUS = '/Active/GetFixedPriceActivityStatus'; // 请求参数：string acticityId

// 获取抽奖列表
export const SELECT_PACK = '/BigBrand/SelectPack';

// 领券
export const GET_COUPON_URL = '/SPages/GetPCodeByGetRuleID.aspx';

// 领券包
export const GET_PACKET_URL = '/bigbrand/GetPacket';

// 获取模块基本信息
export const GET_ACTIVITY_MODULE_INFO = '/Active/GetActivityModuleInfo';
