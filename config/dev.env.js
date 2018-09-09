const chalk = require('chalk');
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const proxyConfig = {
    'proxyTarget': {
        'https://wxdev.tuhu.work': [
            '/BigBrand/PakcerBeforeIsMustLogin',
            '/order/PayWayGetToken',
            '/activity/setpagestack',
            '/activity/getpagestack',
            '/Activity/IsLogin',
            '/Activity/GetUserInfo',
            '/user/SelectConvertToBaidu',
            '/Beautify/GetRegionName2',
            '/user/SetLoginCookie',
            '/user/LogoutCookie',
            '/WechatAPP/GetWechatHomeNew',
            '/user/GetUserCurrent',
            '/products/GetProductDesction',
            '/Seckill/SelectSeckill',
            '/user/GetUserCur∂rent',
            '/Activity/IsLogin',
            '/Activity/GetUserInfo',
            '/home/getchann∂∂∂∂∂el',
            '/order/SelectPromotionNew',
            '/Order/SubmitOrder',
            '/Order/getAllExtraServices',
            '/home/GetCurrentInfo',
            '/Order/SubmitOrderForNew',
            '/Order/CreateShopOrder',
            '/bigbrand/SelectCanPacker',
            '/BigBrand/ShareAddOne',
            '/bigbrand/UpdateRealAddress',
            '/BigBrand/GetPacket',
            '/bigbrand/GetPacket',
            '/BigBrand/SelectPack',
            '/search/allbusiness',
            '/Order/CheckOrderHasLunTaiXian',
            '/order/CancelOrder',
            '/Activity/GetEntityCache',
            '/Tires/GetPromotionCode',
            '/shops/GetPatternArticle',
            '/shops/GetActivityByid',
            '/shops/GetTiresize',
            '/Shops/selectBrandShopById',
            '/Shops/selectPatternDetail',
            '/BigBrand/SelectPromotionListRecord',
            '/Peccancy/UploadFile',
            '/products/GetProductDesction',
            '/order/selectsuccessorder',
            '/order/InsertLunTaiXianForAPP',
            '/order/CheckOrderHasLunTaiXian',
            '/user/SelectMap',
            '/LuckyWheel/SelectCanPacker',
            '/GaiZhuang/SelectAllCategoryInfo',
            '/GaiZhuang/GetChildChangeCategoryById',
            '/GaiZhuang/GetChangeCategoryById',
            '/zeroactivity/GetZeroActivityListJson',
            '/zeroactivity/GetZeroActivityDeatil',
            '/zeroactivity/GetMyZeroActivityListJson',
            '/zeroactivity/SubmitZeroActivity',
            '/zeroactivity/GetOrSetAzeroActivityApplication',
            '/zeroactivity/GetChoseUsers',
            '/home/FetchRegion'
        ],
        'http://item.dev.tuhu.work': [
            '/CarHistory/SelectCarObject.html',
            '/CarHistory/DeleteCarObject.html',
            '/CarHistory/AddCarObject.html',
            '/CarHistory/SetDefaultCar.html',
            '/Car/GetCarBrands2',
            '/Car/SelOneBrand',
            '/Car/SelectVehicle',
            '/CarHistory/UpdateCarObject.html',
            '/Car/GetVehicle',
            '/Car/SelectVehicleSalesName',
            '/Product/SelectSkuProductGroup.html',
            '/Product/FetchTiresDetail.html',
            '/Product/SelectProductInstallServices.html',
            '/Products/Properties',
            '/Search/SearchPropertyList.html',
            '/Search/SearchListVersion2.html',
            '/Comment/GetCommentStatistic.html',
            '/Product/SelectProperty.html',
            '/CarHistory/SetDefaultCar.html',
            '/Product/SelectTires.html',
            '/Product/SelectHub.html',
            '/Comment/FetchApi.html',
            '/CarHistory/UpdateCarObject.html',
            '/CarHistory/AddCarObject.html'
        ],
        'https://faxian.tuhu.cn': [
            '/article/getarticlelist',
            '/article/UploadShareImages',
            '/article/UploadShareImages'
        ],
        'https://api.tuhu.cn': [
            '/Active/GetActivity'
        ],
        'https://apirelease.tuhu.work': [
            '/Active/GetFixedPriceActivityConfig',
            '/Active/GetModuleDetail',
            '/Active/GetProductModule',
            '/Active/GetProductPool',
            '/Active/GetActivityModuleInfo',
            '/Active/GetBigBrandConfig',
            '/Comment/GetProductComments',
            '/Prime/SelectShanGouProducts',
            '/User/GetIdentityCode',
            '/User/SignIn',
            '/Vehicle/VerificationVehicleInspectionInfo',
            '/addresses/SelectAddresses',
            '/Addresses/SetDefaultAddress',
            '/Addresses/DeleteAddress',
            '/Addresses/AddOrEditAddress',
            '/Product/SelectVehicleInspectionProductInfos',
            '/User/SelectUserInfoVersion1',
            '/user/GetMemberMallUserInfo',
            '/User/Alert',
            '/User/UpdateUserObjects',
            '/User/GetInternalCenterInfo',
            '/User/SelectUserIntegralRecordByUserId',
            '/Search/SelectDefaultAndHotSearchKeyWord',
            '/Prime/SelectPrimeTiresPrice',
            '/prime/GetAllSortCategory',
            '/Action/SelectProductPromotionGetRules',
            '/action/CreateProductPromotion',
            '/Shops/SelectShopListArea',
            '/Shops/SelectShopCategories',
            '/Shops/SelectShopList',
            '/Shops/SelectBookShops',
            '/Order/OrderCompletePage',
            '/Order/SelectOrdersVersion1',
            '/Order/SelectCommentListByUserId',
            '/prime/GetAllSortCategory',
            '/Addresses/SelectAreas',
            '/Active/ConvertFreePromotionCode',
            '/User/UserCheckInVersion1',
            '/user/SelectUserIntegralByUserId',
            '/Order/IsProductVehicleMatch',
            '/Cart/AddCartItem',
            '/Addresses/SelectAddresses',
            '/Cart/GetCartItemTotalCount',
            '/Order/SelectPromotionCodeByType',
            '/order/SelectProductServicesAndGifts',
            '/Shops/GetShopDetailByShopId',
            '/Order/GetConfirmOrderDataForMaintain',
            '/Comment/SelectProductTopNComments',
            '/GroupBuying/GetBeautyConfigInfo',
            '/GroupBuying/GetGroupBuyingIndexData',
            '/GroupBuying/GetGroupBuyingConfigInfo',
            '/GroupBuying/GetGroupBuyingDetail',
            '/Tires/SelectTireActivity',
            '/user/GetMemberMallCouponList',
            '/Order/GetReturnGoodsApplyTaskByUserId',
            '/Order/GetReturnGoodsApplyTaskByTaskId',
            '/Order/GetReturnGoodsOprLog',
            '/User/GetExchangeProductDetail',
            '/Action/IntegralDraw',
            '/User/InsertExchangeProductRecord',
            '/user/GetMemberMallProducts4Tabs',
            '/Product/GetProductVideoInfo',
            '/User/SelectPromotion',
            '/Order/SelectCouponList',
            '/Order/GetDefaultInfo',
            '/Order/GetArrivedBookDateTimeByPids',
            '/Order/MarkDeleteOrder',
            '/Order/SelectOrderTracking',
            '/User/SelectTogetherZoneNew',
            '/Cart/GetCartDetail',
            '/Cart/RemoveCartItem',
            '/Shops/SelectBookShopArea',
            '/Product/GetProductVideoInfo',
            '/Comment/SelectShopComments',
            '/User/ImageUpLoad',
            '/Comment/SeleltShopCommentsByOrderId',
            '/Comment/SelectOrderCommentsByOrderId',
            '/Comment/SubmitCommentOrderVersion1',
            '/Order/ImageUpLoad',
            '/Cart/RemoveCartItem',
            '/Shops/SelectBookShopArea',
            '/Product/GetProductVideoInfo',
            '/User/SelectPromotion',
            '/Comment/GetProductComments',
            '/Comment/SelectProductTopNComments',
            '/Addresses/SelectAddresses',
    //   '/Active/GetActivity',
            '/Tires/SelectActivityTires',
            '/Product/GetProductDetail',
            '/Comment/SelectCommentStatistic',
            '/Comment/FetchPatternApi.html',
            '/Product/GetProductTagForTire',
            '/Tires/GetTireActivity',
            '/Product/GetProductGifts',
            '/Shops/GetDefaultShopForProductDetail',
            '/Product/GetShopNumberByArea',
            '/Product/GetTireFlagShip',
            '/Order/GetArrivedBookDateTimeByPids',
            '/Comment/GetProductComments',
            '/Comment/SelectShopComments',
            '/GroupBuying/GetBeautyProductsAll',
            '/GroupBuying/GetTuhuBeautyProducts',
            '/Order/GetOptionalsForTireOrder',
            '/order/SelectOrderAdvertise',
            '/Order/FetchOrderDetialVersion1',
            '/Order/GetOrderDetailStatusInfo',
            '/order/CancelOrder',
            '/Order/GetOrderCancelReason',
            '/Action/CreateProductPromotion',
            '/Product/GetProductTagForHub',
            '/Vehicle/TireAdapterStatus',
            '/Active/GetFixedPriceActivityStatus',
            '/Active/GetActivityProductInfoByRegion',
            '/Search/GetTireAdapterSize',
            '/Search/GetHubAdapterPid',
            '/Search/GetTireAdapterSize',
            '/CarHistory/GetVehicleTypeCertificationInfoByCarId',
            '/BaoYang/SelectBatteryListNew',
            'Cart/RemoveCartItem',
            '/BaoYang/GetXiaoBaoYangPackage',
            '/BaoYang/GetXiaoBaoYangPackageDetail',
            '/Product/GetProductGifts',
            '/Comment/SelectProductTopNComments',
            '/Comment/GetProductComments',
            '/Vehicle/MergeUserVehicle',
            '/Comment/SelectCommentStatistic',
            '/Order/GetDefaultInfo',
            '/BaoYang/CreateXiaoBaoYangPackageOrder',
            '/BaoYang/GetConfirmOrderDataForXbyPackage',
            'Cart/RemoveCartItem',
            '/Order/PushLogistics',
            '/Cart/BatchModifyCartItem',
            '/action/SelectBaoYangActivitySetting',
            '/action/CreateBaoYangActivityPromotion',
            '/Search/SelectFilterValues',
            '/Shops/GetProductDetailForShop',
            '/Product/SelectProperty',
            '/Active/SelectCanPacker',
            '/Active/AnswerVerification',
            '/Active/GetAnswerPacket',
            '/Active/UpdateResult',
            '/Order/SelectNoInvoiceOrdersByUser',
            '/Order/FetchOrderDetialVersion1',
            '/Order/invoice',
            '/Order/SelecttHistoryInvoice',
            '/Order/SelectInvoiceProcessByOrderId',
            '/Order/SendInvoiceTemplate',
            '/Order/GetRoadRescueData',
            '/Order/GetRoadRescueProduct',
            '/Order/GetReturnGoodsProductDetails',
            '/Order/ShouHouImageUpLoad',
            '/Order/CreateOrder',
            '/Order/CreateReturnGoodsApplyTask',
            '/Search/SelectSearchHistoryV2',
            '/Search/ClearSearchHistory',
            '/Search/InsertSearchHistory',
            '/GroupBuying/ExchangeBeautifyVipServiceCode',
            '/GroupBuying/GetUserServiceCodesByUserId',
            '/GroupBuying/GetBigCustomerStatistics',
            '/GroupBuying/ExchangeBeautifyVipServiceCodeSecond',
            '/User/IsNewMember',
            '/prime/GetWxAppHomePageModule',
            '/Search/SearchList',
            '/Paint/SelectPaintProducts',
            '/Paint/GetServiceCharge',
            '/Paint/SelectProductPromotionForPaint',
            '/Paint/SelectPaintShops',
            '/Paint/SelectPaintPromotion',
            '/Shops/GetShopDetailByShopId',
            '/Paint/SelectPaintShopComments',
            '/Paint/SelectPaintShopArea',
            '/Paint/SelectPaintShops',
            '/FuelCard/CreateFuelCardOrder',
            '/FuelCard/DeleteUserFulCardByCardID',
            '/FuelCard/SelectFuelCardConfig',
            '/FuelCard/SelectUserFuelCardByUserID',
            '/Order/GetMatchCompanyNames',
            '/Order/GetTaxNoByCompany',
            '/Peccancy/SelectQueryConfigCityList',
            '/Product/GetTireList',
            '/GroupBuying/GetRegionInfo',
            '/Search/SearchList',
            '/Paint/CreatePaintOrder',
            '/Shops/GetShopDetailByShopId',
            '/Paint/SelectPaintShopComments',
            '/Paint/SelectPaintShopArea',
            '/Paint/SelectPaintShops',
            '/User/SelectKeFuGroupId',
            '/Order/SelectPromotionCodeByRuleIdAsync',
            '/Paint/CreateVipPaintOrder',
            '/Paint/VerifyVipPaintPromotionCarNo',
            '/Paint/GetVipPaintProduct',
            '/GroupBuying/ExchangeBeautifyVipServiceCodeForThirdParty',
            '/GroupBuying/ExchangeBeautifyVipServiceCodeForThirdParty2',
            '/GroupBuying/GetUserServiceCodesByUserId',
            '/GroupBuying/GetBigCustomerStatistics',
            '/Shops/SelectShopList',
            '/Shops/SelectShopListArea',
            '/SelectPromotionCodeByType/Order/SelectPromotionCodeByType',
            '/home/GetWxJsApiParams',
            '/GroupBuying/ExchangeBeautifyVipServiceCodeSecond',
            '/GroupBuying/ExchangeBeautifyVipServiceCode',
            '/Addresses/GetRegionId',
            '/User/GetIdentityCode',
            '/GroupBuying/GetBeautyBigCustomerProducts',
            '/GroupBuying/GetRedemptionGroups',
            '/Active/GetActivitySecondsKill',
            '/Active/GetProductModule'
        ],
        'https://by.tuhu.cn': [
            '/apinew/GetAppFirstPageExternalData.html',
            '/apinew/GetBaoYangAppPackages.html',
            '/Prime/SelectPrimeTiresPrice',
            '/apinew/GetPromotionRulesByPackageType.html',
            '/apinew/SearchAppBaoYangProductv2.html',
            '/apinew/CreatePromotionCode.html',
            '/apinew/GetSameSeriesProduct.html',
            '/apinew/GetSameSeriesProductsWithDefaultCount.html',
            '/apinew/GetShandan.html',
            '/YearPackage/GetVehicleProperties.html',
            '/apinew/GetPackageByInstallType.html',
            '/apinew/GetSameSeriesJiYou.html'
        ],
        'https://cashierapi.tuhu.cn': [
            '/cashier/v1/huabei/order/rate/',
            '/cashier/v1/preChecked',
            '/cashier/v1/build',
            '/cashier/v1/pay',
            '/cashier/v1/query/',
            '/cashier/v1/cryptogram/check',
            '/cashier/v1/sms/send',
            '/cashier/v1/cryptogram/set',
            '/cashier/v1/cryptogram/reset'
        ],
        'http://172.16.20.56': [
            '/GroupBuying/GetUserServiceCodesGroup'
        ]
    // 'https://172.16.20.56:8081': [
    //     '/activity/Active/SelectCanPacker',
    //     '/activity/Active/AnswerVerification',
    //     '/activity/Active/GetAnswerPacket',
    //     '/activity/Active/GetBigBrandConfig'
    // ],
    }
};

function onProxyError(proxy) {
    return function (err, req, res) {
        var host = req.headers && req.headers.host;
        console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
        console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    );
        console.log();

    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
        if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
        }
        res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    );
    };
}

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    proxyTable: {
        filter: (pathname) => {
            return Object.keys(proxyConfig.proxyTarget).some((key) => {
                return proxyConfig.proxyTarget[key].some((item) => {
                    return pathname.indexOf(item) > -1;
                });
            });
        },
        router: (req) => {
            let result = 'https://item.tuhu.cn';
            const apis = proxyConfig.proxyTarget;
            for (const key in apis) {
                if (apis[key].some((item, index) => {
                    if (req.originalUrl.replace(/[?&|;].+$/, '') === item) {
                        result = key;
                        return true;
                    }
                    if (apis[key].indexOf('/Products/Properties') > -1) {
                        result = 'https://item.tuhu.cn';
                    }
                })) {
                    break;
                }
            }

            console.log('代理 ' + req.originalUrl + ' 到 ' + result);
            return result;
        },
        target: 'https://wx.tuhu.cn',
        logLevel: 'silent',
        onError: onProxyError(''),
        secure: false,
        changeOrigin: true,
        children: {
            '/work': {
                target: 'https://apirelease.tuhu.work',
                changeOrigin: true,  // 是否跨域
                secure: false,
                pathRewrite: {
                    '^/work': ''
                }
            },
            '/api': {
                target: 'https://api.tuhu.cn',
                changeOrigin: true,  // 是否跨域
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/wx': {
                target: 'https://wxdev.tuhu.work',
                changeOrigin: true,  // 是否跨域
                secure: false,
                pathRewrite: {
                    '^/wx': ''
                }
            }
        }
    }
});
