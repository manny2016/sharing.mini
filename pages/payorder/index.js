var common = require('../../utils/common.js');
var util = require("../../utils/util.js");
import cfg from '../../config/index.js';
import { topup, payOrder } from "../../utils/sharing";
var that;
let app = getApp();
Page({
  payOrder,
  data: {
    showAddr: false,
    showAddAddr: true,
    showModalStatus: false,
    showDelivery: false,
    totalMoney: 0,
    goodMoney: 0,
    price: 0,
    showCoupon: false,
    fare: 0,
    allOrder: [],
    couponid: "",
    useCoupon: false,
    delivery: 0,
    token: null
  },
  onShow() {
    const me = this;
    let totalMoney = null;
    let total = null;
    wx.getStorage({
      key: 'orderResult',
      success: res => {
        console.log(res.data);
        let len = res.data.length;
        let fare = me.data.fare;
        let goodMoney = 0;
        for (let i = 0; i < len; i++) {
          goodMoney += res.data[i].number * res.data[i].price;
          if (res.data[i].fare > fare) {
            fare = res.data[i].fare;
          }
        }
        total = goodMoney + fare;
        this.setData({
          fare: fare.toFixed(2),
          totalMoney: total.toFixed(2),
          goodMoney: goodMoney.toFixed(2),
          detail: res.data
        })
      }
    });

  },
  setCoupon(e) {
    let id = e.currentTarget.dataset.id;
    let price = e.currentTarget.dataset.price;

    this.setData({
      price: price,
      showCoupon: false,
      useCoupon: true,
      coupon: {
        id: id,
        price: price
      }
    })

  },
  getCoupon() {
    if (this.data.allOrder.length != 0) {
      this.setData({
        showCoupon: true
      })
    }
  },
  chooseDelivery() {
    this.setData({ showDelivery: true });
    this.showModal();
  },
  setDelivery(e) {
    const me = this;
    let type = e.currentTarget.dataset.type;
    this.setData({ delivery: type });
    if (type == 1) {//自提
      me.setData({ fare: 0 });
    } else {
      me.setData({ fare: 5 });
    }
    this.hideModal();
  },
  getAddress() {
    const me = this;
    wx.chooseAddress({
      success: (res) => {
        me.setData({
          showAddAddr: false,
          showAddr: true,
          name: res.userName,
          addrdetail: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          tel: res.telNumber
        });
      },
    })
  },
  onLoad() {
    const me = this;
    wx.getStorage({
      key: cfg.localKey.token, success: function (res) {
        me.data.token = res.data;
        //me.data.token.sharing.openid
        console.log(res.data);
      }
    });
  },
  placeOrder: function (event) {
    var me = this;
    if (this.data.showAddAddr) {
      common.showTip("请填写收货地址", "loading");
      return false;
    }
    if (this.data.delivery == 0) {
      common.showTip("请选择配送方式", "loading");
      return false;
    }
    // 发起支付   
    var orderDetails = {
      appid: this.data.token.sharing.appid,
      mchid: this.data.token.sharing.mchid,
      id: this.data.token.sharing.id,
      totalMoney: parseFloat(this.data.totalMoney),
      openid: this.data.token.sharing.openid,
      tel: this.data.tel,
      customer: this.data.name,
      delivery: this.data.delivery,
      details: this.data.detail,
      addrdetail: this.data.addrdetail,
      remarks: event.detail.value.remark
    };
    console.log("order", orderDetails);
    me.payOrder(orderDetails).then((ctx) => {
      wx.requestPayment({
        timeStamp: ctx.data.timeStamp,
        nonceStr: ctx.data.nonceStr,
        package: ctx.data.package,
        signType: ctx.data.signType,
        paySign: ctx.data.paySign,
        'success': function (res) {
          console.log(res);//付款成功
        },
        'fail': function (res) {
          console.log(res);
        },
        'complete': function (res) {
          wx.switchTab({
            url: '../card/index',
          })
        }
      })
    });

  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
});