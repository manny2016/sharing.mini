// pages/make-order/index.js
Page({
  /**
   * Page initial data
   */
  data: {
    cardid: null,    
    payModes: [{
        name: "card",
        text: "余额支付(￥33.00元)",
        checked: true
      },
      {
        name: "wechat",
        text: "微信支付",
        checked: false
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const me = this;
    me.setData({
      cardid: options.cardid
    })
    console.log(options.cardid);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})