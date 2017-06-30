// pages/location/splash/splash.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    motto: 'RentHub'
  },
  onLoad: function (options) {
    var user = wx.getStorageSync("user");
    var userInfo = wx.getStorageSync("userInfo");
    this.setData({userInfo:userInfo});
    console.log("splash@user=", user);
    console.log("splash@userInfo=", userInfo);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindmottotap: function (event) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log('===list.js@onShareAppMessage===');
  },
})