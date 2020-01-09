<template>
  <div class="todo">
    <div class="title">
      事项列表
    </div>
    <div class="add-new">
      <input
        v-model.trim="newTodoContent"
        class="input"
        type="text"
        name="new_todo"
        placeholder="Your new TODO"
        @keyup.enter.prevent="saveTodo"
      >
    </div>
    <div class="ToDo__items">
      <todoitem
        v-for="item in todoItems"
        :key="item.id"
        :item="item"
        @delete="deleteItem"
      ></todoitem>
    </div>
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
  name: 'ToDo',
  components: { 
    titem: httpVueLoader('./components/titem.vue')
  },
  data () {
    return {
      newTodoContent: '',
      todoItems: []
    }
  },
  mounted () {
    this.fetchToDos()
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
    /**
     * Saves the todo item, on each change
     * @param {TodoItem} item
     */
    handleItemChange (item) {
      // ToDoService.updateItem(item.id, item)
      this.fetchToDos()
    },
    deleteItem (obj) {
      var newArray = []

      this.todoItems.forEach(function(item){
        if (item.id != obj.id) {
          newArray.push(item)
        }
        
      })
      this.todoItems = newArray



      this.$EventBus('addDelete',obj)

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
.todo .title {
  font-size:24px;
  font-weight: 600;
  line-height:27px;
  margin-bottom:24px;
  text-align: center;
}

.todo .add-new {
  margin-bottom: 10px;
}
.todo .add-new input {
  box-shadow: inset 0 0.0625em 0.125em rgba(10,10,10,.05);
  max-width: 100%;
  width: 100%;
  background-color: #fff;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
  box-sizing: border-box;
}

.input {
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;

    padding: 4px;

    position: relative;
    vertical-align: top
}
</style>
