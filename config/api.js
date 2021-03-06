/**
 * api list
 */
//const host = "https://www.yourc.club/";
const host = "http://192.168.0.101:62709/";
export default {
  "getSession": `${host}api/sharing/GetSession`,                                        //获取微信用户信息
  "register": `${host}api/sharing/Register`,                           //解密微信用户信息
  "queryCardsByMCode": `${host}api/sharing/QueryMCards`,                           //根据商户id查询 卡券
  "queryMCardDetails": `${host}api/sharing/QueryMCardDetails`,//查询会员卡详情
  "queryMyMCardDetails": `${host}api/sharing/QueryMyMCardDetails`,//查询我的已经拥有的会员卡列表
  "upgradeSharedPyramid": `${host}api/sharing/UpgradeSharedPyramid`,//更新分享信息
  "registerMCard": `${host}api/sharing/RegisterCardCoupon`,//更新分享信息
  "queryHotSalesProducts": `${host}api/sharing/GetHotSalesProducts`,//获取热销产品
  "queryProductTree": `${host}api/sharing/GetProductTreeNodeModels`,//获取产品及产品分类
  "queryProductDetails": `${host}api/sharing/GetProductDetails`,//获取产品及产品分类
  "queryMerchants":       `${host}api/enjoy/QueryMerchants`,                          //查询商信息
  "queryShops":           `${host}api/enjoy/QueryShops`,                          //查询附近门店
  "vcode":                `${host}api/enjoy/SendVerifyCode`,                           //绑定获取验证码
  "checkVerifyCode":      `${host}api/enjoy/CheckVerifyCode`,                  
  "bindMobile":           `${host}api/enjoy/BindMobile`,                                     //绑定手机号码
  "applyMCard": `${host}api/sharing/ApplyMCard`,                               // genrnate card extend string
  "payOrder": `${host}api/sharing/GenerateUnifiedorderforOrder`,                                     //订单支付
  "topUp": `${host}api/sharing/GenerateUnifiedorderforTopup`                                     //充值
  

}
