<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>

    <ritem
      v-for="item in recycleItems"
      :key="item.id"
      :item="item"
      @delete="deleteItem"
    ></ritem>

  </div>
</template>

<script>


// import { random } from '@/utils'
// import TodoItem from '@/components/TodoItem'
// import { ToDoService } from '@/services/ToDoService'

/**
 * @module ToDo
 */
module.exports = {
  name: 'recycle',
  components: {
    ritem: httpVueLoader('./components/ritem.vue')
  },
  data () {
    return {
      recycleItems: []
    }
  },
  mounted () {
    this.fetchToDos()

    this.$EventBus.$on('addDelete',function(obj){
      this.recycleItems.push(obj)
    }.bind(this))
  },
  methods: {
    generateID: function(){
      return Math.random().toString(36).substr(2, 5)
    },
    /**
     * Fetches all the todo items
     */
    fetchToDos () {
      
    },
    /**
     * Saves a new todo item
     */
    saveTodo () {
      // do nothing if we have no content
      if (!this.newTodoContent) return

      // push a new item to the list
      this.todoItems.push({
        id: this.generateID(),
        content: this.newTodoContent,
        deletedAt: null
      })
      // clear the form input
      this.newTodoContent = ''
      // store the items
      this.storeItems()
    },

    deleteItem (obj) {
      var newArray = []

      this.todoItems.forEach(function(item){
        if (item.id != obj.id) {
          newArray.push(item)
        }
        
      })
      this.todoItems = newArray

    },
    /**
     * Persists the list of todo items
     */
    storeItems () {
      // ToDoService.storeAll(this.todoItems)
    }
  }
}
</script>
<style>
.recycle .title {
  font-size:24px;
  font-weight: 600;
  line-height:27px;
  margin-bottom:24px;
  text-align: center;
}




</style>
