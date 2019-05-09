//app.js
import cfg from 'config/index.js'

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
  getUserSession,
  getUserGranted,
  relateSharingVUser,  
  globalData: {   
    grantedScope: {
      canUseUserInfo: false,
      canUseMobile: false,
      canUseLocation: false
    },
    sharedBy:null  
  },
  onLaunch() {
    const me = this;     
    
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
  },
  onReady(){
   
  },
  onShow(){
    
  }
});