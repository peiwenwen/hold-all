Page({
  data: {
    todoList: [{
      title: '日历',
      route: '../date/date',
      is: true
    }, {
      title: '计划列表',
      route: '../plan-list/plan-list',
      is: true
    }, {
      title: '收纳箱',
      route: '../date/date',
      is: false
    }, {
      title: 'ideal（想要啥功能可以后台告诉我）',
      route: '../date/date',
      is: false
    }]
  },
  onLoad() {
    
  },

  goUrl (e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.todoList[index]
    if (item.is) {
      wx.navigateTo({
        url: item.route
      })
    }
  },

  egg () {
    wx.showToast({
      title: '等下次发布的时候我要瘦10斤',
      icon: 'none',
      duration: 2000
    })
  }
})
