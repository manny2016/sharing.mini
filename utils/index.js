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

const getUserSession = co.wrap(function*(reset) {  
    const basic = yield promisify(wx.login)();
    console.log("basic", basic);
    const userSession = {
      code: null,
      session_key: null,
      openid: null,
      expires_in: 0
    };
    
    const session = yield request({
      url: ApiList.getSession ,
      method: "POST",
      data: {
        appid: cfg.appid,
        secret: cfg.secret,
        js_code: basic.code,
        grant_type: "authorization_code"
      }
    });
    console.log("session",session);
    userSession.code = basic.code;
    userSession.session_key = session.data.session_key;
    userSession.openid = session.data.openid;
    userSession.expires_in = session.expires_in;
    wx.setStorageSync(cfg.localKey.session, userSession);  
    console.log("userSession",userSession);
    return userSession;
});


const getUserGranted = co.wrap(function*() {
  const scope = {
    canUseUserInfo: false,
    canUseMobile: false,
    canUseLocation: false
  };
  const settings = yield promisify(wx.getSetting)();
  if (settings.authSetting["scope.userInfo"]) {
    scope.canUseUserInfo = true;
  } else {
    scope.canUseUserInfo = false;
  }
  if (settings.authSetting["scope.userLocation"]) {
    scope.canUseLocation = true;
  } else {
    scope.canUseLocation = false;
  }
  if (settings.authSetting["scope.phoneNumber"]) {
    scope.canUseMobile = true;
  } else {
    scope.canUseMobile = false;
  }
  return scope;
});
/**
 * 关联平台用户如果不存在则创建并返回平台用户
 */
const relateSharingVUser = co.wrap(function*(wxUserInfo) {   

  let session = yield getUserSession();
  const userInfo = {
    wx: wxUserInfo,
    sharing: null,
    token: session,
    unionId: null
  };

  //获取 unionId
  if (session) {
      console.log("session is ok");
    var postData = {
      appid: cfg.appid,
      data: wxUserInfo.encryptedData,
      iv: wxUserInfo.iv,
      sessionKey: session.session_key,
      wx: wxUserInfo.userInfo
    };
    const result = yield request({
      url: ApiList.register,
      method: "POST",      
      data: postData
    });
    console.log("session",session);

    userInfo.sharing = result.data;
    userInfo.unionId = result.data.unionId;
    wx.setStorageSync(cfg.localKey.token, userInfo);
    return userInfo;
  }
  return null;
});
export {  
  getUserSession,  
  getUserGranted,
  relateSharingVUser
};