import dataUtils from './utils/dataUtils.js'
// 定义中央事件总线
var EventBus = new Vue()

// 将中央事件总线赋值到 Vue.prototype 上，这样所有组件都能访问到了
Vue.prototype.$EventBus = EventBus

Vue.prototype.$dataUtils = dataUtils

new Vue({
  el: '#app',
  data: {
    currentPage: 'todo'
  },
  components: {
    navheader: httpVueLoader('./components/navheader.vue'),
    todo: httpVueLoader('./views/todo.vue'),
    recycle: httpVueLoader('./views/recycle.vue')
  },
  methods: {
    changePage (val) {
      this.currentPage = val
    }
  }
})
