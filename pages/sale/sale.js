var that;

var util = require("../../utils/util.js");
Page({
  data: {
    currentTab: 0,
    winHeight: null,
  },
  onLoad(options) {
    if (options.id) {
      this.setData({
        currentTab: options.id
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
  },
  onReady () {
    // 页面渲染完成
  },
  onShow() {
    // 页面显示
    //获取全部订单信息
  

  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }

  },

  bindChange: function (e) {
    that = this;
    that.setData({ currentTab: e.detail.current });

  },


});
