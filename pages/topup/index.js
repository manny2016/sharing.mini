import cfg from '../../config/index.js';
import ApiList from '../../config/api';
import {
  promisify,
  complete
} from '../../utils/promisify';
import {
  co,
  Promise,
  regeneratorRuntime
} from '../../utils/co-loader';
import request from '../../utils/request';

import {
  topup
} from "../../utils/sharing";

let app = getApp();
Page({
  topup,
  data: {
    moneyBlocks: [{
        "text": "20元",
        "money": 20
      },
      {
        "text": "50元",
        "money": 50
      },
      {
        "text": "100元",
        "money": 100
      },
      {
        "text": "200元",
        "money": 200
      },
      {
        "text": "300元",
        "money": 300
      }
    ],
    topupContext: {
      appid: "",
      money: 20,
      openid: "",      
      cardid: "",
      code: ""
    }
  },
  onLoad(options) {
    console.log("options",options);
    const me = this;
    let token = wx.getStorageSync(cfg.localKey.token);
    console.log("token",token);
    me.setData({
      topupContext: {
        userid:token.sharing.id,
        mcode:cfg.mcode,
        appid: cfg.appid,
        money: 20,
        openid: token.token.openid,        
        code: options.code,
        cardid:options.cardid
      }
    });
    
  },
  clickMoneyBlock: function(event) {
    const me = this;
    let token = wx.getStorageSync(cfg.localKey.token);
    if (event.target.dataset["money"]) {
      me.setData({
        topupContext: {          
          money: event.target.dataset["money"]
        }
      });
    }   
  },
  changeMoney: function(event) {
    me.setData({
      topup: {
        money: event
      }
    });
  },
  clickPayment: function(event) {
    const me = this;
    let context = me.data.topupContext;
    console.log("clientPayment", context);
    me.topup(context).then((ctx) => {
    
      wx.requestPayment({
        timeStamp: ctx.data.timeStamp,
        nonceStr: ctx.data.nonceStr,
        package: ctx.data.package,
        signType: ctx.data.signType,
        paySign: ctx.data.paySign,
        'success': function(res) {
          console.log(res);
        },
        'fail': function(res) {
          console.log(res);
        },
        'complete': function(res) {
          wx.switchTab({
            url: '../card/index',
          })
        }
      })
    });
  }

});