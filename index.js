import dataUtils from './utils/dataUtils.js'
// 定义中央事件总线
var EventBus = new Vue()

// 将中央事件总线赋值到Vue.prototype上，这样所有组件都能访问到了
Vue.prototype.$EventBus = EventBus

// 同上挂载全局$dataUtils方法
Vue.prototype.$dataUtils = dataUtils
// 创建根实例
new Vue({
  el: '#app',
  data: {
    currentPage: 'todo'// 默认为todo页面
  },
  components: {
    navheader: httpVueLoader('./components/navheader.vue'),
    todo: httpVueLoader('./views/todo.vue'),
    recycle: httpVueLoader('./views/recycle.vue')
  },
  methods: {
    changePage (val) {// 接收到子组件的调用
      // 改变当前页面
      this.currentPage = val
    }
  }
})
