//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  getUserMsg:function(){
	  let token = null;
	  let token_type=null;
	  token = wx.getStorageSync('token')
	  token_type = wx.getStorageSync('token_type')
	  let temp = 'Bearer' +' '+token;
	  console.log('temp',temp)
	 wx.request({
	 	  url: 'http://oauth-test.pureh2b.com/sso/user/info', //仅为示例，并非真实的接口地址
	 	  header:{
	 		 Authorization:temp,
	 	  },
	 	  success (res) {
	 		console.log(res.data)
	 	  }
	 }) 
  },
  getPageData:function(){
    let token = null;
	let token_type=null;
	token = wx.getStorageSync('token')
	token_type = wx.getStorageSync('token_type')
     let temp = 'Bearer' +' '+token;
	 console.log('temp',temp)
	  wx.request({
		  url: 'http://admin-test.pureh2b.com/behaviorapi/pos/store/getTerminalPerformanceDayReport', //仅为示例，并非真实的接口地址
		  header:{
			 Authorization:temp,
		  },
		  data: {
			beginDay: '2019-10-01',
			endDay: '2019-10-26'
		  },
		  success (res) {
			console.log(res.data)
		  }
	})
  },
  
  onLoad: function (options) {
    console.log('options', options)
	wx.setStorageSync('token',options.access_token)
	wx.setStorageSync('token_type',options.token_type)
    this.getUserMsg();

	
	
	
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
