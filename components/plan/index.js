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
    sortKeys: [],
    planList: {},
    typeList: app.globalData.typeList,
    typeChecked: 'normal',
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
    showDialogMin: false,
    typeName: '类型',
    typeColor: '#fff',
    typeBgColor: '#ff8b00',
    rgb: 'rgb(7,193,96)',
    pick: true
  },
  observers: {
    planList () {
      this.setSort()
    }
  },
  lifetimes: {
    attached () {
      const planList = wx.getStorageSync('planList') || {}
      this.setData({
        planList
      })
      this.setSort()
    },
  },
  pageLifetimes: {
    show () {
      const planList = wx.getStorageSync('planList') || {}
      this.setData({
        planList: planList
      })
    }
  },
  methods: {

    setSort () {
      if (JSON.stringify(this.data.planList) !== '{}') {
        const sortKeys = Object.keys(this.data.planList).sort()
        this.setData({
          sortKeys
        })
      }
    },

    // 添加计划清单
    add () {
      let day = this.properties.dateChecked
      if (!this.properties.dateChecked) {
        day = this.properties.dateChecked
        const now = new Date()
        day = `${now.getFullYear()}-${formatNumber(now.getMonth() + 1)}-${formatNumber(now.getDate())}`
      }
      this.setData({
        showDialog: true,
        date: day
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

    // 解决warn报警没有绑定input函数，虽然不知道为什么要报警
    userInput () {},

    addType () {
      this.setData({
        showDialogMin: true
      })
    },

    closeMin () {
      this.setData({
        showDialogMin: false
      })
    },

    saveType () {
      const item = {
        color: this.data.typeColor,
        backgroundColor: this.data.typeBgColor,
        value: this.data.typeName
      }
      const index = `key${Math.floor(Math.random() * 20)}`
      const str = Object.keys(this.data.typeList).find(key => {
        return key == index
      })
      if (!str) {
        this.data.typeList[index] = item
        this.setData({
          typeList: this.data.typeList,
          showDialogMin: false
        })
        wx.setStorageSync('typeList', this.data.typeList)
      }
    },

    // 保存计划
    save () {
      if (!this.data.date) {
        wx.showToast({
          title: '日期不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.data.inputText) {
        wx.showToast({
          title: '数据不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      const { date, typeChecked, planItem, inputText, status } = this.data
      const item = {
        date: date,
        type: typeChecked,
        text: inputText,
        status: status,
        touchstartX: 0,
        touchendX: 0
      }

      // 编辑
      if (planItem) {
        console.log(planItem)
        if (planItem[0] === date) {
          this.data.planList[date][planItem[1]] = item
        } else {
          this.data.planList[date] = this.data.planList[date] || []
          this.data.planList[date].push(item)
          this.data.planList[planItem[0]].splice(planItem[1], 1)
        }
      } else {
        this.data.planList[date] = this.data.planList[date] || []
        this.data.planList[date].push(item)
      }
      this.setData({
        planList: this.data.planList
      })
      this.setStorage()
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
        date: key,
        typeChecked: item.type,
        inputText: item.text,
        status: item.status
      })
    },

    // 删除清单
    delete (e) {
      const { key, index } = e.currentTarget.dataset
      this.data.planList[key].splice(index, 1)
      if (!this.data.planList[key].length) {
        delete this.data.planList[key]
      }
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
    },





    getColor () {
      this.setData({
        pick: true
      })
    },

    pickColor(e) {
      this.setData({
        rgb: e.detail.color
      })
      console.log(this.data.rgb)
    },
  }
})
