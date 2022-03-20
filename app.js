// app.js
App({
  data: {
    typeList: {
      0: {
        color: '#fff',
        backgroundColor: '#7facd6',
        value: '日常'
      },
      1: {
        color: '#fff',
        backgroundColor: '#e8b7d4',
        value: '工作'
      },
      2: {
        color: '#fff',
        backgroundColor: '#7ec581',
        value: '学习'
      },
      3: {
        color: '#fff',
        backgroundColor: '#ec655f',
        value: '其他'
      }
    },
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 服务器域名
    // https://koa-7loe-1613036-1309533263.ap-shanghai.run.tcloudbase.com
    // wx.cloud.callContainer({
    //   "config": {
    //     "env": "prod-2gp8zdkcfa6239be"
    //   },
    //   "path": "/api/count",
    //   "header": {
    //     "X-WX-SERVICE": "koa-7loe"
    //   },
    //   "method": "POST",
    //   "data": {
    //     "action": "inc"
    //   }
    // })

  },
  globalData: {
    // userInfo: null
  }
})
