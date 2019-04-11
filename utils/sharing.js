import cfg from '../config/index.js';
import ApiList from '../config/api';
import {
  promisify,
  complete
} from 'promisify';
import {
  co,
  Promise,
  regeneratorRuntime
} from 'co-loader';
import request from 'request';


const queryCardsByMid = co.wrap(function* (mcode) {
  const result = yield request({
    url: ApiList.queryCardsByMCode,
    method: "POST",
    data: {
      "mocde": mcode
    }
  });
  return result;
});
const topup = co.wrap(function* (context) {
  const result = yield request({
    url: ApiList.topUp,
    data: context
  });
  return result;
})
const payOrder=co.wrap(function* (context){
  const result = yield request({
    data:context,
    url:ApiList.payOrder
  });
  return result;
});
const queryMCardDetails = co.wrap(function* (data) {
  const result = yield request({
    method: "POST",
    url: ApiList.queryMCardDetails,
    data: data
  });
  return result;
});

const queryMyMCardDetails = co.wrap(function* (data) {
  const result = yield request({
    method: "POST",
    url: ApiList.queryMyMCardDetails,
    data: data
  });
  return result;
});

const upgradeSharedPyramid = co.wrap(function* (data) {
  const result = yield request({
    method: "POST",
    url: ApiList.upgradeSharedPyramid,
    data: data
  });
  return result;
});
const queryHotSalesProducts = co.wrap(function* () {
  const data = { "mcode": cfg.mcode };
  const result = yield request({
    method: "POST",
    url: ApiList.queryHotSalesProducts,
    data: data
  });
  return result;
});
const queryProductTree = co.wrap(function* () {
  const data = { "mcode": cfg.mcode };
  const result = yield request({
    method: "POST",
    url: ApiList.queryProductTree,
    data: data
  });
  return result;
});
const queryProductDetails=co.wrap(function* (id){ 
  const data= {"id":id};  
  const result = yield request({
    method:"POST",
    url: ApiList.queryProductDetails,
    data:data
  });
  return result;
});
const detectSharedBy=function(options){
  if (options.sharedby){
    wx.setStorageSync(cfg.localKey.sharedBy, options.sharedby);
  }
};
export {
  queryCardsByMid,
  topup,
  queryMCardDetails,
  queryMyMCardDetails,
  upgradeSharedPyramid,
  queryHotSalesProducts,
  queryProductTree,
  queryProductDetails,
  detectSharedBy,
  payOrder
};