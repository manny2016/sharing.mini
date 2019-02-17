


// pages/center/index.js

Page({
  data:{
    loading: true
  },
  onLoad:function(options){
    //页面初始化 options为页面跳转所带来的参数
    var that = this;
    var value = wx.getStorageSync('openid')
    if (value) {
   
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  cart:function(){
    wx.switchTab({ 
      url: '../cart/index' 
    })
  },

  sale: function () {
    wx.navigateTo({
      url: '../sale/sale'
    })
  },

  feedback : function(){
    wx.navigateTo({
      url: './feedback/feedback'
    })
  },
  open:function(){
    var that= this;    
    wx.login({
      success: function (res) {
     
      }
    });
  },
  member:function(){
    wx.navigateTo({
      url: '../card/index'
    })
  }
})