//index.js
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('bindViewTap');
    wx.navigateTo({
      url: '../log/log'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('===index.js@onLoad===');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===index.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===index.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===index.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===index.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===index.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===index.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===index.js@onShareAppMessage===');
  },
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  customData: {
    hi: 'MINA'
  }
})
