import {
  queryHotSalesProducts, detectSharedBy
} from "../../utils/sharing";
var common = require('../../utils/common.js');
var app = getApp();
Page({
  queryHotSalesProducts,
  detectSharedBy,
  data: {
    indicatorDots: true, //是否出现焦点
    autoplay: true, //是否自动播放轮播图
    interval: 4000, //时间间隔
    duration: 1000, //延时时间
    hiddenModal: true,   
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

  onLoad: function(options) {
    
  },

  onShow: function() {
    //查询出推荐的商品
    const me = this;
    this.queryHotSalesProducts().then(source => {
      me.setData({
        rec: source.data
      });
    });
  },
  more: function() {
    wx.navigateTo({
      url: '../shop/index'
    })
  },
  brand: function() {
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
    console.log(token);
    return {
      title: '柠檬工坊东坡里店',      
      desc: '优质港式奶茶,好喝不贵,觉得不错就推荐给好友还能获得商家实时现金奖励哟！！！',
      path: '/pages/welcome/index?sharedby='+token.token.openid // 路径，传递参数到指定页面。
    }
  }
})