//app.js
import cfg from 'config/index.js'
import WeToast from '/components/wetoast/index.js'; //导入构造函数
import {
  getUserInfo
} from 'utils/index';
import {
  getUserSession,
  getUserGranted,
  relateSharingVUser

} from 'utils/index';

var app = getApp();
//app.js
App({
  WeToast, 
  getUserSession,
  getUserGranted,
  relateSharingVUser,

  globalData: {   
    grantedScope: {
      canUseUserInfo: false,
      canUseMobile: false,
      canUseLocation: false
    }  
  },
  onLaunch() {
    const me = this;     
    wx.login() // 重新登录
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效   
        console.log("session key 有效")    
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程     
        me.getUserGranted().then(res => {
          me.globalData.grantedScope = res;
        })
      }
    })      

    
    
  },  
  readlyUserInfoCallback: function(data,callback) {        
    const me = this;
    this.relateSharingVUser(data).then(ctx=>{
      
      if(ctx==null){
        this.readlyGettUserGrantedCallback(false);
      }
      else{      
        me.readlyGettUserGrantedCallback(true);
        if(ctx.token.openid!=undefined){
          callback();
        }
      }
    });
    
  },
  readlyGettUserGrantedCallback: function(isReady) {    
    this.globalData.grantedScope = {
      canUseUserInfo: isReady,
      canUseMobile: this.globalData.canUseMobile,
      canUseLocation: this.globalData.canUseLocation
    }
    console.log(this.globalData.grantedScope);
  },
  onReady(){
   
  },
  onShow(){
    
  }
});