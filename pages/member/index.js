// pages/my/index.js
import request from '../../utils/request.js';
import APIs from '../../config/api.js';
import WeToast from '../../components/wetoast/index.js';
import { co, Promise, regeneratorRuntime } from '../../utils/co-loader';
import { getUserInfo } from '../../utils/index';
import cfg from '../../config/index.js';
let app = getApp()

Page({
  getUserInfo,
  WeToast,
  data: {
    '__modal__': {
      show: false
    },
    name: '',     // 用户昵称
    avatar: '',   // 用户头像    
    logined: false,
  },
  onLoad() {
    const me = this;
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    app.getUserInfo(app.globalData.session).then(res => {      
      me.setData({ logined: true, name: res.wx.nickName, avatar: res.wx.avatarUrl });
    })
      .catch(error => {
        console.log(error);
        //wx.navigateTo({ url: '../../pages/login/index' });
      });

  },
  onReady() {
  },
  start() {

  }
});