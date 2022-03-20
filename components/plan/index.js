import { formatNumber } from "../../utils/index.js"
const app = getApp()
Component({
  properties: {
    dateChecked: {
      type: String,
      value: ''
    }
  },
  data: {
    planList: {},
    typeList: app.data.typeList,
    typeChecked: 0,
    inputText: '',
    showDialog: false,
    date: '',
    today: '',
    statusList: {
      0: {
        value: '未完成'
      }, 
      1: {
        value: '已完成'
      }
    },
    status: 0,
    planItem: null, // 被编辑计划下标
    count: 0, // 未按时完成的任务数
  },
  lifetimes: {
    attached() {
      this.getNow()
      wx.getStorage({
        key: 'planList',
        success: (res) => {
          this.setData({
            planList: res.data
          })
        }
      })
    }
  },
  methods: {
    getNow () {
      const now = new Date()
      const year = now.getFullYear()
      const month = formatNumber(now.getMonth() + 1)
      const date = formatNumber(now.getDate())
      const temp = `${year}/${month}/${date}`
      this.data.today = temp
    },

    // 添加计划清单
    add () {
      this.setData({
        showDialog: true,
        date: this.properties.dateChecked.replace(/\//g, '-')
      })
    },

    // 关闭
    close () {
      this.data.planItem = null
      this.setData({
        showDialog: false
      })
    },

    // 选中类型
    checkType (e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        typeChecked: index
      })
    },

    // 清空数据
    clear () {
      this.setData({
        inputText: ''
      })
    },

    // 改变状态
    changeStatus (e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        status: index
      })
    },

    // 保存计划
    save () {
      if (!this.data.inputText) {
        wx.showToast({
          title: '数据不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      const { typeChecked, planItem, inputText, status } = this.data
      const { dateChecked } = this.properties
      const item = {
        text: inputText,
        status: status,
        type: typeChecked,
        touchstartX: 0,
        touchendX: 0
      }
      console.log(1111,  this.data.planList, dateChecked, item)
      if (planItem) {
        this.data.planList[planItem[0]][planItem[1]] = item
      } else {
        this.data.planList[dateChecked] = this.data.planList[dateChecked] || []
        this.data.planList[dateChecked].push(item)
      }
      this.setData({
        planList: this.data.planList
      }, this.setStorage)
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 2000
      })
      this.close()
    },

    // 编辑清单
    edit (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planItem = [key, index]
      const item = this.data.planList[key][index]
      this.setData({
        showDialog: true,
        typeChecked: item.type,
        inputText: item.text,
        status: item.status
      })
    },

    // 删除清单
    delete (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planList[key].splice(index, 1)
      this.setData({
        planList: this.data.planList
      })
      this.setStorage()
    },

    // 完成状态
    done (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planList[key][index].status = this.data.planList[key][index].status == 0 ? 1 : 0
      this.setData({
        planList: this.data.planList
      })
      this.setStorage()
    },

    // 滑动
    touchstart (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planList[key][index].touchstartX = e.changedTouches[0].pageX
      this.setData({
        planList: this.data.planList
      })
    },

    touchend (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planList[key][index].touchendX = e.changedTouches[0].pageX
      this.setData({
        planList: this.data.planList
      })
      this.setStorage()
    },

    tips () {
      wx.showToast({
        title: '数据都在手机上存储，俺啥也不知道',
        icon: 'none',
        duration: 2000
      })
    },

    // 重置Storage的值
    setStorage () {
      wx.setStorage({
        key: 'planList',
        data: this.data.planList
      })
      this.triggerEvent('plan')
    },

    bindDateChange (e) {
      this.setData({
        date: e.detail.value
      })
    },

    changeDialog (e) {
      this.setData({
        showDialog: e.detail
      })
    }
  }
})
