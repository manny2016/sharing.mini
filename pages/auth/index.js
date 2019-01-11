// pages/blank/index.js
let app = getApp();
Page({
  /**
   * Page initial data
   */
  data: {
    showAuth:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const me = this;
    me.setData({ showAuth: app.globalData.showAuth});
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {//已授权               
          me.setData({ showAuth: false });
          app.getUserInfo().then(res => {
            console.log("auth getuserinfo",res);
            if(res.enjoy.state.hasMobile){
              wx.navigateTo({
                url: '../../pages/member/index',
              })
            }
            else{
              wx.navigateTo({
                url: '../../pages/login/index',
              })
            }
          });
        }
        else {//需要授权
          me.setData({ showAuth: true });
        }
      }
    });
  },
  auth: function (event) {
    const me = this;
    if (event.detail.userInfo) { //用户点了接受按钮     
      app.getUserInfo().then(res => {
          if(res.enjoy.state.hasMobile){
            wx.navigateTo({
              url: '../../pages/member/index',
            })
          }
          else{
            wx.navigateTo({
              url: '../../pages/login/index',
            })
          }
      })
      .catch(error => {});
    } else {
      //用户按了拒绝按钮
      console.log("用户点了拒绝");
    }
  }
})