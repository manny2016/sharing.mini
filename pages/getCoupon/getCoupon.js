// pages/getCoupon/getCoupon.js
// var Bmob = require("../../utils/bmob.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:null
  },
  onShow() {
  

  },
  getCoupon(e){
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index;
    const data = this.data.coupon

    const Diary = Bmob.Object.extend("user_coupon");
    const diary = new Diary();

    const coupon = Bmob.Object.extend("coupon");
    const query = new Bmob.Query(coupon);

    const currentUser = Bmob.User.current();
    const me = new Bmob.User();

    me.id = currentUser.id;

    diary.set("user", me);
    diary.set("status", 0);
    const post = Bmob.Object.createWithoutData("coupon", id);
    diary.set("coupon", post);
    diary.save(null, {
      success: (result) => {
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 1000,
        })
        data[index].status = !data[index].status
        this.setData({
          coupon: data
        })
      },
      error: (result, error) => {
        console.log('创建日记失败');
      }
    })


  }
})