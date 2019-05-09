// pages/welcome/index.js
import cfg from '../../config/index.js';
import ApiList from '../../config/api';
import { promisify, complete } from '../../utils/promisify';
import { co, Promise, regeneratorRuntime } from '../../utils/co-loader';
import request from '../../utils/request';
import { upgradeSharedPyramid } from '../../utils/sharing';
let app = getApp();
Page({
  upgradeSharedPyramid,
  /**
   * 页面的初始数据
   */
  data: {
    images: [
      "/images/welcome/welcome-01.jpg",
      "/images/welcome/welcome-02.jpg"
    ],
    image: "/images/welcome/welcome-01.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const me = this;
    
    app.getUserGranted().then(res => {
      app.readlyGettUserGrantedCallback(res);
      let token = wx.getStorageSync(cfg.localKey.token);
      if (res.canUseUserInfo && token.token.openid != undefined) {
        if (options.sharedBy) {
          
        }
        wx.switchTab({
          url: '/pages/dashboard/index',
        });
      }
      else {

      }
    })
  },
  getUserInfoCallback: function (event) {

    const me = this;
    if (event.detail.userInfo) { //用户点了接受按钮              
      app.readlyUserInfoCallback(event.detail, callback => {
        let shardby = me.getStorageSync(cfg.localKey.sharedBy);
        if(shardby){
          me.upgradeSharedPyramid({
            sharedBy: { appid: cfg.appid, openid: shardby },
            current: { appid: cfg.appid, openid: token.sharing.openid },
          });
        }
        
        wx.switchTab({
          url: '/pages/dashboard/index',
        })
      });

    } else {
      //用户按了拒绝按钮            
      app.readlyGettUserGrantedCallback(false);
    }
  }

})