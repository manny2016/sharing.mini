import { queryProductTree } from "../../utils/sharing";
Page({
  queryProductTree,
  data: {
    currentTab: 1,
    winHeight: 100,
    categories: [],
  },
  onShareAppMessage: function () {
    let title = "分类";
    let path = "pages/type/index";
    return {
      title: title,
      path: path
    }
  },

  onLoad: function () {  
    const me = this;
    wx.getSystemInfo({
      success: res => {       
        this.setData({
          winHeight: res.windowHeight
        });
      }
    });
    me.queryProductTree().then(res=>{     
      me.setData({ categories:res.data});
      if(res.data.length>1){
        me.setData({ currentTab: res.data[0].categoryId});
      }
    });
  },

  chooseType: function (event) {       
    let categoryId = event.target.dataset.categoryid;
    this.setData({
      currentTab: categoryId
    })
  },
})