//list.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    list: [],
    offset: 0,
    sortTab: 0,
    loading: false,
    plain: false,
    navTab: ["推荐", "杭州", "上海", "收藏"],
    currentNavtab: "0",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  // 切换navTab设置currentNavtab
  switchTab: function (e) {
    var navTabIndex = e.currentTarget.dataset.idx;
    this.setData({
      // 0,1,2,3
      currentNavtab: navTabIndex
    });
    if (navTabIndex == 0) {
      this.loadRmdData(1)
    } else if (navTabIndex == 3) {
      this.loadFavData(0);
    } else {
      this.loadCityData(0);
    }
  },

  //点击图片触发事件
  swiperClick: function (e) {
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  // 城市列表图片404
  errorImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var replaceImgUrl = "http://tgi1.jia.com/117/511/17511183.jpg";
    this.data.list[errorImgIndex].coverimage = replaceImgUrl;
    this.setData(
      { list: this.data.list }
    );
  },
  // 推荐列表图片404
  rmdErrorImg: function (e) {
    var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
    var replaceImgUrl = "http://tgi1.jia.com/117/511/17511183.jpg";
    this.data.rmd_list[errorImgIndex].coverimage = replaceImgUrl;
    this.setData(
      { list: this.data.rmd_list }
    );
  },
  // 指定城市搜索
  toSearch: function (e) {
    var keyword = e.detail.value;
    //currentNavtab = 1 -> city = 0 杭州
    //currentNavtab = 2 -> city = 1 上海
    var city = this.data.currentNavtab - 1;
    wx.navigateTo({
      url: '../city-search/city-search?keyword=' + keyword + '&city=' + city,
    })
  },

  // 列表排序
  sortlist: function (e) {
    var sort = e.currentTarget.dataset.idx;
    this.setData({
      sortTab: e.currentTarget.dataset.idx
    });
    var that = this;
    this.loadCityData(0);
  },

  loadCityMore(e) {
    console.log("city", this.data.currentNavtab)
    var city = this.data.currentNavtab - 1;

    console.log("city@loadCityMore", this.data.currentNavtab);

    if (this.data.list.length === 0) return
    this.setData({ loading: true })
    this.setData({ plain: true })
    var currentOffset = e.currentTarget.dataset.offset;
    var that = this;
    var currentLimit = 10;
    wx.request({
      url: 'https://tinymood.com/api/lists/',
      data: { offset: currentOffset, limit: currentLimit, city: city },
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.topic_list.length == 0) {
          wx.showToast({
            title: "没有更多了"
          });
        }
        that.setData({
          loading: false,
          plain: false,
          offset: res.data.topic_list.length + currentOffset,
          list: that.data.list.concat(res.data.topic_list)
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "服务器异常，请稍后再试。",
          duration: 3000
        });
        that.setData({
          loading: false,
          plain: false
        })
        console.log("load more fail")
      },
    })
  },

  loadCityData: function (offset) {
    var city = this.data.currentNavtab - 1;
    var sortTab = this.data.sortTab

    console.log("city,sortTab=", city, sortTab);

    // 显示loading
    wx.showLoading({
      title: "加载中..."
    });
    var that = this
    var limit = 8

    // 优先加载缓存
    //分别为三种排序下的缓存数据
    var cacheCityData0 = wx.getStorageSync('cacheCityDataKey0');
    var cacheCityData1 = wx.getStorageSync('cacheCityDataKey1');
    var cacheCityData2 = wx.getStorageSync('cacheCityDataKey2');
    var cacheCityData = cacheCityData0
    if (sortTab == 1) {
      cacheCityData = cacheCityData1
    } else if (sortTab == 2) {
      cacheCityData = cacheCityData2
    }
    if (cacheCityData) {
      that.setData({ list: cacheCityData.topic_list });
      var newoffset = cacheCityData.topic_list.length + offset
      that.setData({ offset: newoffset });
      console.log("load data from cache")

      wx.hideLoading();
      return true;
    }
    wx.request({
      url: 'https://tinymood.com/api/lists/',
      data: { offset: offset, limit: limit, city: city, sort: sortTab },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ list: res.data.topic_list });
        var newoffset = res.data.topic_list.length + offset;
        that.setData({ offset: newoffset });
        //cache
        if (offset == 0 && sortTab == 0) {
          wx.setStorage({
            key: 'cacheCityDataKey0',
            data: res.data
          })
        } else if (offset == 0 && sortTab == 1) {
          wx.setStorage({
            key: 'cacheCityDataKey1',
            data: res.data
          })
        } else if (offset == 0 && sortTab == 2) {
          wx.setStorage({
            key: 'cacheCityDataKey2',
            data: res.data
          })
        }
        console.log("load data from network")
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '非常抱歉，网络异常，请稍后再试',
          confirmText: '返回',
          showCancel: false,
          success: function (res) {
            //do nothing
          }
        }),
        console.log("server error")
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },

  /**
   * 加载推荐数据
   */
  loadRmdData: function (call) {
    // 显示loading
    wx.showLoading({
      title: "加载中..."
    });
    var that = this
    var limit = 8

    //优先加载缓存
    var cacheRmdData = wx.getStorageSync('cacheRmdDataKey');
    if (cacheRmdData) {
      console.log("rmd_list", cacheRmdData.rmd_list);
      that.setData({ rmd_list: cacheRmdData.rmd_list });
      console.log("load data from cache")
      wx.hideLoading();
      return true
    }
    //没有缓存请求服务器
    wx.request({
      url: 'https://tinymood.com/api/recommended/',
      data: { limit: limit },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("rmd_list", res.data.rmd_list);
        that.setData({ rmd_list: res.data.rmd_list });
        //cache
        if (call == 0) {
          wx.setStorage({
            key: 'cacheRmdDataKey',
            data: res.data
          })
        }
        console.log("load data from network")
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '非常抱歉，网络异常，请稍后再试',
          confirmText: '返回',
          showCancel: false,
          success: function (res) {
            //do nothing
          }
        }),
        console.log("server error")
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },

  /**
   * 加载收藏数据
   */
  loadFavData: function (offset) {
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
      data: { offset: offset, limit: limit },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ list: res.data.favorite, total_count: 0 });
        var newoffset = res.data.favorite.length + offset
        that.setData({ offset: newoffset });
      },
      complete: function () {
        // 关闭loading
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadRmdData(0);
    console.log('===list.js@onLoad===');
  },

  /**
   * 右上角刷新
   */
  refresh: function () {
    console.log("refresh", this.data.sortTab, this.data.currentNavtab)
    this.loadCityData(0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('===list.js@onShow===');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('===list.js@onReady===');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('===list.js@onHide===');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('===list.js@onUnload===');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('===list.js@onPullDownRefresh===');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===list.js@onReachBottom===');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('===list.js@onShareAppMessage===');
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
