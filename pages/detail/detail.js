//detail.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    info: { id: 1, title: "AAA", img: "/images/settings-81-filled.png", time: "2017-5-1", content: "neirong"}
  },

  bindViewTap: function () {
    console.log('===about.js@bindViewTap===');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('===about.js@onLoad===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===about.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===about.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===about.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===about.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===about.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===about.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===about.js@onShareAppMessage===');
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
