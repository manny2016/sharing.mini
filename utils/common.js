import cfg from '../config/index.js';
function showTip(sms, icon, fun, t) {
    if (!t) {
        t = 1000;
    }
    wx.showToast({
        title: sms,
        icon: icon,
        duration: t,
        success: fun
    })
}

function showModal(c,t,f,fun) {
    if(!t)
        t='提示'
    wx.showModal({
        title: t,
        content: c,
        showCancel:f,
        success: fun
    })
}
// function setSharedBy(options){
//   if(options.sharedby){
//     wx.setStorageSync(cfg.localKey.sharedBy, options.sharedby)
//   } 
// }

module.exports.showTip = showTip;
module.exports.showModal = showModal;
