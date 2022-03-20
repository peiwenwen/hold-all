Component({
  properties: {
    title: {
      type: String,
      value: '提示'
    },
    btnName: {
      type: String,
      value: '保存'
    },
    showDialog: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  lifetimes: {
    attached() {

    }
  },
  methods: {
    // 关闭
    close () {
      this.triggerEvent('changedialog', false)
    },

    save () {
      this.triggerEvent('save')
    }
  }
})
