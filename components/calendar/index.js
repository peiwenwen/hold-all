import { formatNumber } from "../../utils/index.js"
const app = getApp()
Component({
  properties: {
    planList: {
      type: Object,
      value: {}
    },
    calendarType: {
      type: String,
      value: ''
    }
  },
  data: {
    months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    today: '', // 实际日期
    dateChecked: '', // 选中日期
    dateCheckedIndex: 0, // 选中日期index
    typeList: app.globalData.typeList,
    showDialog: false
  },
  observers: {
    dateChecked () {
      this.triggerEvent('datechecked', this.data.dateChecked)
    }
  },
  lifetimes: {
    attached() {
      this.getNow()
      this.getDays(this.data.dateChecked)
    }
  },
  methods: {

    // 获取当前日期
    getNow () {
      const now = new Date()
      const year = now.getFullYear()
      const month = formatNumber(now.getMonth() + 1)
      const date = formatNumber(now.getDate())
      const temp = `${year}-${month}-${date}`
      this.setData({
        today: temp,
        dateChecked: temp
      })
      this.triggerEvent('today', temp)
    },

    // 获取当前月份的日期
    getDays (checked) {
      checked = checked.replace(/-/g, '/')
      const temp = new Date(checked)
      const year = temp.getFullYear()
      const month = temp.getMonth()
      const date = temp.getDate()
      let beforeMonth = month - 1
      let beforeYear = year
      let afterMonth = month + 1
      let afterYear = year

      // 如果上个月是12月
      if (beforeMonth === -1) {
        beforeMonth = 11
        beforeYear = year - 1
      }
      
      // 如果下个月是1月
      if (afterMonth === 12) {
        afterMonth = 0
        afterYear = year + 1
      }

      // 判断闰年，用于月份日期便利
      if (year % 4 === 0) {
        this.data.months[1] = 29
      } else {
        this.data.months[1] = 28
      }

      // 当月1号周几？
      const dayBegin = new Date(new Date(checked).setDate(1)).getDay()
      // 当月最后一天周几？
      const dayEnd = new Date(new Date(checked).setDate(this.data.months[month])).getDay()

      let list = []
      
      // 上个月
      for (let i = this.data.months[beforeMonth] - dayBegin + 1; i <= this.data.months[beforeMonth]; i++) {
        list.push({
          date: i,
          curMonth: false,
          time: `${beforeYear}-${formatNumber(beforeMonth + 1)}-${formatNumber(i)}`
        })
      }
      
      // 当前月份
      for (let i = 1; i <= this.data.months[month]; i++) {
        list.push({
          week: (dayBegin + i - 1) % 7,
          date: i,
          curMonth: true, // 是否是当前月份
          time: `${year}-${formatNumber(month + 1)}-${formatNumber(i)}`
        })
        if (i === date) {
          this.setData({
            dateCheckedIndex: dayBegin + i - 1
          })
        }
      }

      // 下个月份
      for (let i = 1; i < 7 - dayEnd; i++) {
        list.push({
          date: i,
          curMonth: false,
          time: `${afterYear}-${formatNumber(afterMonth + 1)}-${formatNumber(i)}`
        })
      }
      this.setData({
        days: list,
        dateChecked: `${year}-${formatNumber(month + 1)}-${formatNumber(date)}`
      })
    },

    // 切换月份
    changeMonth (e) {
      const step = Number(e.currentTarget.dataset.step)
      const arr = this.data.dateChecked.split('-')
      let year = +arr[0]
      let month = +arr[1] + step
      if (month === 0) {
        month = 12
        year--
      } else if (month === 13) {
        month = 1
        year++
      }
      this.getDays(`${year}-${month}-1`)
    },

    // 选中日期
    checkDate (e) {
      const dataset = e.currentTarget.dataset
      if (!dataset.curMonth) return
      const index = Number(dataset.index) || 0
      this.setData({
        dateChecked: dataset.time,
        dateCheckedIndex: index
      })
    },
    changeDialog (e) {
      this.setData({
        showDialog: e.detail.value
      })
    }
  }
})
