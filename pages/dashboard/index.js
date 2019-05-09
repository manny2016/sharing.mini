import {
  queryHotSalesProducts, storeSharedBy, upgradeSharedPyramid
} from "../../utils/sharing";
import{relateSharingVUser,resetUserSession} from "../../utils/index"
import cfg from '../../config/index.js';
var common = require('../../utils/common.js');

var app = getApp();
Page({
  queryHotSalesProducts,
  storeSharedBy,
  upgradeSharedPyramid,
  relateSharingVUser,
  resetUserSession,
  data: {
    indicatorDots: true, //是否出现焦点
    autoplay: true, //是否自动播放轮播图
    interval: 4000, //时间间隔
    duration: 1000, //延时时间
    hiddenModal: true,
    showAuthDialog:false,
    rec: [],
    banners: [{
      id: "1",
      imageUrl: "https://www.yourc.club/images/banners/banner-01.jpg"
    },
    {
      id: "1",
      imageUrl: "https://www.yourc.club/images/banners/banner-02.jpg"
    },
    {
      id: "1",
      imageUrl: "https://www.yourc.club/images/banners/banner-03.jpg"
    }
    ]
  },

  onLoad: function (options) {    
    const me = this;
    me.storeSharedBy(options);    
    const token = wx.getStorageSync(cfg.localKey.token);
    
    if(!token.sharing) {
      me.setData({showAuthDialog:true});
    }
  },

  onShow: function () {
    //查询出推荐的商品
    const me = this;
    this.queryHotSalesProducts().then(source => {
      me.setData({
        rec: source.data
      });
    });
    
  },
  more: function () {
    wx.navigateTo({
      url: '../shop/index'
    })
  },
  brand: function () {
    wx.navigateTo({
      url: '../brand/brand'
    })
  },
  selectPeople(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../brandShop/brandShop?id=${id}`
    })
  },
  onShareAppMessage(page) {    
    const token = wx.getStorageSync(cfg.localKey.token);
    return {
      title: '柠檬工坊东坡里店',
      desc: '优质港式奶茶,好喝不贵,觉得不错就推荐给好友还能获得商家实时现金奖励哟！！！',
      path: '/pages/dashboard/index?sharedBy=' + token.token.openid // 路径，传递参数到指定页面。
    }
  },
  getUserInfoCallback: function (event) {
    const me = this;
    if (event.detail.userInfo) { //用户点了接受按钮              
      app.readlyUserInfoCallback(event.detail, callback => {                   
        me.setData({showAuthDialog:false});
       
        let sharedBy = wx.getStorageSync(cfg.localKey.sharedBy);
        const token = wx.getStorageSync(cfg.localKey.token);
        if(sharedBy){
          me.upgradeSharedPyramid({
            sharedBy: { appid: cfg.appid, openid: sharedBy },
            current: { appid: cfg.appid, openid: token.sharing.openid }
          });
        }
        // wx.switchTab({
        //   url: '/pages/dashboard/index',
        // })
      });

    } else {
      //用户按了拒绝按钮            
      app.readlyGettUserGrantedCallback(false);
    }
  }
})