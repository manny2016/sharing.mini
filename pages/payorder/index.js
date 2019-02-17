var common = require('../../utils/common.js');
var util = require("../../utils/util.js");
import cfg from '../../config/index.js';
var that;
let app = getApp();
Page({
  data: {
    showAddr: false,
    showAddAddr: true,
    showModalStatus:false,
    showDelivery:false,
    totalMoney: 0,
    goodMoney:0,
    price:0,
    showCoupon:false,
    fare: 0.00,
    allOrder: [],
    couponid:"",
    useCoupon:false,    
    delivery:0
  },
  onShow() {
    let totalMoney = null;
    let total =null;
    wx.getStorage({
      key: 'orderResult',
      success: res => {
        console.log(res.data);
        let len = res.data.length;
        let fare = this.data.fare;
        let goodMoney = 0;
        for (let i = 0; i < len; i++) {
          goodMoney += res.data[i].number * res.data[i].price;
          if (res.data[i].fare > fare){
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
    })  
  },
  setCoupon(e) {
    let id = e.currentTarget.dataset.id;
    let price = e.currentTarget.dataset.price;

    this.setData({
      price: price,
      showCoupon: false,
      useCoupon:true,
      coupon: {
        id: id,
        price: price
      }
    })

  },
  getCoupon(){
    if(this.data.allOrder.length !=0){
      this.setData({
        showCoupon:true
      })
    }
  },
  chooseDelivery(){
    this.setData({ showDelivery:true});
    this.showModal();
  },
  setDelivery(e){
    let type = e.currentTarget.dataset.type;
    this.setData({delivery:type});
    this.hideModal();
  },
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          showAddAddr: false,
          showAddr: true,
          name: res.userName,
          addrdetail: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          tel: res.telNumber
        });
        console.log(res);

        // let User = Bmob.Object.extend("_User");
        // let query = new Bmob.Query(User);
        // let currentUser = Bmob.User.current();
        let objectid = currentUser.id;
        query.get(objectid, {
          success: (result) => {
            result.set('name', res.userName);
            result.set('tel', res.telNumber);
            result.set('addrdetail', res.provinceName + res.cityName + res.countyName + res.detailInfo);
            result.set('mailcode', res.nationalCode);
            result.save(null, {
              success: (result) => {},
              error: (result, error) => {
                console.log('地址创建失败');
              }
            });
          },
          error: (object, error) => {
            console.log(object)
          },
        });
      },
    })
  },
  onLoad() {
   const me = this;
    let token = wx.getStorageSync(cfg.localKey.token);
    console.log(token);
    //获取用户的信息
    // var User = Bmob.Object.extend("_User");
    // var currentUser = Bmob.User.current();
    // var objectid = currentUser.id;
    // var query = new Bmob.Query(User);
    // query.get(objectid, {
    //   success: function(result) {
    //     // 查询成功，调用get方法获取对应属性的值
    //     var name = result.get("name");
    //     if (name) {
    //       that.setData({
    //         showAddr: true,
    //         showAddAddr: false
    //       })
    //     }
    //     var tel = result.get("tel");
    //     var addrdetail = result.get("addrdetail");
    //     that.setData({
    //       name: name,
    //       tel: tel,
    //       addrdetail: addrdetail,
    //     })
    //   },
    //   error: function(object, error) {
    //     // 查询失败
    //   }
    // });
  },
  placeOrder: function(event) {
    var that = this;
    // if (this.data.couponid) {
    //   console.log(2222);
    // }
    if (this.data.showAddAddr) {
      common.showTip("请填写收货地址", "loading");
      return false;
    }
    // 发起支付
    var orderDetail = this.data.detail;
    var userInfo = {
      name: this.data.name,
      tel: this.data.tel,
      addrdetail: this.data.addrdetail
    };
    var coupon = this.data.price;
    var totalPrice = parseFloat(this.data.totalMoney) - coupon;    
    var remarks = event.detail.value.remark;   
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openId = res.data;
        if (!openId) {
          console.log('未获取到openId请刷新重试');
          return false;
        }


        //传参数金额，名称，描述,openid
        Bmob.Pay.wechatPay(totalPrice, '小程序商城', '描述', openId).then(function(resp) {

          //服务端返回成功
          var timeStamp = resp.timestamp,
            nonceStr = resp.noncestr,
            packages = resp.package,
            orderId = resp.out_trade_no, //订单号，如需保存请建表保存。
            sign = resp.sign;
          //发起支付
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': packages,
            'signType': 'MD5',
            'paySign': sign,
            'success': function(res) {
              //付款成功,这里可以写你的业务代码

              var User = Bmob.Object.extend("_User");
              var currentUser = Bmob.User.current();
              var objectid = currentUser.id;
              var Order = Bmob.Object.extend("Order");
              var Order = new Order();
              var me = new Bmob.User();
              me.id = objectid;
              Order.set("remarks", remarks);
              Order.set("orderUser", me);
              Order.set("totalprice", parseFloat(totalPrice));
              Order.set("orderDetail", orderDetail);
              Order.set("orderId", orderId);
              Order.set("status", 1);
              Order.set("userInfo", userInfo);
              Order.save(null, {
                success: function(result) {
                  wx.redirectTo({
                    url: '../order/index'
                  })
                },
                error: function(result, error) {

                }
              });

              if(that.data.useCoupon){
                var userCoupon = Bmob.Object.extend("user_coupon");
                var queryCoupon = new Bmob.Query(userCoupon);
                queryCoupon.get(that.data.couponid,{
                  success:function(result){
                    result.set('status',1);
                    result.save();
                  }
                })
              }
            },
            'fail': function(res) {
              // console.log(res)
              // var User = Bmob.Object.extend("_User");
              // var currentUser = Bmob.User.current();
              // var objectid = currentUser.id;
              // var Order = Bmob.Object.extend("Order");
              // var Order = new Order();
              // var me = new Bmob.User();
              // me.id = objectid;
              // Order.set("remarks", remarks);
              // Order.set("orderUser", me);
              // Order.set("totalprice", parseInt(totalPrice));
              // Order.set("orderDetail", orderDetail);
              // Order.set("status", 0);
              // Order.set("userInfo", userInfo);
              // Order.set("orderId", orderId);
              // Order.save(null, {
              //   success: function(result) {
              //     console.log(result.id)
              //   },
              //   error: function(result, error) {

              //   }
              // });
              if (that.data.couponid) {
                var userCoupon = Bmob.Object.extend("user_coupon");
                var queryCoupon = new Bmob.Query(userCoupon);
                queryCoupon.get(that.data.couponid, {
                  success: function (result) {
                    result.set('status', 1);
                    result.save();
                  }
                })
              }
            }
          })

        }, function(err) {
          console.log('服务端返回失败');
          console.log(err);
        });

      }
    })
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