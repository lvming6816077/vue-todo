<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="recycleItems.length == 0">暂无已删除的事项</div>
    <ritem v-for="item in recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>

  </div>
</template>

<script>
  /**
   * @module ToDo
   */
  module.exports = {
    name: 'recycle',
    components: {
      ritem: httpVueLoader('../components/ritem.vue')
    },
    data() {
      return {
        recycleItems: []
      }
    },
    mounted() {
      this.fetchData()

      this.$EventBus.$on('addDelete', function(obj) {
        this.recycleItems.push(obj)
      }.bind(this))
    },
    watch: {
      recycleItems(val) {
        this.storeItems(val)
      }
    },
    methods: {

      /**
       * Fetches all the todo items
       */
      fetchData() {
        this.recycleItems = this.$dataUtils.getItem('recycleList', [])
      },
      /**
       * Saves a new todo item
       */

      revertItem(obj) {
        var newArray = []

        this.recycleItems.forEach(function(item) {
          if (item.id != obj.id) {
            newArray.push(item)
          }
        })
        this.recycleItems = newArray

        this.$EventBus.$emit('addRevert', obj)
      },
      /**
       * Persists the list of todo items
       */
      storeItems(array) {
        // ToDoService.storeAll(this.todoItems)
        this.$dataUtils.setItem('recycleList', array)
      }
    }
  }
</script>
<style>
  .recycle .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .recycle .no-data {
    text-align: center;
  }
</style>
