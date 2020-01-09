<template>
  <div class="nav-header">
    <a @click="changePage('todo')" :class="{active:page == 'todo'}">
      代办事项
    </a> |
    <a @click="changePage('recycle')" :class="{active:page == 'recycle'}">
      回收站
    </a>
  </div>
</template>

<script>
module.exports = {
  name: 'navheader',
  props: {
    /**
     *  @type TodoItem
     */
    page: {
      type: String
    }
  },

  methods: {
    /**
     * Deletes a todo item
     */
     changePage(val){
      this.$emit('change',val)
     }


  }
}
</script>

<style>
.nav-header {
    padding: 20px;
    text-align: center;
}

.nav-header a {
    font-weight: 700;
    color: #2c3e50;
    cursor: pointer;
}

.nav-header a.active {
    color: #42b983
}
</style>
