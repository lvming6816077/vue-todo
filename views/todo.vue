<template>
  <div class="todo">
    <div class="title">
      事项列表
    </div>
    <div class="add-new">
      <input v-model.trim="newTodoContent" class="input" type="text" name="new_todo" placeholder="请输入内容"
        @keyup.enter.prevent="saveTodo">
    </div>
    <div>
      <titem v-for="item in todoItems" :key="item.id" :item="item" @delete="deleteItem" @complete="completeItem"></titem>
    </div>
  </div>
</template>

<script>
  /**
   * 待办事项页面组件
   */
  module.exports = {
    name: 'todo',// 组件的名称，尽量和文件名一致
    components: {
      titem: httpVueLoader('../components/titem.vue')
    },
    data() {
      return {
        newTodoContent: '',// 输入框input的内容
        todoItems: []// 待办事项的列表
      }
    },
    mounted() {
      this.$EventBus.$on('addRevert', (obj) =>{
        this.todoItems.push(obj)
      })
      this.fetchData()
    },
    watch: {
      // 监听todoItems
      todoItems(val) {
        this.storeItems(val)// 一旦有改动立刻调用更新存储
      }
    },
    methods: {
      /**
       * 从存储中获取待办事项数据
       */
      fetchData() {
        this.todoItems = this.$dataUtils.getItem('todoList')
      },
      /**
       * 创建事项
       */
      saveTodo() {
        // 如果没有输入内容，直接返回
        if (!this.newTodoContent) return
        // 将事项存入列表
        this.todoItems.push({
          id: Math.random().toString(36).substr(2, 5),// 获取随机ID值
          content: this.newTodoContent// 设置内容
        })
        // 创建完成后清空输入框内容
        this.newTodoContent = ''
      },
      /**
       * 删除事项
       */
      deleteItem(obj) {
        // 以下逻辑为找到对应id的事项，然后删除
        let newArray = [] // 创建一个新数组
        this.todoItems.forEach((item)=> {
          if (item.id != obj.id) {// 对比id
            newArray.push(item)// 依次push原数组元素，除了需要删除的那个
          }
        })
        // 赋值新数组
        this.todoItems = newArray
        // 通知已删除事项页面，实时更新已删除数据
        this.$EventBus.$emit('addDelete', obj)
      },
      /**
       * 修改事项
       */
      completeItem(obj) {
        // 创建一个新数组
        let newArray = []
        // 找到对应id的事项，然后替换
        this.todoItems.forEach((item) =>{
          if (item.id == obj.id) {
            newArray.push(obj)
          } else {
            newArray.push(item)
          }
        })
        // 赋值新数组
        this.todoItems = newArray
      },
      /**
       * 存储事项列表
       */
      storeItems(array) {
        this.$dataUtils.setItem('todoList', array)
      }
    }
  }
</script>
<style>
  .todo .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .todo .add-new {
    margin-bottom: 10px;
  }

  .todo .add-new input {
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, .05);/* 添加阴影效果 */
    width: 100%;/* 设置宽度 */
    height: 40px;/* 设置高度 */
    padding: 4px;/* 设置内边距 */
    font-size: 16px;/* 设置字体大小 */
    color: #363636;/* 设置字体颜色 */
    background-color: #fff;/* 设置背景颜色 */
    border-color: transparent;/* 去除默认背景边框 */
    border-radius: 4px;/* 设置圆角 */
    box-sizing: border-box;/* 设置内边距不占据宽高 */
  }


</style>
