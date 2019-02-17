

import { queryHotSalesProducts } from "../../utils/sharing";

Page({
  queryHotSalesProducts,
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
    }]
  },

  onLoad: function () { },

  onShow: function () {
    //查询出推荐的商品
    const me = this;
   
    this.queryHotSalesProducts().then(source => {     
      me.setData({ rec: source.data });
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
})