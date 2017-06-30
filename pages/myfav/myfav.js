//myfav.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    list: [],
    offset: 0,
    loading: false,
    plain: false,
    total_count: 0
  },
  // 解决图片404错误
  errorImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var replaceImgUrl = "http://tgi1.jia.com/117/511/17511183.jpg";
    this.data.list[errorImgIndex].coverimage = replaceImgUrl;
    this.setData(
      { list: this.data.list }
    );
  },

  /**
   * 一次性全取
   */
  // loadMore(e) {
  //   if (this.data.list.length === 0) return
  //   this.setData({ loading: true })
  //   this.setData({ plain: true })
  //   var currentOffset = e.currentTarget.dataset.offset;
  //   var that = this;
  //   var currentLimit = 10;
  //   var user_id = wx.getStorageSync("user").openid;

  //   wx.request({
  //     url: 'https://tinymood.com/api/fav/' + user_id,
  //     data: { offset: currentOffset, limit: currentLimit},
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success(res) {
  //       if (res.data.favorite.length == 0) {
  //         wx.showToast({
  //           title: "没有更多了"
  //         });
  //       }
  //       that.setData({
  //         loading: false,
  //         plain: false,
  //         offset: res.data.favorite.length + currentOffset,
  //         list: that.data.list.concat(res.data.favorite)
  //       })
  //     }
  //   })
  // },

  loadData: function (offset) {
    // 显示loading
    wx.showLoading({
      title: "加载中..."
    });
    var that = this
    var limit = 8

    var user_id = wx.getStorageSync("user").openid;

    console.log("userid=", user_id)

    wx.request({
      url: 'https://tinymood.com/api/fav/' + user_id,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ list: res.data.favorite, total_count:0});
        var newoffset = res.data.favorite.length + offset
        that.setData({ offset: newoffset });
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },
  
  refresh: function () {
    this.loadData(0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(0);
    console.log('===myfav.js@onLoad===');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===myfav.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===myfav.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===myfav.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===myfav.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===myfav.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===myfav.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===myfav.js@onShareAppMessage===');
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
