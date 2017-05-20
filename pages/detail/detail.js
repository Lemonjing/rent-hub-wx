//detail.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    info: {
      id: 1, title: "浦东川沙精装出租，可押一付一直达张江高科", image: ["https://img3.doubanio.com/view/group_topic/large/public/p77157214.jpg", "https://img3.doubanio.com/view/group_topic/large/public/p77157215.jpg"], time: "2017-5-1", content: "浦东二号线川沙地铁站，玉兰苑，妙境家园，妙境三村，一村，二村，妙栏小区，曙光苑，华川家园，馨汇佳苑，川虹新苑，单间，一室，两室，三室都有，步行100米到2000米皆有☞都是精装修，可以押一付一哦，这边新开的百联购物中心可以满足你的购物欲望，生活家居用品家乐福也是首选，川沙步行街是happy的好地方，直达张江，浦东机场，陆家嘴的朋友也可以来这边主要是便宜，真便宜，价格1000到5000都有，看你租什么样的啦，有需要联系18516183933，手机号这是微信号"}
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
