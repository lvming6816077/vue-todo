<template>
  <div class="todo-item" :class="{completed:isCompleted}">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" v-model="isCompleted">
    </div>
    <div class="item-content">
      <div class="break-all">{{item.content}}</div>
    </div>
    <div class="item-delete"></div>
  </div>
</template>

<script>


/**
 * @module TodoItem
 */
module.exports = {
  name: 'TodoItem',

  props: {
    /**
     *  @type TodoItem
     */
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isCompleted: false,
      contentLocal: ''
    }
  },
  computed: {

  },

  methods: {
    /**
     * Deletes a todo item
     */
    deleteItem () {

      this.$emit('delete',{
        deletedAt: Date.now(),
        id: this.item.id
      })
    },


  }
}
</script>

<style>
.todo-item {
  display: flex;

  align-items: center;
  margin-bottom: 16px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}
.todo-item.completed {
  text-decoration: line-through;
  opacity: .5;
}
.item-checkbox .checkbox {
  cursor: pointer;
}
.item-content {
  flex: 1;
  padding-left: 10px;
  padding-right: 30px;
}
.item-delete {
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-image: url('./delete.png');
  position: absolute;
  background-size: 60% 60%;
  
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  right: 11px;
}
.item-delete:hover {
  background-color: #dbdbdb;
}
</style>
