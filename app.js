//app.js
App({
  // 小程序初始化
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    console.log("=====app.js@onLaunch====");
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 当小程序启动，或从后台进入前台显示
  onShow: function() {
    console.log("=====app.js@onShow====");
  },
  // 进入后台
  onHide: function () {
    console.log("=====app.js@onHide====");
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})