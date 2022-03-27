Page({
  data: {
    dateChecked: '', // 选中日期
    planList: {},
    calendarType: 'normal', // 日历样式，常规:normal,横向:row
  },
  
  onShow: function (e) {
    this.getPlanList()
  },

  getdateChecked (e) {
    this.setData({
      dateChecked: e.detail
    })
  },

  // 用于实时获取计划清单更新数据，传递给日历
  getPlanList () {
    const planList = wx.getStorageSync('planList') || {}
    this.setData({
      planList: planList
    })
  },

  switch () {
    this.data.calendarType === 'normal' ? this.data.calendarType = 'row' : this.data.calendarType = 'normal'
    this.setData({
      calendarType: this.data.calendarType
    })
  },
  
  goPlanList () {
    wx.navigateTo({
      url: '../plan-list/plan-list'
    })
  }
})
