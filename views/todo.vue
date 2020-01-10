<template>
  <div class="todo">
    <div class="title">
      事项列表
    </div>
    <div class="add-new">
      <input v-model.trim="newTodoContent" class="input" type="text" name="new_todo" placeholder="Your new TODO"
        @keyup.enter.prevent="saveTodo">
    </div>
    <div class="ToDo__items">
      <titem v-for="item in todoItems" :key="item.id" :item="item" @delete="deleteItem" @complete="completeItem"></titem>
    </div>
  </div>
</template>

<script>
  /**
   * @module ToDo
   */
  module.exports = {
    name: 'ToDo',
    components: {
      titem: httpVueLoader('../components/titem.vue')
    },
    data() {
      return {
        newTodoContent: '',
        todoItems: []
      }
    },
    mounted() {
      this.$EventBus.$on('addRevert', function(obj) {
        this.todoItems.push(obj)
      }.bind(this))
      this.fetchData()
    },
    watch: {
      todoItems(val) {
        this.storeItems(val)
      }
    },
    methods: {
      generateID: function() {
        return Math.random().toString(36).substr(2, 5)
      },
      /**
       * Fetches all the todo items
       */
      fetchData() {
        // debugger
        this.todoItems = this.$dataUtils.getItem('todoList', [])
      },
      /**
       * Saves a new todo item
       */
      saveTodo() {
        // do nothing if we have no content
        if (!this.newTodoContent) return

        // push a new item to the list
        this.todoItems.push({
          id: this.generateID(),
          content: this.newTodoContent
          // deletedAt: null
        })
        // clear the form input
        this.newTodoContent = ''
      },

      deleteItem(obj) {
        var newArray = []

        this.todoItems.forEach(function(item) {
          if (item.id != obj.id) {
            newArray.push(item)
          }
        })
        this.todoItems = newArray

        this.$EventBus.$emit('addDelete', obj)
      },

      completeItem(obj) {
        var newArray = []

        this.todoItems.forEach(function(item) {
          if (item.id == obj.id) {
            newArray.push(obj)
          } else {
            newArray.push(item)
          }
        })
        this.todoItems = newArray
      },
      /**
       * Persists the list of todo items
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
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, .05);
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
