//list.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    list: [{ title: "杭州", image: "/images/menu-81.png" },
    { title: "杭州2", image: "/images/menu-81-filled.png" }
    ],
    loading: false,
    plain: false
  },

  loadMore(e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
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
