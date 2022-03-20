Page({
  data: {
    dateChecked: '', // 选中日期
    planList: {}
  },
  onLoad() {
    this.getPlanList()
  },
  getdateChecked (e) {
    this.setData({
      dateChecked: e.detail
    })
  },

  goPlanList () {
    wx.navigateTo({
      url: '../plan-list/plan-list'
    })
  },

  getPlanList () {
    wx.getStorage({
      key: 'planList',
      success: (res) => {
        console.log(res.data)
        this.setData({
          planList: res.data
        })
      }
    })
  },
})
