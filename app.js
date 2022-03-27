// app.js
App({
  data: {
  },
  onLaunch() {
    const typeList = wx.getStorageSync('typeList') || {}
    if (JSON.stringify(typeList) !== '{}') {
      this.globalData.typeList = typeList
    }

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
    typeList: {
      normal: {
        color: '#fff',
        backgroundColor: '#9dd2d8',
        value: '日常'
      },
      work: {
        color: '#fff',
        backgroundColor: '#ffb5cc',
        value: '工作'
      },
      study: {
        color: '#fff',
        backgroundColor: '#60a222',
        value: '学习'
      },
      other: {
        color: '#fff',
        backgroundColor: '#de350b',
        value: '其他'
      },
      // 4: {
      //   color: '#fff',
      //   backgroundColor: '#9dd2d8',
      //   value: '测试'
      // },
      // 5: {
      //   color: '#fff',
      //   backgroundColor: '#e2b9d8',
      //   value: '测试'
      // },
      // 6: {
      //   color: '#fff',
      //   backgroundColor: '#ff8b00',
      //   value: '测试'
      // },
    }
  }
})
