// pages/center/feedback/feedback.js

var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //添加反馈建议
  addFeedback: function (event) {
    var that = this;
    var contact = event.detail.value.contact;
    var content = event.detail.value.content;

    if (!contact) {
      common.showTip("联系方式不能为空", "loading");
      return false;
    }
    
    if (!content) {
      common.showTip("内容不能为空", "loading");
      return false;
    }

    if (!(/^1[34578]\d{9}$/.test(contact))) {
      common.showTip("手机号码有误", "loading");
      return false;
    } 

    that.setData({
      loading: true
    })
      
    

  },

})